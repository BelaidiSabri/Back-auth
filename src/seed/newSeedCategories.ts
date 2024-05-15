import mongoose from 'mongoose';
import dotenv from 'dotenv';
import fs from 'fs';
import { Command } from 'commander';
import { Spinner } from 'cli-spinner';
import { Category, Specification } from '../models/CategoriesAndSpecifications';
import { CategoryType } from './CategoryType';

dotenv.config();

const rawCategoriesData = fs.readFileSync('src/seed/categoriesShort.json', 'utf-8');
const categoriesData: CategoryType = JSON.parse(rawCategoriesData);

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('Error connecting to MongoDB', error);
    process.exit(1);
  }
};

const importCategories = async () => {
  const spinner = new Spinner('Importing categories.. %s');
  spinner.setSpinnerString('|/-\\');
  spinner.start();

  await connectDB();
  
  try {
    for (const [parentCategoryName, subcategories] of Object.entries(categoriesData)) {
      const parentCategory = new Category({ name: parentCategoryName });
      await parentCategory.save();

      for (const [subcategoryName, details] of Object.entries(subcategories)) {
        const subcategory = new Category({
          name: subcategoryName,
          parent: parentCategory._id
        });
        await subcategory.save();

        for (const [specName, values] of Object.entries(details.Specifications)) {
          const spec = new Specification({ name: specName, value: values.join(', ') });
          await spec.save();
          subcategory.specifications.push(spec._id);
        }
        await subcategory.save();
      }
    }
    console.log('Categories imported successfully');
  } catch (error) {
    console.error('Error importing categories:', error);
  } finally {
    mongoose.connection.close();
    spinner.stop(true);
  }
};

const deleteCategories = async () => {
  const spinner = new Spinner('Deleting categories.. %s');
  spinner.setSpinnerString('|/-\\');
  spinner.start();

  await connectDB();

  try {
    await Category.deleteMany({});
    await Specification.deleteMany({});
    console.log('Categories deleted successfully');
  } catch (error) {
    console.error('Error deleting categories:', error);
  } finally {
    mongoose.connection.close();
    spinner.stop(true);
  }
};

const program = new Command();

program
  .option('--import', 'Import categories')
  .option('--delete', 'Delete categories');

program.parse(process.argv);

const options = program.opts();

if (options.import) {
  importCategories();
} else if (options.delete) {
  deleteCategories();
} else {
  console.log('Please specify an action: --import or --delete');
}
