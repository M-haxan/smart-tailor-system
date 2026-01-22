const Order = require('../models/order');
const Customer = require('../models/Customer');

// @desc    Get Dashboard Stats (Home Screen Data)
// @route   GET /api/dashboard
// @access  Private (Admin only)
const getDashboardStats = async (req, res) => {
  try {
    // 1. Total Customers Ginti karo
    const totalCustomers = await Customer.countDocuments();

    // 2. Orders ki Ginti
    const totalOrders = await Order.countDocuments();
    
    // Wo orders jo abhi deliver nahi hue (Pending/Cutting/Stitching)
    const activeOrders = await Order.countDocuments({ status: { $ne: 'Delivered' } });
    
    // Wo orders jo deliver ho chuke hain
    const completedOrders = await Order.countDocuments({ status: 'Delivered' });

    // 3. Revenue Calculation (Paise) 💰
    // Hum sirf 'Delivered' orders ke paise count karenge (Real Income)
    const revenueData = await Order.aggregate([
      { $match: { status: 'Delivered' } }, // Filter: Sirf delivered uthao
      { $group: { _id: null, totalIncome: { $sum: "$amount.total" } } } // Sum: Total jama karo
    ]);

    // Agar abhi koi order deliver nahi hua to 0, warna total amount
    const totalRevenue = revenueData.length > 0 ? revenueData[0].totalIncome : 0;

    // 4. Response
    res.json({
      totalCustomers,
      totalOrders,
      activeOrders,
      completedOrders,
      totalRevenue
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getDashboardStats };