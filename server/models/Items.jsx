const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  quantity: { type: String, required: true },
  price: { type: String, required: true },
});

const cartSchema = new mongoose.Schema({
  cartNumber: { type: String, required: true },
  items: { type: [itemSchema], required: true },
});

const CartModel = mongoose.model('Carts', cartSchema);

module.exports = CartModel;
