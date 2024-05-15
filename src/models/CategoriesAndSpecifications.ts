import mongoose, { Schema, Document } from 'mongoose';

// Specification Schema
const specificationSchema = new Schema({
  name: { type: String, required: true },
  value: [{ type: String, required: true }]  // Ensure it's an array of strings
});


const Specification = mongoose.model('Specification', specificationSchema);

// Category Schema
const categorySchema = new Schema({
  name: { type: String, required: true },
  parent: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', default: null },
  specifications: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Specification' }],
});

const Category = mongoose.model('Category', categorySchema);

export { Category, Specification };
