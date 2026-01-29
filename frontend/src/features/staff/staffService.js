import API from '../../api';

// 1. Create New Staff (Register)
const createStaff = async (userData) => {
  const response = await API.post('/users', userData);
  return response.data;
};

// 2. Get All Staff
const getStaff = async () => {
  const response = await API.get('/users');
  return response.data;
};

// 3. Delete Staff
const deleteStaff = async (id) => {
  const response = await API.delete(`/users/${id}`);
  return response.data;
};

const staffService = {
  createStaff,
  getStaff,
  deleteStaff,
};

export default staffService;