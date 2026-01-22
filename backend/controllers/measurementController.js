const Measurement = require('../models/Measurement');
const MeasurementTemplate = require('../models/MeasurementTemplate');
const Customer = require('../models/Customer');

// ========================
// 1. SETTINGS (Template)
// ========================

// @desc    Naya Template Banana (e.g. Shalwar Kameez)
// @route   POST /api/measurements/template
const addTemplate = async (req, res) => {
  try {
    const { name, fields } = req.body;

    // Check duplicate
    const exists = await MeasurementTemplate.findOne({ user: req.user._id, name });
    if (exists) {
      return res.status(400).json({ message: 'Template already exists' });
    }

    const template = await MeasurementTemplate.create({
      user: req.user._id,
      name,
      fields
    });
    res.status(201).json(template);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Saray Templates Mangwana (Dropdown k liye)
// @route   GET /api/measurements/templates
const getTemplates = async (req, res) => {
  try {
    const templates = await MeasurementTemplate.find({ user: req.user._id });
    res.json(templates);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// ========================
// 2. NAAP (Measurement)
// ========================

// @desc    Customer ka PURANA naap dhoondna (Edit k liye) 🔍
// @route   GET /api/measurements/latest?customerId=123&clothType=Shalwar Kameez
const getLatestMeasurement = async (req, res) => {
  try {
    const { customerId, clothType } = req.query;

    // Sab se aakhri (Latest) naap dhoondo
    const measurement = await Measurement.findOne({ 
        customer: customerId, 
        clothType: clothType 
    }).sort({ createdAt: -1 }); // -1 means Newest First

    if (measurement) {
      res.json(measurement); // Agar mil gya to bhej do (Form pre-fill ho jayega)
    } else {
      res.json(null); // Agar nahi mila to khali form dikhao
    }

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Naap Save karna (New or Update)
// @route   POST /api/measurements
const saveMeasurement = async (req, res) => {
  try {
    const { customerId, clothType, fittings, notes } = req.body;

    // Hum hamesha new record banayenge taake HISTORY maintain rahay.
    // Frontend par user ko lagega ke "Edit" hua hai, lekin backend par
    // hum purana record save rakh kar naya bana denge.
    // Ye "Pro" tareeqa hai (Audit Trail).
    
    const measurement = await Measurement.create({
      customer: customerId,
      clothType,
      fittings,
      notes
    });

    res.status(201).json(measurement);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { 
    addTemplate, 
    getTemplates, 
    getLatestMeasurement, // <--- Ye naya function hai aapke flow k liye
    saveMeasurement 
};