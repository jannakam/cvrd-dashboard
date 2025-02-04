'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatCardNumber, formatExpiryDate, formatPrice } from '@/lib/payment-utils';

export function CardPaymentForm({
  cardNumber,
  setCardNumber,
  expiryDate,
  setExpiryDate,
  cvv,
  setCvv,
  isProcessing,
  total,
  onSubmit,
}) {
  const handleExpiryChange = (e) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setExpiryDate(formattedValue);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Card Number</label>
          <Input
            type="text"
            placeholder="1234 5678 9012 3456"
            value={formatCardNumber(cardNumber)}
            onChange={(e) => setCardNumber(e.target.value)}
            maxLength="19"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Expiry Date</label>
            <Input type="text" placeholder="MM/YY" value={expiryDate} onChange={handleExpiryChange} maxLength="5" />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium">CVV</label>
            <Input type="text" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} maxLength="3" />
          </div>
        </div>
      </div>
      <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
        {isProcessing ? 'Processing...' : `Pay ${formatPrice(parseFloat(total))}`}
      </Button>
    </form>
  );
}
