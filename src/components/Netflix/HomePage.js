'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Settings } from 'lucide-react';
import Link from 'next/link';

export default function HomePage() {
  const categories = ['Trending Now', 'New Releases', 'Popular on Netflix', 'Watch Again'];

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Navigation Bar */}
      <nav className="fixed top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6">
            {/* Netflix Logo Placeholder */}
            <div className="flex h-8 w-24 items-center justify-center rounded bg-red-600 font-bold text-white">
              NETFLIX
            </div>
            <div className="hidden items-center gap-6 md:flex">
              <Button variant="ghost">Home</Button>
              <Button variant="ghost">TV Shows</Button>
              <Button variant="ghost">Movies</Button>
              <Button variant="ghost">New & Popular</Button>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Settings className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>
                  <Link href="/select-plan">Select Plan</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>Account Settings</DropdownMenuItem>
                <DropdownMenuItem>Sign Out</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            <Avatar>
              <AvatarImage src="" />
              <AvatarFallback>JD</AvatarFallback>
            </Avatar>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[56.25vw] max-h-[800px] min-h-[400px] w-full">
        <div className="absolute inset-0 flex items-end bg-zinc-900">
          <div className="container pb-20">
            <div className="max-w-[600px] space-y-4">
              <h1 className="text-4xl font-bold md:text-6xl">Featured Title</h1>
              <p className="text-lg md:text-xl">
                Watch the latest movies and TV shows on Netflix. Stream now or download to watch offline.
              </p>
              <div className="flex gap-4">
                <Button size="lg">▶ Play</Button>
                <Button size="lg" variant="outline">
                  ℹ More Info
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Rows */}
      <div className="container space-y-8 py-8">
        {categories.map((category) => (
          <div key={category}>
            <h2 className="mb-4 text-2xl font-semibold">{category}</h2>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 lg:grid-cols-6">
              {[...Array(6)].map((_, i) => (
                <Card key={i} className="aspect-video bg-muted">
                  <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                    Movie {i + 1}
                  </div>
                </Card>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
