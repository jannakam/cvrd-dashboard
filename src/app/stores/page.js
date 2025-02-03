import { stores } from '@/data/stores';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Footer } from '@/components/Footer';
import Image from 'next/image';

function StoresPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto flex-1 py-10">
        <h1 className="mb-8 text-4xl font-bold">Our Stores</h1>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {stores.map((store) => (
            <Link href={`/stores/${store.id}`} key={store.id}>
              <Card className="group overflow-hidden transition-shadow hover:shadow-lg">
                <div className="relative aspect-[3/2] overflow-hidden">
                  <Image
                    src={store.logo}
                    alt={`${store.name} logo`}
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                  />
                </div>
                <CardHeader>
                  <div className="flex items-start justify-between">
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
