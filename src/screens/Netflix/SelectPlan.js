"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Check } from "lucide-react";
import { useRouter } from 'next/navigation';

const plans = [
  {
    name: "Basic",
    quality: "720p",
    price: "US$8.99",
    videoQuality: "Good",
    resolution: "720p (HD)",
    supportedDevices: "TV, computer, mobile phone, tablet",
    simultaneousDevices: "1",
    downloadDevices: "1"
  },
  {
    name: "Standard",
    quality: "1080p",
    price: "US$9.99",
    videoQuality: "Great",
    resolution: "1080p (Full HD)",
    supportedDevices: "TV, computer, mobile phone, tablet",
    simultaneousDevices: "2",
    downloadDevices: "2",
    isCurrentPlan: true
  },
  {
    name: "Premium",
    quality: "4K + HDR",
    price: "US$17.99",
    videoQuality: "Best",
    resolution: "4K (Ultra HD) + HDR",
    supportedDevices: "TV, computer, mobile phone, tablet",
    simultaneousDevices: "4",
    downloadDevices: "6",
    spatialAudio: true
  }
];

export default function SelectPlan() {
  const router = useRouter();
  const [hoveredPlan, setHoveredPlan] = useState(null);
  
  const handleSelectPlan = (plan) => {
    if (!plan.isCurrentPlan) {
      router.push('/payment');
    }
  };
  
  return (
    <div className="min-h-screen">
      <div className="px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold mb-2">Change plan</h1>
          <p className="text-muted-foreground">Try a new plan. You can always change back if you don't love it.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {plans.map((plan) => (
            <div key={plan.name}>
              <Card 
                className={`h-full relative transition-all duration-300 mt-4 ${
                  plan.isCurrentPlan ? 'border-primary md:scale-105 shadow-lg z-10' : ''
                } ${
                  hoveredPlan === plan.name && !plan.isCurrentPlan ? 'md:scale-102 shadow-md z-5' : 'md:scale-100'
                }`}
                onMouseEnter={() => setHoveredPlan(plan.name)}
                onMouseLeave={() => setHoveredPlan(null)}
              >
                {plan.isCurrentPlan && (
                  <div className="absolute top-4 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-sm px-4 py-1 rounded-full z-20 whitespace-nowrap">
                    Current plan
                  </div>
                )}
                <div className="flex flex-col h-full">
                  <CardHeader className="space-y-1 p-0">
                    <CardTitle>
                      <div className={`h-24 rounded-t-lg flex items-center justify-center text-xl font-bold ${
                        plan.name === "Basic" ? "bg-gradient-to-r from-blue-600 to-blue-800" :
                        plan.name === "Standard" ? "bg-gradient-to-r from-blue-600 via-purple-600 to-purple-800" :
                        "bg-gradient-to-r from-purple-600 via-red-600 to-red-800"
                      } text-white`}>
                        <div>
                          <div>{plan.name}</div>
                          <div className="text-sm font-normal mt-1">{plan.quality}</div>
                        </div>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-1 space-y-4 p-6">
                    <div className="text-2xl font-bold">{plan.price}</div>
                    <div className="space-y-2 text-sm">
                      <div>
                        <div className="font-medium mb-1">Video and sound quality</div>
                        <div className="text-muted-foreground">{plan.videoQuality}</div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Resolution</div>
                        <div className="text-muted-foreground">{plan.resolution}</div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Supported devices</div>
                        <div className="text-muted-foreground">{plan.supportedDevices}</div>
                      </div>
                      {plan.spatialAudio && (
                        <div>
                          <div className="font-medium mb-1">Spatial audio (immersive sound)</div>
                          <div className="text-muted-foreground">Included</div>
                        </div>
                      )}
                      <div>
                        <div className="font-medium mb-1">Devices your household can watch at the same time</div>
                          <div className="text-muted-foreground">{plan.simultaneousDevices}</div>
                      </div>
                      <div>
                        <div className="font-medium mb-1">Download devices</div>
                        <div className="text-muted-foreground">{plan.downloadDevices}</div>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="p-6">
                    <Button 
                      className="w-full" 
                      variant={plan.isCurrentPlan ? "outline" : "default"}
                      disabled={plan.isCurrentPlan}
                      onClick={() => handleSelectPlan(plan)}
                    >
                      {plan.isCurrentPlan ? (
                        <span className="flex items-center gap-2">
                          <Check className="w-4 h-4" /> Current Plan
                        </span>
                      ) : "Select Plan"}
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
