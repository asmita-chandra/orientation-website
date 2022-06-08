const UserServices =require('../services/UserServices');

const UserController = {
  async signup(req, res, next) {
    try {
      const {email, password, name} = req.body;
      await UserServices.validateUser(email, password, name)
      const user = await UserServices.createUser(email, password, name)
      console.log(user)
      req.logIn(user, (err) => {
        if (err) {
          return next(err)
        }
        return res.status(200).send({message: 'Success!'})
      })
    } catch (e) {
      next (e)
    }
  }
}

module.exports = UserController
