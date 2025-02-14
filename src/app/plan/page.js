import { Suspense } from 'react';
import PlanContent from '@/components/plan/PlanContent';

export default function PlanPage() {
  return (
    <Suspense fallback={<div className="flex min-h-[60vh] items-center justify-center">Loading plan details...</div>}>
      <PlanContent />
    </Suspense>
  );
}
