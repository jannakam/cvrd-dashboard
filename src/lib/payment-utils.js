export const formatCardNumber = (value) => {
  if (!value) return value;
  const cleanValue = value.replace(/\D/g, '');
  const groups = cleanValue.match(/.{1,4}/g) || [];
  return groups.join(' ');
};

export const formatExpiryDate = (value) => {
  if (!value) return value;

  // Remove any non-digit characters
  const cleanValue = value.replace(/\D/g, '');

  // Handle backspace when removing the forward slash
  if (cleanValue.length <= 2) {
    return cleanValue;
  }

  // Format as MM/YY
  return `${cleanValue.slice(0, 2)}/${cleanValue.slice(2, 4)}`;
};

export const formatPrice = (value) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(value);
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
        },
        payment: {
          method: details.paymentMethod || 'Card',
          total: details.amount,
          currency: 'USD',
        },
      });
    } else if (type === 'STORE_PURCHASE') {
      // Format each item with all available details
      const formattedItems = (details.items || []).map((item) => ({
        id: item.id,
        name: item.name,
        quantity: parseInt(item.quantity) || 1,
        unitPrice: parseFloat(item.price),
        totalPrice: parseFloat(item.totalItemPrice || item.price * item.quantity),
        category: item.category || 'General',
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
        },
        payment: {
          method: details.paymentMethod || 'Card',
          subtotal: parseFloat(details.subtotal || 0).toFixed(2),
          tax: parseFloat(details.tax || 0).toFixed(2),
          shipping: parseFloat(details.shipping || 0).toFixed(2),
          total: parseFloat(details.amount || 0).toFixed(2),
          currency: 'USD',
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
          amount: parseFloat(details.amount || 0).toFixed(2),
          currency: 'USD',
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
      amount: parseFloat(details.amount || 0).toFixed(2),
      error: 'Failed to generate full description',
    });
  }
};
