import PaymentGateway from '@/components/payment/PaymentGateway';
import { ModeToggle } from '@/components/ModeToggle';
import { Footer } from '@/components/Footer';
import { Suspense } from 'react';

export default function PaymentPage() {
  return (
    <div className="flex min-h-screen w-full flex-col justify-center font-[family-name:var(--font-geist-sans)]">
      <Suspense
        fallback={<div className="flex min-h-[60vh] items-center justify-center">Loading payment gateway...</div>}
      >
        <PaymentGateway />
      </Suspense>
      <Footer />
    </div>
  );
}
