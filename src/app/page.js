import { ModeToggle } from "@/components/ModeToggle";
import SelectPlan from "@/screens/Netflix/SelectPlan";

export default function Home() {
  return (
    <div className="min-h-screen font-[family-name:var(--font-geist-sans)]">
      <div className="fixed top-8 right-8 z-50">
        <ModeToggle />
      </div>
      <SelectPlan />
    </div>
  );
}
