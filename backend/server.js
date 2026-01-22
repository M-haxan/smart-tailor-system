const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes'); // 1. File Import ki
const customerRoutes = require('./routes/customerRoutes');
const measurementRoutes = require('./routes/measurementRoutes');
const orderRoutes = require('./routes/orderRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const expenseRoutes = require('./routes/expenseRoutes');

// 1. Config Load karein
dotenv.config();

// 2. Database Connect karein
connectDB();

// 3. Express App Banayen
const app = express();

// 4. Middlewares (Security & JSON Parsing)
app.use(cors());           // Frontend ko access do
app.use(express.json());   // JSON data parhne ki taqat do
// Neeche app.use mein
app.use('/api/customers', customerRoutes);
// 5. Basic Route (Checking ke liye)
app.get('/', (req, res) => {
    res.send('API is Running... Smart Tailor Backend 🚀');
});
app.use('/api/users', userRoutes);
app.use('/api/measurements', measurementRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/expenses', expenseRoutes);
// 6. Server Start karein
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
});
