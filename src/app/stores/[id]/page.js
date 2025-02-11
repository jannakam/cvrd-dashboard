import { stores } from '@/data/stores';
import { redirect } from 'next/navigation';
import { StoreContent } from '@/components/StoreContent';
import { CartProvider } from '@/contexts/CartContext';
import { Badge } from '@/components/ui/badge';
import { CartSheet } from '@/components/CartSheet';
import Image from 'next/image';

function StoreNavbar({ store }) {
  return (
    <nav className="fixed top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-4 sm:gap-6">
            <div>
              <h1 className="truncate text-lg font-bold sm:text-xl md:text-2xl">{store.name}</h1>
              <p className="mt-0.5 hidden text-sm text-muted-foreground sm:block">{store.description}</p>
            </div>
            <Badge variant="secondary" className="h-fit">
              {store.category}
            </Badge>
          </div>
          <CartSheet />
        </div>
      </div>
    </nav>
  );
}

export default async function StorePage({ params }) {
  const { id } = await params;
  const store = stores.find((s) => s.id === id);

  if (!store) {
    redirect('/stores');
  }

  return (
    <CartProvider>
      <div className="flex min-h-screen flex-col bg-background">
        <StoreNavbar store={store} />
        <div className="h-24 w-full" />

        {/* Hero Section */}
        {/* <div className="relative h-[40vh] w-full mt-16">
          <div className="absolute inset-0 bg-gradient-to-b from-background/5 via-background/20 to-background" />
          <div className="absolute inset-0 flex items-center justify-center p-8">
            <div className="relative h-full w-full max-w-[400px]">
              <Image src={store.logo} alt={store.name} fill className="object-cover rounded-xl" priority />
            </div>
          </div>
        </div> */}

        <StoreContent store={store} />
      </div>
    </CartProvider>
  );
}
