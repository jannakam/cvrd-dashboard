export const formatCardNumber = (value) => {
  const v = value.replace(/\s+/g, '').replace(/[^0-9]/gi, '');
  const matches = v.match(/\d{4,16}/g);
  const match = (matches && matches[0]) || '';
  const parts = [];

  for (let i = 0, len = match.length; i < len; i += 4) {
    parts.push(match.substring(i, i + 4));
  }

  if (parts.length) {
    return parts.join(' ');
  }
  return value;
};

export const formatExpiryDate = (value) => {
  const cleanValue = value.replace(/\D/g, '');

  if (value.length < expiryDate.length && value.length === 2) {
    return cleanValue.slice(0, -1);
  }

  if (cleanValue.length >= 2) {
    const month = cleanValue.slice(0, 2);
    const year = cleanValue.slice(2, 4);

    if (parseInt(month) > 12) {
      return '12' + (year ? '/' + year : '');
    }
    if (parseInt(month) === 0) {
      return '01' + (year ? '/' + year : '');
    }

    return month + (cleanValue.length > 2 ? '/' + year : '');
  }

  return cleanValue;
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-KW', {
    style: 'currency',
    currency: 'KWD',
  }).format(price);
};

export const validateCardPayment = (cardNumber, expiryDate, cvv) => {
  const cleanCardNumber = cardNumber.replace(/\s/g, '');
  const isCardNumberValid = cleanCardNumber.length >= 14 && cleanCardNumber.length <= 16;
  const isExpiryValid = expiryDate.length === 5;
  const isCvvValid = cvv.length === 3;

  return isCardNumberValid && isExpiryValid && isCvvValid;
};

export const validateCVRDPayment = (cardNumber, expiryDate, cvv, selectedBank, cardPrefix) => {
  const cleanCardNumber = cardNumber.replace(/\s/g, '');
  const isCardNumberValid = cardPrefix.length === 6 && cleanCardNumber.length === 12;
  const isExpiryValid = expiryDate.length === 5;
  const isCvvValid = cvv.length === 3;

  return isCardNumberValid && isExpiryValid && isCvvValid && selectedBank && cardPrefix;
};
