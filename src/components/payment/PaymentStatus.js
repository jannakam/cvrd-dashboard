'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function PaymentStatus() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const { toast } = useToast();

  const status = searchParams.get('status');
  const reason = searchParams.get('reason');

  useEffect(() => {
    if (status === 'failed' && reason) {
      toast({
        title: 'Transaction Failed',
        description: reason,
        variant: 'destructive',
      });
    }
  }, [status, reason, toast]);

  return (
    <div className="container mx-auto flex min-h-[80vh] w-screen max-w-md items-center justify-center p-4">
      <Card className="w-full">
        <CardHeader className="text-center">
          {status === 'success' ? (
            <CheckCircle2 className="mx-auto h-12 w-12 text-green-500" />
          ) : (
            <XCircle className="mx-auto h-12 w-12 text-red-500" />
          )}
          <CardTitle className="text-2xl">{status === 'success' ? 'Payment Successful' : 'Payment Failed'}</CardTitle>
          <CardDescription>
            {status === 'success'
              ? 'Your payment has been processed successfully'
              : 'Please try again or use a different payment method'}
          </CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center">
          <Button onClick={() => router.push('/stores')}>Return to Stores</Button>
        </CardContent>
      </Card>
    </div>
  );
}
