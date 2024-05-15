import express from 'express';
import {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
  getSubcategories,
  getSpecificationsBySubcategoryId,
} from '../controllers/categoryController';

const categoryRoutes = express.Router();

categoryRoutes.post('/', createCategory);
categoryRoutes.get('/', getCategories);
categoryRoutes.get('/subcategories/:parentId', getSubcategories);
categoryRoutes.get('/specifications/:subcategoryId', getSpecificationsBySubcategoryId);
categoryRoutes.get('/:id', getCategoryById);
categoryRoutes.put('/:id', updateCategory);
categoryRoutes.delete('/:id', deleteCategory);

export default categoryRoutes;
























/* import express from 'express';
import { createCategory, getAllCategories, updateCategory } from '../controllers/categoryController';

const categoryRoutes = express.Router();

// Route to create a new category with its subcategories
categoryRoutes.post('/', createCategory);

// Route to retrieve all categories along with their subcategories
categoryRoutes.get('/', getAllCategories);

// Route to update a category by ID, including updating or adding new subcategories
categoryRoutes.put('/:id', updateCategory);

// Optionally, add a route to delete a category
//categoryRoutes.delete('/:id', deleteCategory);

// Optionally, add a route to get a single category by ID
//categoryRoutes.get('/:id', getCategory);

export default categoryRoutes; */
