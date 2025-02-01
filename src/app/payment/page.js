import PaymentGateway from '@/screens/PaymentGateway';
import { ModeToggle } from "@/components/ModeToggle";

export default function PaymentPage() {
  return (
    <div className="min-h-screen w-full font-[family-name:var(--font-geist-sans)]">
      <div className="fixed top-8 right-8 z-50">
        <ModeToggle />
      </div>
      <PaymentGateway />
    </div>
  );
} 