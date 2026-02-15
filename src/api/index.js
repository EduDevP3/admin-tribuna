import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://tribuna-back.onrender.com/api/v1',
  withCredentials: true, // This is important for sending cookies
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
