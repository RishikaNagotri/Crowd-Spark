// config/db.js
import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.Mongosh_Connection);
        console.log('MongoDB connected ');
    } catch (error) {
        console.error('MongoDB connection failed ', error);
        process.exit(1);
    }
};

export default connectDB;