'use client';
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { useRouter } from 'next/navigation';

const plans = [
  {
    name: 'Basic',
    quality: '720p',
    price: 'US$8.99',
    videoQuality: 'Good',
    resolution: '720p (HD)',
    supportedDevices: 'TV, computer, mobile phone, tablet',
    simultaneousDevices: '1',
    downloadDevices: '1',
  },
  {
    name: 'Standard',
    quality: '1080p',
    price: 'US$9.99',
    videoQuality: 'Great',
    resolution: '1080p (Full HD)',
    supportedDevices: 'TV, computer, mobile phone, tablet',
    simultaneousDevices: '2',
    downloadDevices: '2',
    isCurrentPlan: true,
  },
  {
    name: 'Premium',
    quality: '4K + HDR',
    price: 'US$17.99',
    videoQuality: 'Best',
    resolution: '4K (Ultra HD) + HDR',
    supportedDevices: 'TV, computer, mobile phone, tablet',
    simultaneousDevices: '4',
    downloadDevices: '6',
    spatialAudio: true,
  },
];

export default function SelectPlan() {
  const router = useRouter();
  const [hoveredPlan, setHoveredPlan] = useState(null);
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSelectPlan = (plan) => {
    if (!plan.isCurrentPlan) {
      setSelectedPlan(plan.name);
    }
  };

  const handlePayment = (e, plan) => {
    e.stopPropagation();
    if (!plan.isCurrentPlan) {
      router.push('/payment');
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center">
      <div className="px-4 py-8">
        <div className="mb-12 text-center">
          <h1 className="mb-2 text-3xl font-bold">Change plan</h1>
          <p className="text-muted-foreground">Try a new plan. You can always change back if you don&apos;t love it.</p>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className="min-w-[280px] flex-1"
              onClick={() => !plan.isCurrentPlan && handleSelectPlan(plan)}
            >
              <Card
                className={`relative mt-4 flex h-full flex-col overflow-hidden transition-all duration-300 ${
                  plan.isCurrentPlan && !selectedPlan
                    ? 'z-10 border-primary shadow-lg'
                    : selectedPlan === plan.name
                      ? 'cursor-pointer border-2 border-primary'
                      : 'cursor-pointer hover:border-primary/50'
                }`}
                onMouseEnter={() => setHoveredPlan(plan.name)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {plan.isCurrentPlan && (
                  <div className="z-20 whitespace-nowrap bg-primary px-4 py-1 text-sm text-primary-foreground">
                    Current plan
                  </div>
                )}
                <CardHeader className="space-y-1">
                  <CardTitle>
                    <div className="flex h-24 items-center justify-center rounded-t-lg text-xl font-bold">
                      <div>
                        <div>{plan.name}</div>
                        <div className="mt-1 text-sm font-normal">{plan.quality}</div>
                      </div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 space-y-4 p-6">
                  <div className="text-2xl font-bold">{plan.price}</div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <div className="mb-1 font-medium">Video and sound quality</div>
                      <div className="text-muted-foreground">{plan.videoQuality}</div>
                    </div>
                    <div>
                      <div className="mb-1 font-medium">Resolution</div>
                      <div className="text-muted-foreground">{plan.resolution}</div>
                    </div>
                    <div>
                      <div className="mb-1 font-medium">Supported devices</div>
                      <div className="text-muted-foreground">{plan.supportedDevices}</div>
                    </div>
                    {plan.spatialAudio && (
                      <div>
                        <div className="mb-1 font-medium">Spatial audio (immersive sound)</div>
                        <div className="text-muted-foreground">Included</div>
                      </div>
                    )}
                    <div>
                      <div className="mb-1 font-medium">Devices your household can watch at the same time</div>
                      <div className="text-muted-foreground">{plan.simultaneousDevices}</div>
                    </div>
                    <div>
                      <div className="mb-1 font-medium">Download devices</div>
                      <div className="text-muted-foreground">{plan.downloadDevices}</div>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="mt-auto p-6">
                  <Button
                    className="w-full"
                    variant={plan.isCurrentPlan ? 'outline' : 'default'}
                    disabled={plan.isCurrentPlan}
                    onClick={(e) => handlePayment(e, plan)}
                  >
                    {plan.isCurrentPlan ? (
                      <span className="flex items-center gap-2">
                        <Check className="h-4 w-4" /> Current Plan
                      </span>
                    ) : (
                      'Select Plan'
                    )}
                  </Button>
                </CardFooter>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
