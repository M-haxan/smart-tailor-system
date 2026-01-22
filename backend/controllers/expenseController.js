const Expense = require('../models/Expense');
const Order = require('../models/order');

// @desc    Naya Kharcha Add karna
// @route   POST /api/expenses
const addExpense = async (req, res) => {
  try {
    const { title, amount, category, date, notes } = req.body;

    const expense = await Expense.create({
      title,
      amount,
      category,
      date: date || Date.now(),
      recordedBy: req.user._id, // Login wala banda
      notes
    });

    res.status(201).json(expense);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Financial Report (Profit & Loss) 💰📈
// @route   GET /api/expenses/report?startDate=2024-01-01&endDate=2024-01-31
const getFinancialReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    // Filter Logic: Agar date di hai to us range mein dhoondo, warna shuru se ab tak
    const dateFilter = {};
    if (startDate && endDate) {
      dateFilter.createdAt = { 
        $gte: new Date(startDate), // Greater than Start
        $lte: new Date(endDate)    // Less than End
      };
    }

    // 1. CALCULATE TOTAL INCOME (From Orders) 💵
    // Sirf 'Delivered' orders ko Income mano (Kyunk wo paisa pakka hai)
    const incomeStats = await Order.aggregate([
      { 
        $match: { 
          status: 'Delivered', 
          ...dateFilter 
        } 
      },
      { $group: { _id: null, totalRevenue: { $sum: "$amount.total" } } }
    ]);
    const totalIncome = incomeStats.length > 0 ? incomeStats[0].totalRevenue : 0;


    // 2. CALCULATE TOTAL EXPENSE (From Expenses) 💸
    const expenseStats = await Expense.aggregate([
      { $match: dateFilter }, // Date range apply karo
      { $group: { _id: null, totalExpense: { $sum: "$amount" } } }
    ]);
    const totalExpense = expenseStats.length > 0 ? expenseStats[0].totalExpense : 0;


    // 3. NET PROFIT ⚖️
    const netProfit = totalIncome - totalExpense;

    // 4. Breakdown by Category (e.g. Rent: 5000, Salary: 10000)
    // Ye chart banane k liye kaam ayega
    const expenseBreakdown = await Expense.aggregate([
        { $match: dateFilter },
        { $group: { _id: "$category", amount: { $sum: "$amount" } } }
    ]);

    res.json({
      period: { startDate, endDate },
      totalIncome,
      totalExpense,
      netProfit, // <--- Ye hai asli figure (Green ya Red)
      isLoss: netProfit < 0, // Frontend ko batane k liye k loss hua hai
      expenseBreakdown
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { addExpense, getFinancialReport };