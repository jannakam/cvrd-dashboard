'use client';
import React from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/payment-utils';

export function PayPalForm({ paypalEmail, setPaypalEmail, isProcessing, onSubmit }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">PayPal Email</label>
          <Input
            type="email"
            placeholder="your@email.com"
            className="w-full"
            value={paypalEmail}
            onChange={(e) => setPaypalEmail(e.target.value)}
            required
          />
        </div>
        <div className="rounded-lg bg-muted p-4 text-sm text-muted-foreground">
          You will be redirected to PayPal to complete your payment securely
        </div>
      </div>
      <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
        {isProcessing ? 'Processing...' : 'Continue with PayPal'}
      </Button>
    </form>
  );
}
