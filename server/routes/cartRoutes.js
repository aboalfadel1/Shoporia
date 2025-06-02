// server/routes/cartRoutes.js
import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { addOrUpdateCart, getCart } from '../controllers/cartController.js';

const router = express.Router();

router.get('/', protect, getCart);
router.post('/', protect, addOrUpdateCart);

export default router;
