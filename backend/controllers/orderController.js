const Order = require('../models/order');
const Customer = require('../models/Customer');
const Measurement = require('../models/Measurement');

// @desc    Naya Order Lagana (Create New Order)
// @route   POST /api/orders
const createOrder = async (req, res) => {
  try {
    const { 
      customerId, 
      measurementId, 
      clothType, 
      deliveryDate, 
      quantity, 
      amount, // { total: 5000, advance: 1000 }
      urgent,
      notes 
    } = req.body;

    // 1. Auto-Generate Order Number Logic 🔢
    // Hum DB se puchte hain: "Sab se aakhri order kaunsa tha?"
    const lastOrder = await Order.findOne().sort({ orderNumber: -1 });
    
    // Agar koi order mila to usme +1 karo, warna 1 se shuru karo
    const orderNumber = lastOrder ? lastOrder.orderNumber + 1 : 1;

    // 2. Calculate Balance 💰
    // Agar advance nahi aya to 0 maan lo
    const advance = amount.advance || 0;
    const balance = amount.total - advance;

    // 3. Create Order
    const order = await Order.create({
      orderNumber,
      customer: customerId,
      measurement: measurementId,
      clothType,
      deliveryDate,
      quantity,
      amount: {
        total: amount.total,
        advance: advance,
        balance: balance
      },
      urgent,
      status: 'Pending' // Shuru mein hamesha Pending hoga
    });

    res.status(201).json(order);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Orders ki List Dekhna (Dashboard k liye) 📋
// @route   GET /api/orders?status=Pending
const getOrders = async (req, res) => {
  try {
    // Filter Logic:
    // Agar frontend bhejta hai ?status=Pending to sirf Pending dikhao.
    // Agar kuch nahi bhejta to saray dikhao.
    const filter = {};
    if (req.query.status) {
      filter.status = req.query.status;
    }

    const orders = await Order.find(filter)
      .populate('customer', 'name phone') // Customer ka naam sath laye ga
      .populate('assignedWorker', 'name') // Worker ka naam sath laye ga
      .sort({ createdAt: -1 }); // Naya order sab se upar

    res.json(orders);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Order ka Status Badalna (e.g. Cutting -> Stitching)
// @route   PUT /api/orders/:id/status
const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body; // e.g. "Ready"

    const order = await Order.findById(req.params.id);

    if (order) {
      order.status = status;
      
      // Future Logic: Agar status 'Delivered' ho jaye, to Balance 0 kar dena chahiye? 
      // Filhal sirf status update karte hain.
      
      const updatedOrder = await order.save();
      res.json(updatedOrder);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { createOrder, getOrders, updateOrderStatus };