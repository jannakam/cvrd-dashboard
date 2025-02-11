'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Footer } from '@/components/Footer';
import { Store, CreditCard } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';

export default function HomePage() {
  const router = useRouter();
  const { logout } = useAuth();

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-lg font-bold sm:text-xl md:text-2xl">CVRD Dashboard</h1>
            <Button variant="outline" onClick={logout}>
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container flex flex-1 items-center justify-center self-center pb-12 pt-24">
        <div className="w-full max-w-3xl space-y-8">
          <div className="space-y-4 text-center">
            <h1 className="text-4xl font-bold md:text-6xl">Welcome to CVRD Dashboard</h1>
            <p className="text-lg text-muted-foreground">Choose your destination to get started</p>
          </div>

          <div className="grid grid-cols-1 gap-6 pt-8 md:grid-cols-2 max-sm:px-4">
            {/* Stores Card */}
            <Card
              className="group cursor-pointer transition-all duration-200 hover:shadow-lg"
              onClick={() => router.push('/stores')}
            >
              <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-transform group-hover:scale-110">
                  <Store className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">Stores</h2>
                  <p className="text-sm text-muted-foreground">
                    Browse and manage your favorite retail stores and shopping destinations
                  </p>
                </div>
                <Button className="w-full">View Stores</Button>
              </CardContent>
            </Card>

            {/* Subscriptions Card */}
            <Card
              className="group cursor-pointer transition-all duration-200 hover:shadow-lg"
              onClick={() => router.push('/subscriptions')}
            >
              <CardContent className="flex flex-col items-center space-y-4 p-6 text-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 transition-transform group-hover:scale-110">
                  <CreditCard className="h-8 w-8 text-primary" />
                </div>
                <div className="space-y-2">
                  <h2 className="text-2xl font-semibold">Subscriptions</h2>
                  <p className="text-sm text-muted-foreground">
                    Explore and manage your streaming services and digital subscriptions
                  </p>
                </div>
                <Button className="w-full">View Subscriptions</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
