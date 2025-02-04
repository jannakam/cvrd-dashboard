'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ModeToggle } from '@/components/ModeToggle';
import { Footer } from '@/components/Footer';
import { Store, CreditCard } from 'lucide-react';

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 pl-5">
            <h1 className="text-2xl font-bold">CVRD Dashboard</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 container pt-24 pb-12">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-4">
            <h1 className="text-4xl font-bold md:text-6xl">Welcome to CVRD Dashboard</h1>
            <p className="text-lg text-muted-foreground">Choose your destination to get started</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-8">
            {/* Stores Card */}
            <Card 
              className="group cursor-pointer hover:shadow-lg transition-all duration-200"
              onClick={() => router.push('/stores')}
            >
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <Store className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">Stores</h2>
                  <p className="text-sm text-muted-foreground">
                    Browse and manage your favorite retail stores and shopping destinations
                  </p>
                </div>
                <Button className="w-full">
                  View Stores
                </Button>
              </CardContent>
            </Card>

            {/* Subscriptions Card */}
            <Card 
              className="group cursor-pointer hover:shadow-lg transition-all duration-200"
              onClick={() => router.push('/subscriptions')}
            >
              <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform">
                  <CreditCard className="w-8 h-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">Subscriptions</h2>
                  <p className="text-sm text-muted-foreground">
                    Explore and manage your streaming services and digital subscriptions
                  </p>
                </div>
                <Button className="w-full">
                  View Subscriptions
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
