// lib/api.ts
import axios from 'axios';
import { toast } from '@/hooks/use-toast';

const api = axios.create({
  baseURL: 'http://172.20.10.8:8080',
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
    toast({
      variant: 'destructive',
      title: 'Request Failed',
      description: 'Failed to send request. Please try again.',
    });
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
        toast({
          variant: 'destructive',
          title: 'Transaction Declined',
          description: data.declineReason || 'Transaction declined',
        });
        return {
          ...response,
          data: {
            ...data,
            status: 'DECLINED',
            declineReason: data.declineReason || 'Transaction declined',
          },
        };
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

    // Show appropriate toast notification based on error type
    if (error.response?.status === 401) {
      toast({
        variant: 'destructive',
        title: 'Authentication Error',
        description: 'Please log in again to continue.',
      });
    } else if (error.response?.status === 403) {
      toast({
        variant: 'destructive',
        title: 'Access Denied',
        description: 'You do not have permission to perform this action.',
      });
    } else if (error.response?.status === 404) {
      toast({
        variant: 'destructive',
        title: 'Not Found',
        description: 'The requested resource was not found.',
      });
    } else if (error.response?.status >= 500) {
      toast({
        variant: 'destructive',
        title: 'Server Error',
        description: 'An unexpected error occurred. Please try again later.',
      });
    } else {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'An unexpected error occurred.',
      });
    }

    // Enhance error object with our custom details
    error.details = errorDetails;
    return Promise.reject(error);
  }
);

export default api;
