// lib/api.ts
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
  timeout: 10000,
  validateStatus: (status) => status >= 200 && status < 300,
  withCredentials: false,
});

// Add request interceptor
api.interceptors.request.use(
  (config) => {
    // For transaction processing, don't add auth header
    if (config.url === '/transaction/process') {
      delete config.headers.Authorization;
    } else {
      const token = localStorage.getItem('token');
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }

    // Log the full request details
    console.log('API Request:', {
      url: config.url,
      method: config.method,
      headers: config.headers,
      data: config.data,
    });

    return config;
  },
  (error) => {
    console.error('Request interceptor error:', error);
    return Promise.reject(error);
  }
);

// Add response interceptor for better error handling
api.interceptors.response.use(
  (response) => {
    // For transaction responses, check the response structure
    if (response.config.url === '/transaction/process') {
      const data = response.data;
      if (data.status === 'DECLINED' || data.declineReason) {
        const error = new Error(data.declineReason || 'Transaction declined');
        error.response = response;
        throw error;
      }
    }

    // Log successful response
    console.log('API Response:', {
      status: response.status,
      statusText: response.statusText,
      data: response.data,
    });
    return response;
  },
  (error) => {
    // Log detailed error information
    const errorDetails = {
      message: error.message,
      status: error.response?.status,
      statusText: error.response?.statusText,
      data: error.response?.data,
      request: {
        url: error.config?.url,
        method: error.config?.method,
        data: error.config?.data,
      },
    };
    console.error('API Error:', errorDetails);

    // Enhance error object with our custom details
    error.details = errorDetails;
    return Promise.reject(error);
  }
);

export default api;
