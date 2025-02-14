export const formatCardNumber = (value, isKNET = false) => {
  if (!value) return value;
  const cleanValue = value.replace(/\D/g, '');

  if (isKNET) {
    // For KNET cards, format remaining numbers as 2-4-4
    if (cleanValue.length <= 2) {
      return cleanValue;
    }
    if (cleanValue.length <= 6) {
      return `${cleanValue.slice(0, 2)} ${cleanValue.slice(2)}`;
    }
    if (cleanValue.length <= 10) {
      return `${cleanValue.slice(0, 2)} ${cleanValue.slice(2, 6)} ${cleanValue.slice(6)}`;
    }
    return `${cleanValue.slice(0, 2)} ${cleanValue.slice(2, 6)} ${cleanValue.slice(6, 10)}`;
  }

  // For regular credit cards, format as 4-4-4-4
  const groups = cleanValue.match(/.{1,4}/g) || [];
  return groups.join(' ');
};

export const formatExpiryDate = (value) => {
  if (!value) return value;

  // Remove any non-digit characters
  const cleanValue = value.replace(/\D/g, '');

  // Handle first digit of month
  if (cleanValue.length === 1) {
    if (parseInt(cleanValue) > 1) {
      // If first digit is greater than 1, prepend 0
      return `0${cleanValue}`;
    }
    return cleanValue;
  }

  // Handle second digit of month
  if (cleanValue.length === 2) {
    const month = parseInt(cleanValue);
    if (month > 12) {
      // If month is greater than 12, keep only first digit
      return cleanValue[0];
    }
    return cleanValue;
  }

  // Handle month/year format
  if (cleanValue.length >= 3) {
    const month = cleanValue.slice(0, 2);
    const year = cleanValue.slice(2, 4);
    return `${month}/${year}`;
  }

  return cleanValue;
};

export const formatPrice = (value) => {
  return `KD ${new Intl.NumberFormat('en-KW', {
    minimumFractionDigits: 3,
    maximumFractionDigits: 3,
  }).format(value)}`;
};

export const validateCardPayment = (cardNumber, expiryDate, cvv) => {
  const cardNumberClean = cardNumber.replace(/\D/g, '');
  const expiryClean = expiryDate.replace(/\D/g, '');
  const cvvClean = cvv.replace(/\D/g, '');

  // Basic validation rules
  const isCardNumberValid = cardNumberClean.length >= 15 && cardNumberClean.length <= 16;
  const isExpiryValid = expiryClean.length === 4;
  const isCvvValid = cvvClean.length >= 3 && cvvClean.length <= 4;

  return isCardNumberValid && isExpiryValid && isCvvValid;
};

export const validateCVRDPayment = (cardNumber, expiryDate, cvv, selectedBank, cardPrefix) => {
  console.log('Validating CVRD payment inputs:', {
    cardNumber: cardNumber?.length,
    expiryDate,
    cvv: cvv?.length,
    selectedBank,
    cardPrefix,
  });

  const cardNumberClean = cardNumber?.replace(/\D/g, '') || '';
  const expiryClean = expiryDate?.replace(/\D/g, '') || '';
  const cvvClean = cvv?.replace(/\D/g, '') || '';

  // Basic validation rules with more lenient checks
  const validationResults = {
    cardNumber: cardNumberClean.length >= 10, // More lenient card number length
    expiry: expiryClean.length >= 3, // Allow partial expiry dates
    cvv: cvvClean.length >= 3,
    bank: Boolean(selectedBank),
    prefix: Boolean(cardPrefix),
  };

  // Log each validation result separately for debugging
  Object.entries(validationResults).forEach(([field, isValid]) => {
    console.log(`${field} validation:`, {
      isValid,
      value:
        field === 'cardNumber'
          ? cardNumberClean.length
          : field === 'expiry'
            ? expiryClean.length
            : field === 'cvv'
              ? cvvClean.length
              : field === 'bank'
                ? selectedBank
                : cardPrefix,
    });
  });

  const isValid = Object.values(validationResults).every((result) => result);
  console.log('Final validation result:', isValid);

  return isValid;
};

export const generateTransactionDescription = (type, details) => {
  try {
    let description = '';

    if (type === 'SUBSCRIPTION') {
      description = JSON.stringify({
        type: 'SUBSCRIPTION',
        merchant: {
          name: details.service,
          category: details.merchantCategory || 'Streaming Service',
          location: {
            latitude: details.latitude || null,
            longitude: details.longitude || null,
          },
        },
        subscription: {
          plan: details.plan,
          price: details.amount,
          billingCycle: details.billingCycle || 'monthly',
          devices: details.devices || 1,
          quality: details.quality || 'HD',
          features: details.features?.split(',') || [],
        },
        payment: {
          method: details.paymentMethod || 'Card',
          total: parseFloat(details.amount || 0).toFixed(3),
          currency: 'KWD',
          isRecurring: true,
        },
      });
    } else if (type === 'STORE_PURCHASE') {
      // Format each item with all available details
      const formattedItems = (details.items || []).map((item) => ({
        id: item.id,
        name: item.name,
        quantity: parseInt(item.quantity) || 1,
        unitPrice: parseFloat(item.price).toFixed(3),
        totalPrice: parseFloat(item.totalItemPrice || item.price * item.quantity).toFixed(3),
        category: item.category || 'General',
        details: {
          image: item.image || null,
          description: item.description || null,
          stock: item.stock || null,
        },
      }));

      description = JSON.stringify({
        type: 'STORE_PURCHASE',
        merchant: {
          name: details.merchant,
          category: details.merchantCategory,
          description: details.storeDescription,
          location: {
            latitude: details.latitude || null,
            longitude: details.longitude || null,
          },
        },
        items: formattedItems,
        itemsSummary: {
          count: formattedItems.length,
          totalItems: formattedItems.reduce((sum, item) => sum + item.quantity, 0),
          categories: [...new Set(formattedItems.map((item) => item.category))],
        },
        payment: {
          method: details.paymentMethod || 'Card',
          subtotal: parseFloat(details.subtotal || 0).toFixed(3),
          shipping: parseFloat(details.shipping || 0).toFixed(3),
          total: parseFloat(details.amount || 0).toFixed(3),
          currency: 'KWD',
          isRecurring: false,
        },
      });

      // Log the description for debugging
      console.log('Generated transaction description:', {
        merchant: details.merchant,
        items: formattedItems,
        total: details.amount,
      });
    } else {
      description = JSON.stringify({
        type: 'GENERAL_PURCHASE',
        merchant: {
          name: details.merchant,
          category: details.merchantCategory || 'General',
          location: {
            latitude: details.latitude || null,
            longitude: details.longitude || null,
          },
        },
        payment: {
          method: details.paymentMethod || 'Card',
          amount: parseFloat(details.amount || 0).toFixed(3),
          currency: 'KWD',
          isRecurring: false,
        },
      });
    }

    return description;
  } catch (error) {
    console.error('Error generating transaction description:', error);
    console.error('Details received:', details);
    return JSON.stringify({
      type,
      merchant: details.merchant,
      amount: parseFloat(details.amount || 0).toFixed(3),
      error: 'Failed to generate full description',
    });
  }
};
