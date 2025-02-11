// Transaction status constants
import { toast } from '@/hooks/use-toast';

export const TRANSACTION_STATUS = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED',
};

// Transaction type constants
export const TRANSACTION_TYPE = {
  SUBSCRIPTION: 'SUBSCRIPTION',
  STORE_PURCHASE: 'STORE_PURCHASE',
};

// Transaction category constants
export const TRANSACTION_CATEGORY = {
  ENTERTAINMENT: 'ENTERTAINMENT',
  SHOPPING: 'SHOPPING',
  STREAMING: 'STREAMING',
  FOOD: 'FOOD',
  TECHNOLOGY: 'TECHNOLOGY',
  OTHER: 'OTHER',
};

// Function to generate a unique transaction ID
const generateTransactionId = () => {
  return 'txn_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);
};

// Function to save a transaction
export const saveTransaction = (transactionData) => {
  try {
    // Get existing transactions or initialize empty array
    const existingTransactions = JSON.parse(localStorage.getItem('transactions') || '[]');

    // Enhance transaction data with additional fields for AI analysis
    const enhancedData = {
      id: generateTransactionId(),
      timestamp: new Date().toISOString(),
      category: transactionData.category || TRANSACTION_CATEGORY.OTHER,
      regularPrice: transactionData.regularPrice || transactionData.amount, // Original price before any discounts
      discountApplied: transactionData.discountApplied || 0,
      isRecurring: !!transactionData.service, // Whether this is a recurring payment
      frequency: transactionData.frequency || 'one-time', // monthly, annual, one-time
      itemDetails: transactionData.itemDetails || [], // Array of items purchased
      merchantInfo: transactionData.merchantInfo || {}, // Additional merchant information
      seasonalTiming: transactionData.seasonalTiming || '', // e.g., "holiday", "summer-sale", etc.
      ...transactionData,
    };

    // Add new transaction to array
    existingTransactions.push(enhancedData);

    // Save back to localStorage
    localStorage.setItem('transactions', JSON.stringify(existingTransactions));

    return enhancedData;
  } catch (error) {
    console.error('Error saving transaction:', error);
    toast({
      variant: 'destructive',
      title: 'Save Error',
      description: 'Failed to save transaction details.',
    });
    return null;
  }
};

// Function to get all transactions
export const getAllTransactions = () => {
  try {
    return JSON.parse(localStorage.getItem('transactions') || '[]');
  } catch (error) {
    console.error('Error retrieving transactions:', error);
    toast({
      variant: 'destructive',
      title: 'Retrieval Error',
      description: 'Failed to retrieve transaction history.',
    });
    return [];
  }
};

// Function to get transaction by ID
export const getTransactionById = (transactionId) => {
  try {
    const transactions = getAllTransactions();
    return transactions.find((t) => t.id === transactionId);
  } catch (error) {
    console.error('Error retrieving transaction:', error);
    toast({
      variant: 'destructive',
      title: 'Retrieval Error',
      description: 'Failed to retrieve transaction details.',
    });
    return null;
  }
};

// Function to update transaction status
export const updateTransactionStatus = (transactionId, status) => {
  try {
    const transactions = getAllTransactions();
    const updatedTransactions = transactions.map((t) => (t.id === transactionId ? { ...t, status } : t));
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  } catch (error) {
    console.error('Error updating transaction:', error);
    toast({
      variant: 'destructive',
      title: 'Update Error',
      description: 'Failed to update transaction status.',
    });
  }
};

// Function to get transactions by date range
export const getTransactionsByDateRange = (startDate, endDate) => {
  try {
    const transactions = getAllTransactions();
    return transactions.filter((t) => {
      const txnDate = new Date(t.timestamp);
      return txnDate >= startDate && txnDate <= endDate;
    });
  } catch (error) {
    console.error('Error retrieving transactions by date range:', error);
    toast({
      variant: 'destructive',
      title: 'Retrieval Error',
      description: 'Failed to retrieve transactions for the specified date range.',
    });
    return [];
  }
};

// Function to get transactions by category
export const getTransactionsByCategory = (category) => {
  try {
    const transactions = getAllTransactions();
    return transactions.filter((t) => t.category === category);
  } catch (error) {
    console.error('Error retrieving transactions by category:', error);
    toast({
      variant: 'destructive',
      title: 'Retrieval Error',
      description: 'Failed to retrieve transactions for the specified category.',
    });
    return [];
  }
};

// Function to clear all transactions (useful for testing/development)
export const clearTransactions = () => {
  try {
    localStorage.removeItem('transactions');
  } catch (error) {
    console.error('Error clearing transactions:', error);
    toast({
      variant: 'destructive',
      title: 'Clear Error',
      description: 'Failed to clear transaction history.',
    });
  }
};
