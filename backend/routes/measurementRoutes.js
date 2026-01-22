const express = require('express');
const router = express.Router();
const { 
    addTemplate, 
    getTemplates, 
    saveMeasurement, 
    getLatestMeasurement 
} = require('../controllers/measurementController');
const { protect } = require('../middleware/authMiddleware');

// Settings Routes
router.post('/template', protect, addTemplate);
router.get('/templates', protect, getTemplates);

// Measurement Routes
router.post('/', protect, saveMeasurement);
router.get('/latest', protect, getLatestMeasurement); // <--- Edit wala route

module.exports = router;