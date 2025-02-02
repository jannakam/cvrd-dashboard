import { stores } from '@/data/stores';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Footer } from '@/components/Footer';

function StoresPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="container mx-auto py-10 flex-1">
        <h1 className="text-4xl font-bold mb-8">Our Stores</h1>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {stores.map((store) => (
            <Link href={`/stores/${store.id}`} key={store.id}>
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle className="text-2xl">{store.name}</CardTitle>
                      <CardDescription className="mt-2">{store.description}</CardDescription>
                    </div>
                    <Badge variant="secondary">{store.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">{store.items.length} items available</p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StoresPage;
