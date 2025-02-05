'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Skeleton } from '@/components/ui/skeleton';
import { subscriptions } from '@/data/subscriptions';
import { ModeToggle } from '@/components/ModeToggle';
import { ChevronLeft, ChevronRight, Play, Info, Crown, Plus, ThumbsUp } from 'lucide-react';
import { cn } from '@/lib/utils';
import { use } from 'react';
import Image from 'next/image';
import { Footer } from '@/components/Footer';
export default function SubscriptionPage({ params }) {
  const router = useRouter();
  const [subscription, setSubscription] = useState(null);
  const [hoveredContent, setHoveredContent] = useState(null);
  const [hoverPosition, setHoverPosition] = useState(null);
  const id = use(params).id;
  const rowRefs = useRef({});
  const cardRefs = useRef({});

  useEffect(() => {
    const sub = subscriptions.find((s) => s.id === id);
    if (sub) {
      setSubscription(sub);
      sub.content_rows?.forEach((row) => {
        if (!rowRefs.current[row.title]) {
          rowRefs.current[row.title] = { current: null };
        }
      });
    }
  }, [id]);

  const handleMouseEnter = (content) => {
    const element = cardRefs.current[content.title];
    if (element) {
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const expandedCardHeight = rect.height * 1.5; // Approximate expanded height

      // Adjust top position if card would overflow bottom of viewport
      let top = rect.top;
      if (rect.top + expandedCardHeight > viewportHeight) {
        top = viewportHeight - expandedCardHeight;
      }

      setHoverPosition({
        top: top,
        left: rect.left,
        width: rect.width,
      });
      setHoveredContent(content.title);
    }
  };

  const handleMouseLeave = () => {
    setHoveredContent(null);
    setHoverPosition(null);
  };

  useEffect(() => {
    const handleScroll = () => {
      setHoveredContent(null);
      setHoverPosition(null);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scroll = (direction, rowTitle) => {
    const container = rowRefs.current[rowTitle]?.current;
    if (container) {
      const scrollAmount = direction === 'left' ? -400 : 400;
      container.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  if (!subscription) {
    return (
      <div className="container space-y-8 py-20">
        <Skeleton className="h-[400px] w-full rounded-xl" />
        <div className="space-y-4">
          <Skeleton className="h-8 w-48" />
          <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
            {[1, 2, 3, 4].map((i) => (
              <Skeleton key={i} className="h-[200px] rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-6 pl-5">
            <div className="h-8 w-auto">
              <Image
                src={subscription.logo}
                alt={subscription.name}
                width={80}
                height={32}
                className="h-full w-auto object-contain"
              />
            </div>
            <div className="hidden items-center gap-6 md:flex">
              {subscription.categories.map((category) => (
                <Button key={category} variant="ghost" className="text-foreground/80 hover:text-foreground">
                  {category}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative h-[85vh] w-full">
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${subscription.hero_image})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent p-5">
            <div className="container flex h-full items-end pb-32">
              <div className="max-w-[800px] space-y-6">
                <h1 className="text-4xl font-bold md:text-7xl">{subscription.name}</h1>
                <p className="text-lg md:text-2xl">{subscription.description}</p>
                <div className="flex gap-4">
                  <Button
                    size="lg"
                    className="gap-2 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60"
                    onClick={() => router.push(`/plan?service=${subscription.id}`)}
                  >
                    <Play className="h-5 w-5" /> Choose Plan
                  </Button>
                  <Button
                    size="lg"
                    className="gap-2 border-white/40 bg-black/40 text-white backdrop-blur-sm hover:bg-black/60"
                  >
                    <Info className="h-5 w-5" /> More Info
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Rows */}
      <div className="container space-y-24 px-5 py-12">
        {subscription.content_rows?.map((row) => (
          <div key={row.title} className="relative space-y-4">
            <h2 className="text-2xl font-semibold">{row.title}</h2>
            <div className="group relative">
              <div ref={(el) => (rowRefs.current[row.title].current = el)} className="flex gap-4 overflow-x-hidden">
                {row.items.map((content) => (
                  <div
                    key={content.title}
                    ref={(el) => (cardRefs.current[content.title] = el)}
                    className="relative w-[250px] shrink-0"
                    onMouseEnter={() => handleMouseEnter(content)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <div
                      className={cn(
                        'transition-all duration-150',
                        hoveredContent === content.title ? 'z-[100]' : 'z-0'
                      )}
                    >
                      <Card
                        className={cn(
                          'overflow-hidden',
                          hoveredContent === content.title ? 'relative scale-105 shadow-xl' : ''
                        )}
                        style={{
                          position: hoveredContent === content.title ? 'fixed' : 'relative',
                          ...(hoveredContent === content.title &&
                            hoverPosition && {
                              top: `${hoverPosition.top}px`,
                              left: `${hoverPosition.left}px`,
                              width: `${hoverPosition.width}px`,
                              zIndex: 100,
                            }),
                        }}
                      >
                        <CardContent className="p-0">
                          <div className="relative">
                            <img src={content.image} alt={content.title} className="aspect-video w-full object-cover" />
                            {hoveredContent === content.title && (
                              <>
                                <div className="absolute inset-0 bg-gradient-to-b from-black/30 to-black/60" />
                                <div className="absolute bottom-0 left-0 right-0 p-3">
                                  <h3 className="line-clamp-1 text-base font-medium text-white">{content.title}</h3>
                                </div>
                              </>
                            )}
                          </div>
                          {hoveredContent === content.title && (
                            <div className="space-y-3 p-3 dark:bg-zinc-900">
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  className="w-full gap-2 bg-white text-black hover:bg-white/90 dark:bg-white dark:text-black dark:hover:bg-white/90"
                                >
                                  <Play className="h-4 w-4" /> Play
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="gap-2 border-zinc-400 text-zinc-400 hover:bg-zinc-400/20 dark:border-white/40 dark:text-white dark:hover:bg-white/20"
                                >
                                  <Plus className="h-4 w-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="gap-2 border-zinc-400 text-zinc-400 hover:bg-zinc-400/20 dark:border-white/40 dark:text-white dark:hover:bg-white/20"
                                >
                                  <ThumbsUp className="h-4 w-4" />
                                </Button>
                              </div>
                              <div className="space-y-1">
                                <div className="flex items-center gap-2 text-xs text-zinc-500 dark:text-white/80">
                                  <span className="font-medium text-green-500">98% Match</span>
                                  <span>{content.year}</span>
                                  <span className="rounded border border-zinc-500 px-1 dark:border-white/40">
                                    {content.rating}
                                  </span>
                                  <span>{content.duration}</span>
                                </div>
                                <p className="line-clamp-2 text-xs text-zinc-500 dark:text-white/90">
                                  {content.synopsis}
                                </p>
                              </div>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                  </div>
                ))}
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="absolute left-0 top-1/2 z-[200] -translate-x-4 -translate-y-1/2 bg-black/60 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/80 group-hover:opacity-100"
                onClick={() => scroll('left', row.title)}
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="absolute right-0 top-1/2 z-[200] -translate-y-1/2 translate-x-4 bg-black/60 text-white opacity-0 backdrop-blur-sm transition-opacity hover:bg-black/80 group-hover:opacity-100"
                onClick={() => scroll('right', row.title)}
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>
        ))}

        {/* Categories Grid */}
        <div className="pt-8">
          <h2 className="mb-6 text-2xl font-semibold">Browse by Category</h2>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {subscription.categories.map((category) => (
              <Card key={category} className="group overflow-hidden">
                <CardContent className="p-6 text-center transition-colors hover:bg-muted">
                  <h3 className="font-semibold">{category}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
