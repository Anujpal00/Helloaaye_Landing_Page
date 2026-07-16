import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const createInquiry = async (inquiryData) => {
  const response = await api.post('/inquiry', inquiryData);
  return response.data;
};

export const getInquiries = async (params = {}) => {
  const response = await api.get('/inquiry', { params });
  return response.data;
};

export const getInquiryById = async (id) => {
  const response = await api.get(`/inquiry/${id}`);
  return response.data;
};

export const deleteInquiry = async (id) => {
  const response = await api.delete(`/inquiry/${id}`);
  return response.data;
};

export default api;
