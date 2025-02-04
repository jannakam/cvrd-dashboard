// Transaction status constants
export const TRANSACTION_STATUS = {
  PENDING: 'PENDING',
  SUCCESS: 'SUCCESS',
  FAILED: 'FAILED'
};

// Transaction type constants
export const TRANSACTION_TYPE = {
  SUBSCRIPTION: 'SUBSCRIPTION',
  STORE_PURCHASE: 'STORE_PURCHASE'
};

// Transaction category constants
export const TRANSACTION_CATEGORY = {
  ENTERTAINMENT: 'ENTERTAINMENT',
  SHOPPING: 'SHOPPING',
  STREAMING: 'STREAMING',
  FOOD: 'FOOD',
  TECHNOLOGY: 'TECHNOLOGY',
  OTHER: 'OTHER'
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
      ...transactionData
    };
    
    // Add new transaction to array
    existingTransactions.push(enhancedData);
    
    // Save back to localStorage
    localStorage.setItem('transactions', JSON.stringify(existingTransactions));
    
    return enhancedData;
  } catch (error) {
    console.error('Error saving transaction:', error);
    throw error;
  }
};

// Function to get all transactions
export const getAllTransactions = () => {
  try {
    return JSON.parse(localStorage.getItem('transactions') || '[]');
  } catch (error) {
    console.error('Error retrieving transactions:', error);
    return [];
  }
};

// Function to get transaction by ID
export const getTransactionById = (transactionId) => {
  try {
    const transactions = getAllTransactions();
    return transactions.find(t => t.id === transactionId);
  } catch (error) {
    console.error('Error retrieving transaction:', error);
    return null;
  }
};

// Function to update transaction status
export const updateTransactionStatus = (transactionId, status) => {
  try {
    const transactions = getAllTransactions();
    const updatedTransactions = transactions.map(t => 
      t.id === transactionId ? { ...t, status } : t
    );
    localStorage.setItem('transactions', JSON.stringify(updatedTransactions));
  } catch (error) {
    console.error('Error updating transaction:', error);
    throw error;
  }
};

// Function to get transactions by date range
export const getTransactionsByDateRange = (startDate, endDate) => {
  try {
    const transactions = getAllTransactions();
    return transactions.filter(t => {
      const txnDate = new Date(t.timestamp);
      return txnDate >= startDate && txnDate <= endDate;
    });
  } catch (error) {
    console.error('Error retrieving transactions by date range:', error);
    return [];
  }
};

// Function to get transactions by category
export const getTransactionsByCategory = (category) => {
  try {
    const transactions = getAllTransactions();
    return transactions.filter(t => t.category === category);
  } catch (error) {
    console.error('Error retrieving transactions by category:', error);
    return [];
  }
};

// Function to clear all transactions (useful for testing/development)
export const clearTransactions = () => {
  localStorage.removeItem('transactions');
}; 