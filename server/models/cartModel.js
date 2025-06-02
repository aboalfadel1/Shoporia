// server/models/cartModel.js
import mongoose from 'mongoose';

const cartSchema = new mongoose.Schema({
  user: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  cartItems: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true,
      },
      qty: { type: Number, required: true, default: 1 },
    }
  ],
}, {
  timestamps: true,
});

const Cart = mongoose.model('Cart', cartSchema);
export default Cart;
