import axios from 'axios';

// 1. Base Setup (Backend ka Address)
// Agar production pe ho to URL change ho jaye, isliye variable use kiya
const API = axios.create({
    baseURL: 'http://localhost:5000/api', 
});

// 2. The "Token Guard" (Interceptor) 🛡️
// Ye function har request se pehle chalega.
// Agar LocalStorage mein token para hai, to ye usay Header mein chipka dega.
// Aapko baar baar "Bearer token" likhne ki zaroorat nahi paregi.
API.interceptors.request.use((req) => {
    const userInfo = localStorage.getItem('userInfo'); // Hum login k baad data yahan save karenge
    if (userInfo) {
        const token = JSON.parse(userInfo).token;
        req.headers.Authorization = `Bearer ${token}`;
    }
    return req;
});

// ==========================================
// 🔄 API FUNCTIONS (Backend se baat cheet)
// ==========================================

// 👉 AUTHENTICATION
export const loginUser = (credentials) => API.post('/users/login', credentials);
export const registerUser = (userData) => API.post('/users/register', userData);

// 👉 DASHBOARD (Home Screen)
export const fetchDashboardStats = () => API.get('/dashboard');

// 👉 CUSTOMERS
// Search empty ho to saray customers ayenge, warna filter ho jayenge
export const fetchCustomers = (search = '') => API.get(`/customers?search=${search}`);
export const addCustomer = (customerData) => API.post('/customers', customerData);
export const fetchCustomerLedger = (id) => API.get(`/customers/${id}/ledger`); // Khaata 📒

// 👉 MEASUREMENTS (Naap & Templates)
export const addTemplate = (data) => API.post('/measurements/template', data); // Settings
export const fetchTemplates = () => API.get('/measurements/templates'); // Dropdown k liye
export const saveMeasurement = (data) => API.post('/measurements', data);
// Magic Autofill: Customer aur Kapra select karne par purana naap layega
export const fetchLatestMeasurement = (customerId, clothType) => 
    API.get(`/measurements/latest?customerId=${customerId}&clothType=${clothType}`);
export const fetchCustomerMeasurements = (customerId) => API.get(`/measurements/${customerId}`);

// 👉 ORDERS
export const createOrder = (orderData) => API.post('/orders', orderData);
// Status empty ho to sab, warna filter (e.g., 'Pending')
export const fetchOrders = (status = '') => API.get(`/orders?status=${status}`);
export const updateOrderStatus = (id, status) => API.put(`/orders/${id}/status`, { status });

// 👉 EXPENSES (Hisaab Kitaab)
export const addExpense = (data) => API.post('/expenses', data);
// Profit & Loss Report
export const fetchFinancialReport = (startDate, endDate) => 
    API.get(`/expenses/report?startDate=${startDate}&endDate=${endDate}`);

// Error Handling Helper (Optional)
// Agar token expire ho jaye to user ko logout karwane k liye
API.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response && error.response.status === 401) {
            // Token expire ya invalid hai
            localStorage.removeItem('userInfo');
            window.location.href = '/login'; // Login page par bhej do
        }
        return Promise.reject(error);
    }
);

export default API;