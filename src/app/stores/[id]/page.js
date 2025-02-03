import { stores } from '@/data/stores';
import { redirect } from 'next/navigation';
import { StoreContent } from '@/components/StoreContent';
import { CartProvider } from '@/contexts/CartContext';

export default async function StorePage({ params }) {
  const { id } = await params;
  const store = stores.find((s) => s.id === id);

  if (!store) {
    redirect('/stores');
  }

  return (
    <CartProvider>
      <StoreContent store={store} />
    </CartProvider>
  );
}
