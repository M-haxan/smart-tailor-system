const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// 1. Config Load karein
dotenv.config();

// 2. Database Connect karein
connectDB();

// 3. Express App Banayen
const app = express();

// 4. Middlewares (Security & JSON Parsing)
app.use(cors());           // Frontend ko access do
app.use(express.json());   // JSON data parhne ki taqat do

// 5. Basic Route (Checking ke liye)
app.get('/', (req, res) => {
    res.send('API is Running... Smart Tailor Backend 🚀');
});

// 6. Server Start karein
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});