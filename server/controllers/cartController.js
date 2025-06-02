// server/controllers/cartController.js
import Cart from '../models/cartModel.js';

export const addOrUpdateCart = async (req, res) => {
  const { cartItems } = req.body;

  try {
    let cart = await Cart.findOne({ user: req.user.id });

    if (cart) {
      // تحديث السلة
      cart.cartItems = cartItems;
      cart = await cart.save();
      res.json(cart);
    } else {
      // إنشاء سلة جديدة
      const newCart = new Cart({
        user: req.user.id,
        cartItems,
      });
      const createdCart = await newCart.save();
      res.status(201).json(createdCart);
    }
  } catch (err) {
    res.status(500).json({ message: 'خطأ في تحديث السلة', error: err });
  }
};

export const getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user.id }).populate('cartItems.product', 'name price image');
    if (cart) {
      res.json(cart);
    } else {
      res.status(404).json({ message: 'السلة غير موجودة' });
    }
  } catch (err) {
    res.status(500).json({ message: 'خطأ في جلب السلة', error: err });
  }
};
