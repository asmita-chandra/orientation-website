const mongoose = require('mongoose');

const OlympiksEventSchema = new mongoose.Schema(
  {
    time: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    maxSignups: {
      type: Number,
      required: true,
    },
  },
  { strict: true, timestamps: true },
);

module.exports = mongoose.model('OlympiksEvent', OlympiksEventSchema);
