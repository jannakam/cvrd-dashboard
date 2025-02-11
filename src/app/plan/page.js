'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { subscriptions } from '@/data/subscriptions';
import { ModeToggle } from '@/components/ModeToggle';
import { Check, Crown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Footer } from '@/components/Footer';

export default function PlanPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [subscription, setSubscription] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const serviceId = searchParams.get('service');

  useEffect(() => {
    if (serviceId) {
      const sub = subscriptions.find((s) => s.id === serviceId);
      if (sub) {
        setSubscription(sub);
        // Set the popular plan as default selected
        const popularPlan = sub.plans.find((p) => p.popular);
        setSelectedPlan(popularPlan?.name);
      }
    }
  }, [serviceId]);

  if (!subscription) {
    return <div>Loading...</div>;
  }

  const handlePlanSelect = (planName) => {
    setSelectedPlan(planName);
  };

  const handleGetStarted = (plan) => {
    const searchParams = new URLSearchParams({
      // Service details
      service: subscription.id,
      serviceName: subscription.name,
      serviceCategory: subscription.categories[0],

      // Plan details
      plan: plan.name,
      total: plan.price.toFixed(2),
      billingCycle: 'monthly',

      // Features
      devices: plan.features.find((f) => f.includes('device'))?.match(/\d+/)?.[0] || '1',
      quality: plan.features.find((f) => f.includes('quality'))?.replace(' quality', '') || 'HD',
      features: plan.features.join(','),

      // Transaction type
      isRecurring: 'true',
    });

    router.push(`/payment?${searchParams.toString()}`);
  };

  return (
    <div className="flex min-h-screen w-full flex-col justify-center font-[family-name:var(--font-geist-sans)]">
      {/* Navigation */}
      <nav
        className={`fixed top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60 ${subscription.background_color}`}
      >
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            <div className="flex h-8 w-24 items-center justify-center rounded font-bold text-white">
              {subscription.name}
            </div>
          </div>
          <div className="flex items-center gap-4"></div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container flex flex-col items-center justify-center self-center pt-24">
        <div className="mx-auto w-full max-w-5xl space-y-20">
          <div className="mb-20 text-center">
            <h1 className="text-4xl font-bold">Choose Your Plan</h1>
            <p className="mt-2 text-muted-foreground">Select the perfect plan for your streaming needs</p>
          </div>

          <div className="grid place-items-center gap-6 md:grid-cols-3">
            {subscription.plans.map((plan, index) => (
              <div
                key={plan.name}
                className={`w-full max-w-[320px] ${index === 1 ? 'md:-mt-4 md:mb-4' : ''}`}
                onClick={() => handlePlanSelect(plan.name)}
              >
                <Card
                  className={`relative mt-4 flex h-full flex-col overflow-hidden border-2 transition-all duration-200 ${
                    selectedPlan === plan.name
                      ? 'z-10 border-primary shadow-lg'
                      : hoveredPlan === plan.name
                        ? 'cursor-pointer border-primary/50'
                        : 'cursor-pointer border-transparent hover:border-primary/50'
                  } ${index === 1 ? 'md:scale-110' : ''}`}
                  onMouseEnter={() => setHoveredPlan(plan.name)}
                  onMouseLeave={() => setHoveredPlan(null)}
                >
                  {plan.popular && (
                    <div className="w-full bg-zinc-900 py-1.5 text-center text-sm font-medium text-white">
                      <span className="flex items-center justify-center gap-1">
                        <Crown className="h-4 w-4" /> Most Popular
                      </span>
                    </div>
                  )}
                  <div className="flex h-full flex-col p-6">
                    <div>
                      <h2 className="text-2xl font-bold">{plan.name}</h2>
                      <div className="mt-4 flex items-baseline">
                        <span className="text-3xl font-bold">KWD {plan.price}</span>
                        <span className="ml-1 text-muted-foreground">/month</span>
                      </div>
                    </div>
                    <ul className="mt-6 flex-1 space-y-4">
                      {plan.features.map((feature) => (
                        <li key={feature} className="flex items-center">
                          <Check className="mr-2 h-5 w-5 text-green-500" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      className={cn(
                        'mt-8 w-full text-white',
                        selectedPlan === plan.name
                          ? `hover:bg-zinc-700 hover:opacity-90 dark:bg-zinc-700`
                          : 'bg-zinc-600 hover:bg-zinc-700 dark:bg-zinc-700 dark:hover:bg-zinc-600'
                      )}
                      size="lg"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleGetStarted(plan);
                      }}
                    >
                      {selectedPlan === plan.name ? 'Get Started' : 'Select Plan'}
                    </Button>
                  </div>
                </Card>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center text-sm text-muted-foreground">
            <p>Prices may vary depending on your location</p>
            <p>Cancel anytime. Certain restrictions apply.</p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
