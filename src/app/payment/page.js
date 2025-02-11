import PaymentGateway from '@/components/payment/PaymentGateway';
import { ModeToggle } from '@/components/ModeToggle';
import { Footer } from '@/components/Footer';

export default function PaymentPage() {
  return (
    <div className="flex min-h-screen w-full flex-col justify-center font-[family-name:var(--font-geist-sans)]">
      <div className="fixed right-8 top-8 z-50">
      </div>
      <PaymentGateway />
      <Footer />
    </div>
  );
}
