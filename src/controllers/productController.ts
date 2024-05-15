import { Request, Response } from 'express';
import Product from '../models/Product'; // Ensure your Product model is also converted to TypeScript


// Assuming 'req.files' is properly typed by your Multer setup
interface MulterRequest extends Request {
    files: {
        [fieldname: string]: Express.Multer.File[];
    } | undefined;
}

export const createProduct = async (req: Request, res: Response): Promise<void> => {
    try {
        const multerRequest = req as MulterRequest; // Cast req to the custom MulterRequest type
        const files = multerRequest.files;
        
        const mainImage = files?.mainImage ? `http://${req.headers.host}/uploads/${files.mainImage[0].filename}` : null;
        const secondaryImages = files?.['secondaryImages[]'] ? files['secondaryImages[]'].map(file => `http://${req.headers.host}/uploads/${file.filename}`) : [];

        const productData = {
            ...req.body,
            mainImage: mainImage,
            secondaryImages: secondaryImages
        };

        const product = new Product(productData);
        await product.save();

        const populatedProduct = await Product.findById(product._id).populate('subCategories');
        res.status(201).json(populatedProduct);
    } catch (error: any) {
        console.error('Failed to create product:', error.message);
        res.status(400).json({ message: error.message });
    }
};


// Retrieve all products with pagination and optional search
export const getAllProducts = async (req: Request, res: Response): Promise<void> => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;

    const searchTerm = req.query.search as string || '';

    // Initialize query as an indexable type
    interface QueryType {
        [key: string]: any;  // Allows any property with any MongoDB filter type
    }
    
    let query: QueryType = {};

    // Add search term to query if it exists
    if (searchTerm) {
        query['name'] = { $regex: searchTerm, $options: "i" };
    }

    // Define all possible filter fields
    const filterFields = ['subCategories', 'brand', 'color', 'priceMin', 'priceMax'];
    
    filterFields.forEach(field => {

        const value = req.query[field];
        if (value !== undefined) {
            switch (field) {
                case 'priceMin':
                    if (!query['price']) query['price'] = {};
                    query['price']['$gte'] = parseFloat(value as string);
                    break;
                case 'priceMax':
                    if (!query['price']) query['price'] = {};
                    query['price']['$lte'] = parseFloat(value as string);
                    break;
                default:
                    query[field] = value;
                    break;
            }
        }
    });

    try {
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