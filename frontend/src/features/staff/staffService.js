import axios from 'axios';

const API_URL = '/api/users/';

// 1. Get All Users (Staff)
const getStaff = async (token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`, // Token bhejna zaroori hai
    },
  };
  const response = await axios.get(API_URL, config);
  return response.data;
};

// 2. Create New User
const createStaff = async (userData, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.post(API_URL, userData, config);
  return response.data;
};

// 3. Delete User
const deleteStaff = async (id, token) => {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };
  const response = await axios.delete(API_URL + id, config);
  return response.data;
};

const staffService = {
  getStaff,
  createStaff,
  deleteStaff
};

export default staffService;