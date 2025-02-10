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
