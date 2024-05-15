import mongoose, { Schema } from "mongoose";

const dimensionsSchema = new Schema({
    depth: { type: Number },
    width: { type: Number },
    height: { type: Number },
    unit: { type: String, default: 'cm' }
});

const productSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true, min: 0 },
    inStock: { type: Boolean, default: true },
    stockQuantity: { type: Number, required: true, min: 0 },
    subCategories: [{ type: Schema.Types.ObjectId, ref: 'Subcategory' }],
    mainImage: { type: String },
    secondaryImages: [{ type: String }],
    colors: [{ type: String }],
    rating: {
        average: { type: Number, default: 0, min: 0, max: 5 },
        numberOfRatings: { type: Number, default: 0 }
    },
    dimensions: dimensionsSchema,
    weight: {
        value: { type: Number },
        unit: { type: String, default: 'kg' }
    },
    brand: { type: String, required: true },
    promotion: {
        promoType: String,
        promoValue: { type: Number, min: 0, max: 100 },
        startDate: Date,
        endDate: Date
    },
    availability: {
        type: String,
        enum: ['In stock', 'Out of stock', 'Discontinued'],
        default: 'In stock'
    }
});

const Product = mongoose.model('Product', productSchema);
export default Product;
