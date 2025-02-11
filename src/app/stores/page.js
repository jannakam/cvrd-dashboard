import { stores } from '@/data/stores';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Footer } from '@/components/Footer';
import Image from 'next/image';
import { cn } from '@/lib/utils';

function StoresPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <h1 className="text-lg font-bold sm:text-xl md:text-2xl">Our Stores</h1>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto flex-1 px-4 py-24">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 gap-6 max-sm:px-4 sm:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {stores.map((store) => (
              <Link href={`/stores/${store.id}`} key={store.id} className="block h-full">
                <Card className="group h-full overflow-hidden transition-all hover:shadow-lg dark:hover:shadow-primary/10">
                  <div className="relative h-32 sm:h-36">
                    <Image src={store.logo} alt={store.name} fill className="object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
                  </div>
                  <CardHeader className="space-y-2">
                    <CardTitle className="line-clamp-1">{store.name}</CardTitle>
                    <CardDescription className="line-clamp-2">{store.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <Badge variant="secondary" className="h-fit">
                        {store.category}
                      </Badge>
                      <p className="text-sm text-muted-foreground">{store.items.length} items</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default StoresPage;
