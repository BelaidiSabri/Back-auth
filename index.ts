import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import userRoutes from './src/routes/authRoutes'; // Import the userRoutes
import cors from 'cors'
import cookieParser from 'cookie-parser';
import productRoutes from './src/routes/productRoutes';


dotenv.config();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173', // Adjust to match your frontend's origin
  credentials: true  // Allows the server to receive and send cookies
}));

// Body Parser Middleware
app.use(express.json()); // Needed to parse JSON bodies

app.use(cookieParser());


app.use('/api/users', userRoutes); 
app.use('/api/products', productRoutes);


mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

app.get('/', (req, res) => {
  res.send('hello');
});

app.listen(3000, () => {
  console.log('App listening on port 3000');
});
