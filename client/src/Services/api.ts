import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API Calls
export const getBusInfo = async () => {
  try {
    const response = await api.get('/bus');
    return response.data;
  } catch (error) {
    console.error('Error fetching bus info:', error);
    throw error;
  }
};

export const getAllBuses = async () => {
  try {
    const response = await api.get('/buses');
    return response.data;
  } catch (error) {
    console.error('Error fetching all buses:', error);
    throw error;
  }
};

export default api;