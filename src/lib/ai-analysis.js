import { GoogleGenerativeAI } from '@google/generative-ai';
import { getAllTransactions, getTransactionsByDateRange, getTransactionsByCategory } from './transaction-storage';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);

// Helper function to format transactions for AI analysis
const formatTransactionsForAnalysis = (transactions) => {
  return transactions.map(t => ({
    date: new Date(t.timestamp).toLocaleDateString(),
    amount: t.amount,
    category: t.category,
    type: t.type,
    regularPrice: t.regularPrice,
    discountApplied: t.discountApplied,
    isRecurring: t.isRecurring,
    frequency: t.frequency,
    merchantInfo: t.merchantInfo,
    seasonalTiming: t.seasonalTiming
  }));
};

// Function to get spending analysis
export const getSpendingAnalysis = async (startDate, endDate) => {
  try {
    const transactions = startDate && endDate 
      ? getTransactionsByDateRange(startDate, endDate)
      : getAllTransactions();

    const formattedTransactions = formatTransactionsForAnalysis(transactions);

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      Analyze these transactions and provide insights about spending habits and potential savings opportunities.
      Focus on:
      1. Overall spending patterns and trends
      2. Category-wise breakdown and analysis
      3. Recurring vs one-time expenses
      4. Potential savings opportunities based on:
         - Timing of purchases (seasonal sales, etc.)
         - Alternative subscription plans
         - Bulk purchase opportunities
         - Similar product alternatives
      5. Specific actionable recommendations for future spending

      Transactions data:
      ${JSON.stringify(formattedTransactions, null, 2)}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting AI analysis:', error);
    throw error;
  }
};

// Function to get personalized savings recommendations
export const getSavingsRecommendations = async () => {
  try {
    const transactions = getAllTransactions();
    const formattedTransactions = formatTransactionsForAnalysis(transactions);

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      Based on these transactions, provide specific, actionable recommendations for saving money.
      Consider:
      1. Subscription optimization (better plans, bundling opportunities)
      2. Timing recommendations for future purchases
      3. Alternative products or services that could provide better value
      4. Specific sales events or seasons to wait for
      5. Bulk purchase opportunities
      6. Loyalty program or rewards opportunities

      Transactions data:
      ${JSON.stringify(formattedTransactions, null, 2)}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting savings recommendations:', error);
    throw error;
  }
};

// Function to get category-specific insights
export const getCategoryInsights = async (category) => {
  try {
    const transactions = getTransactionsByCategory(category);
    const formattedTransactions = formatTransactionsForAnalysis(transactions);

    const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

    const prompt = `
      Analyze these transactions for the ${category} category and provide detailed insights.
      Focus on:
      1. Spending patterns within this category
      2. Price trends and seasonal variations
      3. Specific opportunities for savings in this category
      4. Recommendations for optimal timing of future purchases
      5. Alternative products or services to consider

      Transactions data:
      ${JSON.stringify(formattedTransactions, null, 2)}
    `;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Error getting category insights:', error);
    throw error;
  }
}; 