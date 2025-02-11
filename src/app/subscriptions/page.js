'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { subscriptions } from '@/data/subscriptions';
import Link from 'next/link';
import { Play } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Footer } from '@/components/Footer';

export default function SubscriptionsPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-lg font-bold sm:text-xl md:text-2xl">Streaming Services</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto flex-1 px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {subscriptions.map((subscription) => (
              <Link key={subscription.id} href={`/subscriptions/${subscription.id}`} className="block h-full">
                <Card className="group h-full overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-primary/10">
                  <div className={cn('relative h-24 sm:h-28', subscription.background_color)}>
                    <div className="absolute inset-0 flex items-center justify-center p-4 bg-white">
                      <img src={subscription.logo} alt={subscription.name} className="h-12 w-auto object-contain" />
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <CardHeader className="space-y-2">
                    <CardTitle className="line-clamp-1">{subscription.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{subscription.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                      {subscription.categories.slice(0, 3).map((category) => (
                        <Badge key={category} variant="secondary" className="max-w-[150px] truncate rounded-full">
                          {category}
                        </Badge>
                      ))}
                      {subscription.categories.length > 3 && (
                        <Badge variant="outline" className="rounded-full">
                          +{subscription.categories.length - 3}
                        </Badge>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
