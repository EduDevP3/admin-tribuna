import axios from 'axios';

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || 'http://localhost:82/api/v1',
  withCredentials: true, // This is important for sending cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
