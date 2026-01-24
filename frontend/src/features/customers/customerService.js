import API from '../../api'; // ✅ Central API import ki

// 1. Create New Customer
const createCustomer = async (customerData) => {
  const response = await API.post('/customers', customerData); // Sirf '/customers' likha
  return response.data;
};

// 2. Get All Customers
const getCustomers = async () => {
  const response = await API.get('/customers');
  return response.data;
};

// 3. Delete Customer
const deleteCustomer = async (id) => {
  const response = await API.delete(`/customers/${id}`);
  return response.data;
};

const customerService = {
  createCustomer,
  getCustomers,
  deleteCustomer,
};

export default customerService;