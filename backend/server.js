import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import marketPlaceRoute from './routes/marketplace.js';
import productRoute from './routes/products.js';

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Routes
app.use('/products', productRoute);
app.use('/marketplace', marketPlaceRoute);

// Connect to MongoDB
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
        process.exit(1);
    }
};

connectDB();


const PORT = process.env.PORT || 0;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
