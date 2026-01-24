import API from '../../api';

// =============================
// 1. SETTINGS API (Templates)
// =============================

// Template banao (e.g. "Suit" -> ["Length", "Chest"])
// Backend Route: POST /api/measurements/template
const addTemplate = async (templateData) => {
  const response = await API.post('/measurements/template', templateData);
  return response.data;
};

// Saray Templates mangwao (Dropdown k liye)
// Backend Route: GET /api/measurements/templates
const getTemplates = async () => {
  const response = await API.get('/measurements/templates');
  return response.data;
};

// =============================
// 2. NAAP API (Measurements)
// =============================

// Naya Naap Save karo
const saveMeasurement = async (measurementData) => {
  const response = await API.post('/measurements', measurementData);
  return response.data;
};

// Kisi customer ka purana naap dhoondo (Edit k liye)
const getLatestMeasurement = async (customerId, clothType) => {
  const response = await API.get(`/measurements/latest?customerId=${customerId}&clothType=${clothType}`);
  return response.data;
};

const measurementService = {
  addTemplate,
  getTemplates,
  saveMeasurement,
  getLatestMeasurement
};

export default measurementService;