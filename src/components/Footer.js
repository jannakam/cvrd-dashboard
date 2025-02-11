'use client';

import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import Link from 'next/link';
import { ChevronLeft, Home, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export function Footer({ showBackButton = false, backTo = 'stores' }) {
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
    <footer className="mt-auto border-t">
      <div className="container mx-auto py-6">
        <div className="flex flex-wrap items-center justify-between gap-4 max-sm:flex-col max-sm:px-4">
          <div className="flex flex-wrap items-center gap-4">
            {showBackButton && (
              <Button variant="outline" size="sm" asChild>
                <Link href={`/${backTo}`} className="flex items-center gap-2">
                  <ChevronLeft className="h-4 w-4" />
                  Back to {backTo.charAt(0).toUpperCase() + backTo.slice(1)}
                </Link>
              </Button>
            )}
            <Button variant="ghost" size="sm" asChild>
              <Link href="/" className="flex items-center gap-2">
                <Home className="h-4 w-4" />
                Home
              </Link>
            </Button>
            <div className="flex items-center gap-2 rounded-full border px-2 py-1">
              <Sun className="h-4 w-4 text-muted-foreground" />
              {mounted && (
                <Switch
                  checked={theme === 'dark'}
                  onCheckedChange={toggleTheme}
                  className="data-[state=checked]:bg-primary"
                />
              )}
              <Moon className="h-4 w-4 text-muted-foreground" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground">© {currentYear} All rights reserved</p>
        </div>
      </div>
    </footer>
  );
}
