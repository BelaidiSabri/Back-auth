import { Category, Specification } from "../models/CategoriesAndSpecifications";

// Create a new category
export const createCategory = async (req, res) => {
  const { name, parent, specifications } = req.body;

  try {
    const newCategory = new Category({ name, parent });
    await newCategory.save();

    // Handle specifications if provided
    if (specifications && Array.isArray(specifications)) {
      for (const spec of specifications) {
        const newSpecification = new Specification(spec);
        await newSpecification.save();
        newCategory.specifications.push(newSpecification._id);
      }
      await newCategory.save();
    }

    res.status(201).json(newCategory);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all (or parent) categories
export const getCategories = async (req, res) => {
  try {
    const isParent = req.query.isParent;
    let categories;
    if (isParent) {
      categories = await Category.find({ parent: null }).populate('specifications');
    } else {
      categories = await Category.find().populate('specifications');
    }
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get a single category by ID
export const getCategoryById = async (req, res) => {
  try {
    const category = await Category.findById(req.params.id).populate('specifications');
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update a category by ID
export const updateCategory = async (req, res) => {
  try {
    const { name, parent, specifications } = req.body;
    const category = await Category.findById(req.params.id);

    if (!category) return res.status(404).json({ message: 'Category not found' });

    category.name = name ?? category.name;
    category.parent = parent ?? category.parent;

    // Clear existing specifications and add new ones if provided
    if (specifications && Array.isArray(specifications)) {
      category.specifications = [];  // clear existing specifications
      for (const spec of specifications) {
        const newSpecification = new Specification(spec);
        await newSpecification.save();
        category.specifications.push(newSpecification._id);
      }
    }

    await category.save();
    
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete a category by ID
export const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findByIdAndDelete(req.params.id);
    if (!category) return res.status(404).json({ message: 'Category not found' });
    res.status(200).json({ message: 'Category deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get subcategories by parent ID
export const getSubcategories = async (req, res) => {
  try {
    const parentId = req.params.parentId;
    const subcategories = await Category.find({ parent: parentId }).populate('specifications');
    res.status(200).json(subcategories);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get specifications by subcategory ID
export const getSpecificationsBySubcategoryId = async (req, res) => {
  try {
    const subcategoryId = req.params.subcategoryId;
    const subcategory = await Category.findById(subcategoryId).populate('specifications');
    if (!subcategory) return res.status(404).json({ message: 'Subcategory not found' });
    res.status(200).json(subcategory.specifications);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



























































/* import { Category, Subcategory } from '../models/CategoryDEPRECATED'; // Adjust this path as necessary

// Function to handle creating subcategories and returning their IDs
const createSubcategoryDocuments = async (subcategories) => {
    try {
        const subcategoryDocs = subcategories.map(name => ({ name }));
        const createdDocs = await Subcategory.insertMany(subcategoryDocs);
        return createdDocs.map(doc => doc._id);
    } catch (error) {
        console.error('Failed to create subcategory documents:', error);
        throw new Error('SubcategoryCreationFailed');
    }
};

export const createCategory = async (req, res) => {
    const { name, subcategories } = req.body;
    try {
        const subcategoryIds = await createSubcategoryDocuments(subcategories);
        const category = new Category({ name, subcategories: subcategoryIds });
        await category.save();
        res.status(201).json(category);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to create category', error: 'Internal Server Error' });
    }
};

export const getAllCategories = async (req, res) => {
    try {
        const categories = await Category.find({}).populate('subcategories');
        res.status(200).json(categories);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to get categories', error: 'Internal Server Error' });
    }
};

export const updateCategory = async (req, res) => {
    const { id } = req.params;
    const { name, subcategories } = req.body;
    try {
        const subcategoryIds = await createSubcategoryDocuments(subcategories);
        const updatedCategory = await Category.findByIdAndUpdate(id, { name, subcategories: subcategoryIds }, { new: true }).populate('subcategories');
        if (!updatedCategory) {
            return res.status(404).json({ message: 'Category not found' });
        }
        res.status(200).json(updatedCategory);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to update category', error: 'Internal Server Error' });
    }
};
 */