'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { formatPrice } from '@/lib/payment-utils';

export function PayPalForm({ isProcessing, onSubmit, total }) {
  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="space-y-4">
        <div className="rounded-lg bg-muted p-4">
          <div className="mb-2 flex items-center justify-between">
            <span className="text-sm font-medium">Amount to Pay</span>
            <span className="text-lg font-bold">{formatPrice(parseFloat(total))}</span>
          </div>
          <div className="text-sm text-muted-foreground">
            You will be redirected to PayPal to sign in and complete your payment securely
          </div>
        </div>
      </div>
      <Button type="submit" className="w-full" size="lg" disabled={isProcessing}>
        {isProcessing ? 'Redirecting to PayPal...' : 'Sign in with PayPal'}
      </Button>
    </form>
  );
}
