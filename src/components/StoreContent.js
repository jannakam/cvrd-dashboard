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
import { useRouter } from 'next/navigation';

// Format price in Kuwaiti Dinar
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-KW', {
    style: 'currency',
    currency: 'KWD',
  }).format(price);
};

export function StoreContent({ store }) {
  const { addItem, cart } = useCart();
  const [isCartOpen, setIsCartOpen] = useState(false);
  const router = useRouter();

  const handleAddToCart = (item) => {
    addItem({
      ...item,
      storeId: store.id,
      storeName: store.name,
      storeCategory: store.category,
    });
    setIsCartOpen(true);
  };

  const handleCheckout = () => {
    const cartItems = Object.values(cart).filter((item) => item.quantity > 0);
    if (cartItems.length === 0) return;

    // Calculate totals
    const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const tax = subtotal * 0.05; // 5% tax
    const shipping = subtotal > 50 ? 0 : 5; // Free shipping over $50
    const total = subtotal + tax + shipping;

    // Format items with all necessary details
    const formattedItems = cartItems.map((item) => ({
      id: item.id,
      name: item.name,
      price: item.price,
      quantity: item.quantity,
      category: item.category,
      totalItemPrice: item.price * item.quantity,
    }));

    // Create URL parameters with all necessary details
    const searchParams = new URLSearchParams({
      // Store details
      storeName: store.name,
      storeCategory: store.category,
      storeDescription: store.description,

      // Transaction totals
      subtotal: subtotal.toFixed(2),
      tax: tax.toFixed(2),
      shipping: shipping.toFixed(2),
      total: total.toFixed(2),

      // Detailed item information
      items: JSON.stringify(formattedItems),

      // Additional store metadata
      merchantName: store.name,
      merchantCategory: store.category,
    });

    console.log('Checkout details:', {
      store: store.name,
      items: formattedItems,
      total: total,
    });

    router.push(`/payment?${searchParams.toString()}`);
  };

  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto flex-1 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold">{store.name}</h1>
            <p className="mt-2 text-muted-foreground">{store.description}</p>
          </div>
          <div className="flex items-center space-x-4">
            <Badge className="py-2 text-lg" variant="secondary">
              {store.category}
            </Badge>
            <CartSheet open={isCartOpen} onOpenChange={setIsCartOpen} />
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {store.items.map((item) => (
            <Card key={item.id} className="group overflow-hidden border-2 transition-colors hover:border-primary/50">
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover transition-transform group-hover:scale-105"
                />
              </div>
              <CardHeader className="relative pb-4">
                <div className="flex items-start justify-between gap-4">
                  <div className="space-y-1">
                    <CardTitle className="leading-tight">{item.name}</CardTitle>
                    <CardDescription className="text-sm">{item.category}</CardDescription>
                  </div>
                  <div className="text-lg font-bold">{formatPrice(item.price)}</div>
                </div>
              </CardHeader>
              <CardFooter>
                <Button className="group/button w-full" onClick={() => handleAddToCart(item)}>
                  <Plus className="mr-2 h-4 w-4 transition-transform group-hover/button:scale-125" />
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
