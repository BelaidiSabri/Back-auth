import mongoose from 'mongoose';
const { Schema } = mongoose;

// Define Subcategory Schema
const subcategorySchema = new Schema({
    name: {
        type: String,
        required: true
    }
});

// Define Category Schema
const categorySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    subcategories: [{
        type: Schema.Types.ObjectId,
        ref: 'Subcategory'
    }]
});

// Create model from the schemas
const Subcategory = mongoose.model('Subcategory', subcategorySchema);
const Category = mongoose.model('Category', categorySchema);

export { Category, Subcategory };
