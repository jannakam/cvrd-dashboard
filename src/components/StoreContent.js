'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { CartSheet } from '@/components/CartSheet';
import { useCart } from '@/contexts/CartContext';
import { Plus } from 'lucide-react';
import { Footer } from '@/components/Footer';
import { useState } from 'react';

// Format price in Kuwaiti Dinar
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-KW', {
    style: 'currency',
    currency: 'KWD',
  }).format(price);
};

export function StoreContent({ store }) {
  const { addItem } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (item) => {
    addItem({ ...item, storeId: store.id });
    setIsCartOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto py-10 flex-1">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold">{store.name}</h1>
            <p className="text-muted-foreground mt-2">{store.description}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="text-lg py-2" variant="secondary">
              {store.category}
            </Badge>
            <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {store.items.map((item) => (
            <Card key={item.id} className="group overflow-hidden border-2 hover:border-primary/50 transition-colors">
              <div className="relative aspect-[4/3]">
                <Image src={item.image} alt={item.name} fill className="object-cover transition-transform group-hover:scale-105" />
              </div>
              <CardHeader className="relative pb-4">
                <div className="flex justify-between items-start gap-4">
                  <div className="space-y-1">
                    <CardTitle className="leading-tight">{item.name}</CardTitle>
                    <CardDescription className="text-sm">{item.category}</CardDescription>
                  </div>
                  <div className="font-bold text-lg">{formatPrice(item.price)}</div>
                </div>
              </CardHeader>
              <CardFooter>
                <Button className="w-full group/button" onClick={() => handleAddToCart(item)}>
                  <Plus className="w-4 h-4 mr-2 transition-transform group-hover/button:scale-125" />
                  Add to Cart
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
      <Footer showBackButton />
    </div>
  );
}
