import { Request, Response } from 'express';
import Product from '../models/Product'; // Ensure your Product model is also converted to TypeScript

// Create a new product
export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = new Product(req.body);
        await product.save();
        res.status(201).json(product);
    } catch (error: any) {
        res.status(400).json({ message: error.message });
    }
};

// Retrieve all products with pagination and optional search
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    
    const searchTerm = req.query.search as string || '';

    try {
        const query = searchTerm ? { name: { $regex: searchTerm, $options: "i" } } : {};
        const products = await Product.find(query).skip(skip).limit(limit);
        const total = await Product.countDocuments(query);

        res.status(200).json({
            total,
            pages: Math.ceil(total / limit),
            currentPage: Math.floor(skip / limit) + 1,
            products
        });
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};



// Retrieve a single product by id
export const getProductById = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Update a product
export const updateProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (product) {
            res.status(200).json(product);
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};

// Delete a product
export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if (product) {
            res.status(200).json({ message: "Product deleted successfully" });
        } else {
            res.status(404).json({ message: "Product not found" });
        }
    } catch (error: any) {
        res.status(500).json({ message: error.message });
    }
};