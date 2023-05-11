const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const CarSchema = new Schema({
  brand: { type: String, required: true },
  model: { type: String, required: true },
  year: { type: String, required: true },
  color: { type: String, required: true },
  price: { type: String, required: true }
}, { toJSON: { virtuals: true } })

module.exports = mongoose.model("Car", CarSchema);

CarSchema.virtual('_links').get(
  function () {
    return {
      self: {
        href: `${process.env.BASE_URI}cars/${this._id}`
      },
      collection: {
        href: `${process.env.BASE_URI}cars/ `
      }
    }
  }
)