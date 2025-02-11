'use client';
// contexts/AuthContext.js
import { createContext, useContext, useEffect, useState } from 'react';
import api from '../lib/api';
import { useRouter } from 'next/navigation';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext({
  user: null,
  login: async () => {},
  logout: () => {},
  isLoading: true,
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  // Safe check for localStorage that only runs on client
  useEffect(() => {
    setMounted(true);
  }, []);

  // Function to check if token is expired
  const isTokenExpired = (token) => {
    try {
      const decoded = jwtDecode(token);
      // Check if the token has expired
      return decoded.exp * 1000 < Date.now();
    } catch (error) {
      console.error('Token decode error:', error);
      return true;
    }
  };

  // Function to set up axios interceptors
  const setupAxiosInterceptors = (token) => {
    // Request interceptor
    api.interceptors.request.use(
      (config) => {
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );

    // Response interceptor
    api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;

        // If the error is 401 and we haven't tried to refresh the token yet
        if (error.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          // Handle token expiration
          if (isTokenExpired(token)) {
            console.log('Token expired, logging out');
            logout();
            return Promise.reject(new Error('Session expired. Please login again.'));
          }
        }
        return Promise.reject(error);
      }
    );
  };

  const checkAuth = async () => {
    if (!mounted) return;

    console.log('Checking authentication...');
    const token = localStorage.getItem('token');
    console.log('Token found:', !!token);

    if (token) {
      // Check if token is expired
      if (isTokenExpired(token)) {
        console.log('Token is expired');
        localStorage.removeItem('token');
        setUser(null);
        setIsLoading(false);
        return;
      }

      // Set up axios interceptors with the token
      setupAxiosInterceptors(token);

      try {
        console.log('Fetching user data...');
        const { data } = await api.get('/user/me');
        console.log('User data received:', data);
        setUser(data);
      } catch (error) {
        console.error('Auth check failed:', error);
        localStorage.removeItem('token');
        setUser(null);
        if (error.response?.status === 401) {
          router.push('/login');
        }
      }
    } else {
      console.log('No token found, clearing user');
      setUser(null);
    }
    setIsLoading(false);
  };

  // Check auth when mounted
  useEffect(() => {
    if (mounted) {
      checkAuth();
    }
  }, [mounted]);

  // Add a listener for storage events to handle token changes
  useEffect(() => {
    if (!mounted) return;

    const handleStorageChange = (e) => {
      if (e.key === 'token') {
        console.log('Token changed, rechecking auth');
        checkAuth();
      }
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, [mounted]);

  const login = async (email, password) => {
    if (!mounted) return;

    try {
      console.log('Attempting login with:', { email });

      // Login request
      const { data: loginData } = await api.post('/auth/login-user', { email, password });
      console.log('Login response:', loginData);

      if (!loginData?.token) {
        throw new Error('No token received from server');
      }

      // Validate token before storing
      if (isTokenExpired(loginData.token)) {
        throw new Error('Received expired token from server');
      }

      // Store token
      localStorage.setItem('token', loginData.token);
      console.log('Token stored');

      // Set up axios interceptors with the new token
      setupAxiosInterceptors(loginData.token);

      // Fetch user data
      const { data: userData } = await api.get('/user/me');
      console.log('User data fetched:', userData);

      if (!userData) {
        throw new Error('No user data received');
      }

      // Update user state
      setUser(userData);
      console.log('User state updated');

      return {
        success: true,
        user: userData,
        token: loginData.token,
      };
    } catch (error) {
      console.error('Login error details:', {
        message: error.message,
        response: error.response,
        status: error?.response?.status,
        data: error?.response?.data,
        stack: error.stack,
      });
      throw new Error(error.response?.data?.message || 'Login failed. Please try again.');
    }
  };

  const logout = () => {
    if (!mounted) return;

    console.log('Logging out...');
    localStorage.removeItem('token');
    setUser(null);

    // Reset axios default headers
    delete api.defaults.headers.common['Authorization'];

    router.push('/login');
  };

  // Periodically check token expiration
  useEffect(() => {
    if (!mounted) return;

    const checkTokenExpiration = () => {
      const token = localStorage.getItem('token');
      if (token && isTokenExpired(token)) {
        console.log('Token expired during session check');
        logout();
      }
    };

    const interval = setInterval(checkTokenExpiration, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [mounted]);

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isLoading,
        isAuthenticated: !!user && !!localStorage.getItem('token'),
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
