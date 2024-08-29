require('dotenv').config(); // Ensure this is at the top
const mongoose = require('mongoose');

const dbURI = process.env.MONGO_URL;

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB connected successfully');
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1); 
    }
};

module.exports = connectDB;
