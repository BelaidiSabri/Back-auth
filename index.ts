import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './src/routes/authRoutes'; // Import the userRoutes
import cors from 'cors'
import cookieParser from 'cookie-parser';
import productRoutes from './src/routes/productRoutes';
import categoryRoutes from './src/routes/categoryRoutes';
import specificationRoutes from './src/routes/specificationRoutes';
//import categoryRoutes from './src/routes/categoryRoutes';
//import insertCategories from './src/seed/PopulateCategories';


dotenv.config();

const app = express();

const corsOptions = {
  origin: ['http://localhost:5173', 'https://oliviashop.ca'], 
  credentials: true  
};

app.use(cors(corsOptions));

app.use('/uploads', express.static('uploads'));



// Body Parser Middleware
app.use(express.json()); // Needed to parse JSON bodies
app.use(cookieParser());


app.use('/api/user', userRoutes); 
app.use('/api/products', productRoutes);
//app.use('/api/categories', categoryRoutes); 
app.use('/api/categories', categoryRoutes);
app.use('/api/specifications', specificationRoutes);



mongoose.connect(process.env.MONGO_URI as string)
    .then(() => {
        console.log("MongoDB connected");
        // Optionally, call insertCategories here to populate categories after DB connection
       // insertCategories().then(() => {
           // console.log("Categories populated on server start");
       // });
    })
    .catch(err => {
        console.log(err);
    });

    app.listen(3000, () => {
      console.log('Server listening on port 3000');
    });
