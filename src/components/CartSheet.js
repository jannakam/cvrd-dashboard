'use client';

import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { ShoppingCart, Plus, Minus } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

// Format price in Kuwaiti Dinar
const formatPrice = (price) => {
  return new Intl.NumberFormat('en-KW', {
    style: 'currency',
    currency: 'KWD',
  }).format(price);
};

export function CartSheet({ open, onOpenChange }) {
  const { items, storeId, removeItem, addItem, getTotal } = useCart();

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="relative">
          <ShoppingCart className="h-5 w-5" />
          {totalItems > 0 && (
            <Badge variant="destructive" className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0">
              {totalItems}
            </Badge>
          )}
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col h-full w-full sm:max-w-lg">
        <SheetHeader className="px-1">
          <SheetTitle>Shopping Cart</SheetTitle>
        </SheetHeader>
        <div className="flex-1 overflow-hidden -mx-6">
          <ScrollArea className="h-full px-6">
            {items.length === 0 ? (
              <p className="text-muted-foreground text-center py-6">Your cart is empty</p>
            ) : (
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative h-16 w-16 rounded-md overflow-hidden flex-shrink-0">
                      <Image src={item.image} alt={item.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium leading-none truncate">{item.name}</h4>
                      <p className="text-sm text-muted-foreground mt-1">
                        {formatPrice(item.price)} × {item.quantity}
                      </p>
                    </div>
                    <div className="flex items-center gap-2 flex-shrink-0">
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
          <div className="border-t mt-auto py-4 space-y-4">
            <div className="flex items-center justify-between">
              <span className="font-medium">Total</span>
              <span className="font-bold">{formatPrice(getTotal())}</span>
            </div>
            <Button className="w-full">Checkout</Button>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
