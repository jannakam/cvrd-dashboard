'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

// Format price in Kuwaiti Dinar
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-KW', {
    style: 'currency',
    currency: 'KWD',
  }).format(price);
};

export function CartSheet({ open, onOpenChange }) {
  const { items, storeId, removeItem, addItem, getTotal, storeName, storeCategory } = useCart();
  const router = useRouter();
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const handleCheckout = () => {
    // Calculate totals
    const subtotal = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const shipping = subtotal > 50 ? 0 : 5; // Free shipping over 50 KD
    const total = subtotal + shipping;

    // Format items with all necessary details
    const formattedItems = items.map((item) => ({
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
      storeName: storeName,
      merchantCategory: storeCategory,

      // Transaction totals
      subtotal: subtotal.toFixed(3),
      shipping: shipping.toFixed(3),
      total: total.toFixed(3),

      // Detailed item information
      items: JSON.stringify(formattedItems),
    });

    console.log('Checkout details:', {
      store: storeName,
      category: storeCategory,
      items: formattedItems,
      total: total,
    });

    router.push(`/payment?${searchParams.toString()}`);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center p-0"
            >
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex h-full w-full flex-col sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="-mx-6 flex-1 overflow-hidden">
          <ScrollArea className="h-full px-6">
            {items.length === 0 ? (
              <p className="py-6 text-center text-muted-foreground">Your cart is empty</p>
            ) : (
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative h-16 w-16 flex-shrink-0 overflow-hidden rounded-md">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <h4 className="truncate font-medium leading-none">{item.name}</h4>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {formatPrice(item.price)} × {item.quantity}
                      </p>
                    </div>
                    <div className="flex flex-shrink-0 items-center gap-2">
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => removeItem(item.id)}>
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-4 text-center">{item.quantity}</span>
                      <Button variant="outline" size="icon" className="h-8 w-8" onClick={() => addItem(item)}>
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
        </div>
        {items.length > 0 && (
          <div className="mt-auto space-y-4 border-t py-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(getTotal())}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>{formatPrice(getTotal() > 50 ? 0 : 5)}</span>
              </div>
              <div className="flex items-center justify-between pt-4 font-medium">
                <span>Total</span>
                <span>{formatPrice(getTotal() + (getTotal() > 50 ? 0 : 5))}</span>
              </div>
            </div>
            <Button className="w-full" onClick={handleCheckout}>
              Checkout
            </Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
