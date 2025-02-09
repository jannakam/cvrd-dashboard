'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { formatCardNumber, formatExpiryDate, formatPrice } from '@/lib/payment-utils';

const banks = [
  {
    name: 'Boubyan Bank',
    prefixes: ['470735' ,'470350', '490455', '490456'],
  },
  {
    name: 'Kuwait Finance House',
    prefixes: ['510012', '510134', '510256'],
  },
  {
    name: 'Ahli United Bank',
    prefixes: ['450012', '450134', '450256'],
  },
  {
    name: 'Burgan Bank',
    prefixes: ['520012', '520134', '520256'],
  },
  {
    name: 'National Bank of Kuwait',
    prefixes: ['410012', '410134', '410256'],
  },
  {
    name: 'Warba Bank',
    prefixes: ['530012', '530134', '530256'],
  },
  {
    name: 'Al-Tijari Bank',
    prefixes: ['430012', '430134', '430256'],
  },
  {
    name: 'Kuwait International Bank',
    prefixes: ['540012', '540134', '540256'],
  },
  {
    name: 'Al Ahli Bank of Kuwait',
    prefixes: ['440012', '440134', '440256'],
  },
  {
    name: 'Bank of Bahrain and Kuwait',
    prefixes: ['550012', '550134', '550256'],
  },
  {
    name: 'Gulf Bank',
    prefixes: ['460012', '460134', '460256'],
  },
];

export function CVRDForm({
  selectedBank,
  setSelectedBank,
  cardPrefix,
  setCardPrefix,
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
  const availablePrefixes = banks.find((bank) => bank.name.toLowerCase() === selectedBank)?.prefixes || [];

  const handleExpiryChange = (e) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setExpiryDate(formattedValue);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Select Bank</label>
          <Select
            value={selectedBank}
            onValueChange={(value) => {
              setSelectedBank(value);
              setCardPrefix('');
            }}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select your bank" />
            </SelectTrigger>
            <SelectContent>
              {banks.map((bank) => (
                <SelectItem key={bank.name} value={bank.name.toLowerCase()}>
                  {bank.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="flex w-full gap-4">
          <div className="w-1/3">
            <Select value={cardPrefix} onValueChange={setCardPrefix} disabled={!selectedBank}>
              <SelectTrigger>
                <SelectValue placeholder="First 6 digits" />
              </SelectTrigger>
              <SelectContent>
                {availablePrefixes.map((prefix) => (
                  <SelectItem key={prefix} value={prefix}>
                    {prefix}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <Input
            className="w-2/3"
            type="text"
            placeholder="Remaining card number"
            value={formatCardNumber(cardNumber)}
            onChange={(e) => setCardNumber(e.target.value)}
            maxLength="14"
            disabled={!cardPrefix}
          />
        </div>

        <div className="flex gap-4">
          <div className="w-1/2">
            <label className="text-sm font-medium">Expiry Date</label>
            <Input type="text" placeholder="MM/YY" value={expiryDate} onChange={handleExpiryChange} maxLength="5" />
          </div>
          <div className="w-1/2">
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
