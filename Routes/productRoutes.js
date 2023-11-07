import express from 'express';
const router = express.Router();
import {
  deleteProduct,
  getAllProducts,
  updateProduct,
  createProduct,
  sellProducts,
  getAllSoldProducts,
  getNewStock,
} from '../Controllers/productController.js';
import { protect } from '../middleware/authMiddleware.js';
router.get('/', getAllProducts);
router.get('/newStock', getNewStock);
router.get('/soldProducts', getAllSoldProducts);
router.post('/', createProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);
router.post('/sellProducts', protect, sellProducts);

export default router;
