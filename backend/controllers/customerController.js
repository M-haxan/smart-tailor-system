const Customer = require('../models/Customer');
//const { addCustomer, searchCustomers } = require('../controllers/customerController');
// @desc    Add New Customer
// @route   POST /api/customers
// @access  Private (Sirf Login walay log)
const addCustomer = async (req, res) => {
  try {
    const { name, phone, address, city } = req.body;

    // Check agar pehle se customer hai
    const customerExists = await Customer.findOne({ phone });
    if (customerExists) {
      return res.status(400).json({ message: 'Customer already exists with this phone!' });
    }

    const customer = await Customer.create({
      name,
      phone,
      address,
      city
    });

    res.status(201).json(customer);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Search Customer (By Name or Phone) 🔍
// @route   GET /api/customers?search=ali
// @access  Private
const searchCustomers = async (req, res) => {
  try {
    // URL se search word nikalo (e.g., ?search=0300)
    const keyword = req.query.search
      ? {
        $or: [
          // Regex ka matlab: Milta julta dhoondo ('i' means case insensitive - Ali/ali same hai)
          { name: { $regex: req.query.search, $options: 'i' } },
          { phone: { $regex: req.query.search, $options: 'i' } },
        ],
      }
      : {};

    // DB mein dhoondo aur Newest pehle dikhao
    const customers = await Customer.find(keyword).sort({ createdAt: -1 });

    res.json(customers);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @route   GET /api/customers/:id/ledger
const getCustomerLedger = async (req, res) => {
  try {
    const customerId = req.params.id;

    // 1. Is customer k saray orders nikalo
    const orders = await Order.find({ customer: customerId }).sort({ createdAt: -1 });

    // 2. Calculation (Maths) 🧮
    // Hum loop laga kar check karenge k total kitne suits hain aur udhar kitna hai
    
    let totalSuits = 0;
    let totalSpent = 0;   // Aaj tak kitne ka kaam karwaya
    let totalPending = 0; // Kitna Udhar baqi hai

    orders.forEach(order => {
      totalSuits += order.quantity;       // Suits ginte jao
      totalSpent += order.amount.total;   // Total bill ginte jao
      totalPending += order.amount.balance; // Sirf baqaya (Udhar) ginte jao
    });

    // 3. Response Bhejo
    res.json({
      summary: {
        totalSuits,
        totalSpent,
        totalPending, // <--- Ye wo figure hai jo Master Sahab ko chahiye (RED COLOR MEIN)
      },
      orders: orders // Neeche poori list bhi dikha denge detail k liye
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addCustomer, searchCustomers, getCustomerLedger };