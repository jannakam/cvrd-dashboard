// hooks/useTransactions.js
import { useMutation, useQuery } from '@tanstack/react-query';
import api from '../lib/api';

export const useCreateTransaction = () => {
  return useMutation({
    mutationFn: async (transaction) => {
      try {
        // Format the request to match Spring's TransactionRequest exactly
        const transactionRequest = {
          cardNumber: transaction.cardNumber?.replace(/\s/g, ''), // Already concatenated from PaymentGateway
          cvv: transaction.cvv,
          expiryDate: transaction.expiryDate?.replace(/\D/g, ''), // Remove non-digits
          merchant: transaction.merchant || transaction.merchantName || 'Online Purchase',
          amount: parseFloat(transaction.amount),
          isRecurring: !!transaction.isRecurring,
          description: transaction.description || `Payment via ${transaction.paymentMethod || 'Card'}`,
          type: transaction.type || 'PURCHASE',
          category: transaction.category || 'GENERAL',
          longitude: transaction.longitude || null,
          latitude: transaction.latitude || null,
        };

        // Remove any undefined or null fields
        Object.keys(transactionRequest).forEach((key) => {
          if (transactionRequest[key] === undefined || transactionRequest[key] === null) {
            delete transactionRequest[key];
          }
        });

        console.log('Sending transaction request:', {
          ...transactionRequest,
          cardNumber: transactionRequest.cardNumber
            ? `${transactionRequest.cardNumber.slice(0, 6)}******${transactionRequest.cardNumber.slice(-4)}`
            : null,
          cvv: '***',
        });

        const response = await api.post('/transaction/process', transactionRequest);
        console.log('Transaction response:', {
          ...response.data,
          cardNumber: response.data.cardNumber
            ? `${response.data.cardNumber.slice(0, 6)}******${response.data.cardNumber.slice(-4)}`
            : null,
        });

        // Check if the response indicates a declined transaction
        if (response.data.status === 'DECLINED' || response.data.declineReason) {
          throw new Error(response.data.declineReason || 'Transaction declined');
        }

        return response.data;
      } catch (error) {
        console.error('Transaction error:', {
          message: error.message,
          response: error.response?.data,
          status: error.response?.status,
          url: error.config?.url,
          requestData: error.config?.data,
          details: error.details,
        });

        // Handle specific error cases
        if (error.message.includes('Card not found')) {
          throw new Error('Invalid card details. Please check your card information and try again.');
        }
        if (error.response?.data?.declineReason) {
          throw new Error(error.response.data.declineReason);
        }
        if (error.response?.status === 400) {
          throw new Error('Invalid transaction data. Please check your input and try again.');
        }

        throw new Error(error.message || 'Failed to process transaction. Please try again.');
      }
    },
  });
};

export const useGetUserTransactions = (userId) => {
  return useQuery({
    queryKey: ['transactions', 'user', userId],
    queryFn: async () => {
      if (!userId) return [];
      const { data } = await api.get(`/transaction/user/${userId}`);
      return data;
    },
    enabled: !!userId,
  });
};

export const useGetTransaction = (transactionId) => {
  return useQuery({
    queryKey: ['transaction', transactionId],
    queryFn: async () => {
      if (!transactionId) return null;
      const { data } = await api.get(`/transaction/${transactionId}`);
      return data;
    },
    enabled: !!transactionId,
  });
};

export const useGetAllTransactions = () => {
  return useQuery({
    queryKey: ['transactions'],
    queryFn: async () => {
      const { data } = await api.get('/transaction');
      return data;
    },
  });
};
