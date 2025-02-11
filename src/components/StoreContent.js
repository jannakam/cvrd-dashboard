'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useCart } from '@/contexts/CartContext';
import { Plus } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { Badge } from '@/components/ui/badge';

// Format price in Kuwaiti Dinar
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-KW', {
    style: 'currency',
    currency: 'KWD',
  }).format(price);
};

export function StoreContent({ store }) {
  const { addItem } = useCart();

  const handleAddToCart = (item) => {
    addItem({
      ...item,
      storeId: store.id,
      storeName: store.name,
      storeCategory: store.category,
    });
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto flex-1 pb-36 pt-12">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 max-sm:px-4 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {store.items.map((item) => (
              <Card
                key={item.id}
                className="group overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-primary/10"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/0 to-black/0 opacity-0 transition-opacity group-hover:opacity-100" />
                </div>
                <CardHeader className="space-y-2">
                  <div className="flex items-start justify-between">
                    <div className="space-y-1">
                      <CardTitle className="line-clamp-1">{item.name}</CardTitle>
                      <CardDescription className="line-clamp-1">{item.category}</CardDescription>
                    </div>
                    <div className="text-lg font-bold">{formatPrice(item.price)}</div>
                  </div>
                </CardHeader>
                <CardFooter>
                  <Button
                    className="w-full gap-2 transition-transform group-hover:scale-105"
                    onClick={() => handleAddToCart(item)}
                  >
                    <Plus className="h-4 w-4" />
                    Add to Cart
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </div>
      <Footer showBackButton />
    </div>
  );
}
