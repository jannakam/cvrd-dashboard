'use client';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { ChevronLeft, Home, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Footer({ showBackButton = false }) {
  const currentYear = new Date().getFullYear();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Prevent hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  return (
    <footer className="border-t mt-auto">
      <div className="container mx-auto py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            {showBackButton && (
              <Button variant="outline" size="sm" asChild>
                <Link href="/stores" className="flex items-center gap-2">
                  <ChevronLeft className="h-4 w-4" />
                  Back to Stores
                </Link>
              </Button>
            )}
            <Button variant="ghost" size="sm" asChild>
              <Link href="/stores" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </Button>
            <div className="flex items-center gap-2 border rounded-full px-2 py-1">
              <Sun className="h-4 w-4 text-muted-foreground" />
              {mounted && <Switch checked={theme === 'dark'} onCheckedChange={toggleTheme} className="data-[state=checked]:bg-primary" />}
              <Moon className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">© {currentYear} All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
