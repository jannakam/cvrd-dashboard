import PaymentStatus from '@/components/payment/PaymentStatus';
import { Suspense } from 'react';

export default function PaymentStatusPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center">Loading payment status...</div>}>
      <PaymentStatus />
    </Suspense>
  );
}
