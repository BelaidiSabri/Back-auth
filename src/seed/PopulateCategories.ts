/* import dotenv from 'dotenv';
import { Category, Subcategory } from '../models/Category'; // Make sure this path matches your file structure
import { categories as categoryData } from './categories';

dotenv.config();

const createSubcategories = async (subcategories) => {
    const subcategoryDocs = subcategories.map(subcategory => ({ name: subcategory }));
    return await Subcategory.insertMany(subcategoryDocs);
};

const insertCategories = async () => {
    try {
        // Delete existing subcategories and categories
        await Subcategory.deleteMany({});
        await Category.deleteMany({});

        // Populate new subcategories and categories
        for (const category of categoryData) {
            const subcategoryDocs = await createSubcategories(category.subcategories);
            const subcategoryIds = subcategoryDocs.map(doc => doc._id);
            await Category.create({ name: category.name, subcategories: subcategoryIds });
        }
        console.log('Categories have been reset and populated!');
    } catch (error) {
        console.error('Error resetting and populating categories:', error);
    }
};

export default insertCategories;
 */