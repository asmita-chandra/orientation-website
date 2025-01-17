const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

const FroshModel = require('../models/FroshModel');
const FroshGroupModel = require('../models/FroshGroupModel');
const UserModel = require('../models/UserModel');

const PaymentServices = {
  /**
   * @description Decodes a webhook event from stripe and verifies that it was sent by stripe
   * @param {Buffer} data
   * @param {String} signature
   * @return {Promise<Stripe.Event>}
   */
  async decodeWebhookEvent(data, signature) {
    const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;
    try {
      return await stripe.webhooks.constructEventAsync(data, signature, endpointSecret);
    } catch (error) {
      console.error('Stripe webhook verification failed', error);
      throw new Error('UNABLE_TO_VERIFY_STRIPE_WEBHOOK', { cause: error });
    }
  },

  /**
   * @description Updates a payment for a given frosh.
   * @param {String} paymentId
   * @param {Number} amountReceived
   * @return {Promise<Query<Document<unknown, any, Omit<unknown, never>> & Omit<unknown, never> & {_id: Omit<unknown, never>["_id"]}, Document<unknown, any, Omit<unknown, never>> & Omit<unknown, never> & {_id: Omit<unknown, never>["_id"]}, {}, Omit<unknown, never>>>}
   */
  async updatePayment(paymentId, amountReceived) {
    let user;

    const frosh = await FroshModel.findOne({ 'payments.paymentIntent': paymentId }).catch(
      (error) => {
        throw new Error('UNABLE_TO_FIND_FROSH', { cause: error });
      },
    );
    console.log();

    if (!frosh) {
      console.log(`Cant not in frosh model`);
      user = await UserModel.findOne({ 'payments.paymentIntent': paymentId }).catch((error) => {
        throw new Error('UNABLE_TO_FIND_USER', { cause: error });
      });

      if (!user) {
        throw new Error('PAYMENT_NOT_FOUND');
      }
    }

    //if found in FroshModel
    if (frosh) {
      console.log(`found in frosh model`);
      const idx = frosh.payments.findIndex((p) => p.paymentIntent === paymentId);
      frosh.payments[idx].amountDue -= amountReceived;

      if (frosh.payments[idx].item === 'Orientation Ticket') {
        frosh.set({ isRegistered: true });
        await frosh.save({ validateModifiedOnly: true }).catch((error) => {
          throw new Error('UNABLE_TO_UPDATE_FROSH', { cause: error });
        });

        console.log(`Frosh payment completed! Frosh info: `, frosh);
        return FroshGroupModel.findOneAndUpdate(
          { name: frosh.froshGroup },
          { $inc: { totalNum: 1 } },
          { new: true },
        ).then(
          (doc) => {
            if (!doc) console.log(new Error('FROSH_GROUP_NOT_FOUND'));
            else console.log(`Group ${doc.name} total: ${doc.totalNum}`);
            return frosh;
          },
          (error) => {
            console.log(new Error('UNABLE_TO_UPDATE_FROSH_GROUP', { cause: error }));
            return frosh;
          },
        );
      } else if (frosh.payments[idx].item === 'Retreat Ticket') {
        console.log(`frosh payment type is retreat ticket`);
        frosh.set({ isRetreat: true });
        await frosh.save({ validateModifiedOnly: true }).catch((error) => {
          throw new Error('UNABLE_TO_UPDATE_FROSH', { cause: error });
        });

        console.log('Frosh retreat payment completed! Frosh info: ', frosh);
        return frosh;
      } else {
        throw new Error('INVALID_PAYMENT_ITEM');
      }
    }

    // If found in UserModel
    if (user) {
      const idx = user.payments.findIndex((p) => p.paymentIntent === paymentId);
      user.payments[idx].amountDue -= amountReceived;

      if (user.payments[idx].item === 'Retreat Ticket') {
        console.log(`frosh payment type is retreat ticket`);
        user.set({ isRetreat: true });
        await user.save({ validateModifiedOnly: true }).catch((error) => {
          throw new Error('UNABLE_TO_UPDATE_USER', { cause: error });
        });

        console.log(`User retreat payment completed! User info: `, user);
        return user;
      } else {
        throw new Error('INVALID_PAYMENT_ITEM');
      }
    }
  },

  /**
   * @description Gets the number of non-expired payments for a given item.
   * @param {Object} item payment item
   * @returns {Number} number of non-expired payments for a given item
   */
  async getNonExpiredPaymentsCountForItem(item) {
    try {
      let froshCount = 0;
      let userCount = 0;

      if (item === 'Retreat Ticket') {
        userCount = await UserModel.countDocuments({
          payments: { $elemMatch: { item, expired: false } },
        });
      } else {
        froshCount = await FroshModel.countDocuments({
          payments: { $elemMatch: { item, expired: false } },
        });
      }

      const totalCount = froshCount + userCount;
      return totalCount;
    } catch (error) {
      throw new Error('UNABLE_TO_GET_COUNT_OF_PAYMENTS', { cause: error });
    }
  },

  /**
   * @description Creates a checkout session for a user to pay with.
   * @param {String} email
   * @param {String} type
   * @return {Promise<Stripe.Checkout.Session & {lastResponse: {headers: {[p: string]: string}; requestId: string; statusCode: number; apiVersion?: string; idempotencyKey?: string; stripeAccount?: string}}>}
   */
  /* istanbul ignore next */
  async createCheckoutSession(email, type = 'orientation') {
    const products = {
      orientation: {
        priceId: process.env.STRIPE_TICKET_PRICE_ID,
        relativeUrlSuccess: '/registration-success',
        relativeUrlFailure: '/payment-error',
      },
      retreat: {
        priceId: process.env.STRIPE_RETREAT_PRICE_ID,
        relativeUrlSuccess: '/registration-success-retreat',
        relativeUrlFailure: '/payment-error-retreat',
      },
    };
    // try {
    return stripe.checkout.sessions.create({
      customer_email: email,
      submit_type: 'pay',
      expires_at: type === 'retreat' ? Math.floor(Date.now() / 1000 + 30 * 60) : undefined,
      billing_address_collection: 'auto',
      line_items: [
        {
          price: products[type]?.priceId ?? products['orientation'].priceId,
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `${process.env.CLIENT_BASE_URL}${
        products[type]?.relativeUrlSuccess ?? products['orientation'].relativeUrlSuccess
      }`,
      cancel_url: `${process.env.CLIENT_BASE_URL}${
        products[type]?.relativeUrlFailure ?? products['orientation'].relativeUrlFailure
      }`,
    });
    // } catch (error) {
    //   if (error.raw?.code === 'coupon_expired') {
    //     try {
    //       return await stripe.checkout.sessions.create({
    //         customer_email: email,
    //         submit_type: 'pay',
    //         expires_at: type === 'retreat' ? Math.floor(Date.now() / 1000 + 30 * 60) : undefined,
    //         billing_address_collection: 'auto',
    //         line_items: [
    //           {
    //             price: products[type]?.priceId ?? products['orientation'].priceId,
    //             quantity: 1,
    //           },
    //         ],
    //         mode: 'payment',
    //         success_url: `${process.env.CLIENT_BASE_URL}${
    //           products[type]?.relativeUrlSuccess ?? products['orientation'].relativeUrlSuccess
    //         }`,
    //         cancel_url: `${process.env.CLIENT_BASE_URL}${
    //           products[type]?.relativeUrlFailure ?? products['orientation'].relativeUrlFailure
    //         }`,
    //       });
    //     } catch (e) {
    //       console.log('Error creating checkout session', e.message);
    //       throw new Error('UNABLE_TO_CREATE_CHECKOUT_SESSION', { cause: e });
    //     }
    //   }
    //   console.log('Error creating checkout session', error.message);
    //   throw new Error('UNABLE_TO_CREATE_CHECKOUT_SESSION', { cause: error });
    // }
  },

  /**
   * @description Expires a checkout session.
   * @param {Object} paymentIntent payment intent object
   * @returns {Frosh}
   */
  async expirePayment(paymentIntent) {
    const frosh = await FroshModel.findOne({ 'payments.paymentIntent': paymentIntent }).then(
      (frosh) => {
        if (!frosh) {
          throw new Error('PAYMENT_NOT_FOUND');
        }
        return frosh;
      },
      (error) => {
        throw new Error('UNABLE_TO_FIND_FROSH', { cause: error });
      },
    );

    frosh.set({ authScopes: { requested: [], approved: [] } });
    frosh.set({
      payments: frosh.payments.map((payment) => {
        if (payment.paymentIntent === paymentIntent) {
          payment.expired = true;
        }
        return payment;
      }),
    });
    return frosh.save({ validateModifiedOnly: true }).then(
      (frosh) => frosh,
      (error) => {
        throw new Error('UNABLE_TO_UPDATE_FROSH', { cause: error });
      },
    );
  },
};

module.exports = PaymentServices;
