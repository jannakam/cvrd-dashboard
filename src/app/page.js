import { ModeToggle } from '@/components/ModeToggle';
import HomePage from '@/components/Netflix/HomePage';

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="fixed right-8 top-8 z-50">
        <ModeToggle />
      </div>
      <HomePage />
    </div>
  );
}
