import express from 'express';
import {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  createProductReview,
  getTopProducts,
  getProductsByCategory,
} from '../controllers/productController.js';

import { protect, admin } from '../middleware/authMiddleware.js';

const router = express.Router();

// Öffentliche Routen
router.route('/').get(getProducts);
router.route('/top').get(getTopProducts);
router.route('/category/:category').get(getProductsByCategory);
router.route('/:id').get(getProductById);

// Geschützte Routen (Benutzer muss angemeldet sein)
router.route('/:id/reviews').post(protect, createProductReview);

// Admin-Routen (Benutzer muss angemeldet und Admin sein)
router.route('/').post(protect, admin, createProduct);
router.route('/:id').put(protect, admin, updateProduct);
router.route('/:id').delete(protect, admin, deleteProduct);

export default router;
