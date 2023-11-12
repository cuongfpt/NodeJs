const mongoose = require("mongoose");
const slug = require('mongoose-slug-updater');
const Schema = mongoose.Schema;
mongoose.plugin(slug);
const Product = new Schema({
  name: { type: String, maxLength: 255, required: true },
  slug: { type: String, slug: 'name', unique: true },
  image: { type: String, maxLength: 255 },
  desc: { type: String, maxLength: 255 },
  price: { type: String, maxLength: 255 },
},
{ timestamps: true }
);

module.exports = mongoose.model("Product", Product);
