import express from 'express';
import {
    createProduct,
    getAllProducts,
    getProductById,
    updateProduct,
    deleteProduct
} from '../controllers/productController';
import verifyToken from '../middlwares/authmiddlware';
import { paginationMiddleware } from '../middlwares/paginationMiddlware';
import upload from '../config/multerConfig';

const productRoutes = express.Router();

// Route to create a new product
//productRoutes.post('/', createProduct);

// Setup for multiple fields
productRoutes.post('/', upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'secondaryImages[]', maxCount: 5 }
]), createProduct);
// Route to retrieve all products
productRoutes.get('/', paginationMiddleware, getAllProducts);

// Route to retrieve a specific product by id
productRoutes.get('/:id', getProductById);

// Route to update a product
productRoutes.put('/:id', updateProduct);

// Route to delete a product
productRoutes.delete('/:id',verifyToken, deleteProduct);

export default productRoutes  ;
