import mongoose from "mongoose";

const { Schema } = mongoose;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    inStock: {
        type: Boolean,
        default: true
    },
    stockQuantity: {
        type: Number,
        required: true,
        min: 0
    },
    categories: [{
        //type: Schema.Types.ObjectId,
        type: String,
        //ref: 'Category'
    }],
    images: [{
        type: String
    }],
    colors:[{
        type: String
    }],
    rating: {
        average: {
            type: Number,
            default: 0,
            min: 0,
            max: 5
        },
        numberOfRatings: {
            type: Number,
            default: 0
        }
    },
    dimensions: {
        length: Number,
        width: Number,
        height: Number,
        unit: {
            type: String,
            default: 'cm'
        }
    },
    weight: {
        value: Number,
        unit: {
            type: String,
            default: 'kg'
        }
    },
/*     seller: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }, */
    brand: {
        type: String,
        required: true
    },
    promotion: {
        promoType: String,
        promoValue: {
            type: Number,
            min: 0,   // Minimum discount of 0%
            max: 100, // Maximum discount of 100%
            validate: {
                validator: Number.isInteger,
                message: '{VALUE} is not an integer value'
            }
        },
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
