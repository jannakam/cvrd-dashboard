"use client";
import { useSearchParams } from 'next/navigation';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2, XCircle } from "lucide-react";
import { useRouter } from 'next/navigation';

export default function PaymentStatus() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const status = searchParams.get('status');
  const isSuccess = status === 'success';

  return (
    <div className="h-screen w-screen container mx-auto p-4 max-w-3xl flex items-center justify-center min-h-[80vh]">
      <Card className="w-[450px]">
        <CardHeader className="space-y-2">
          <div className="flex justify-center mb-4">
            {isSuccess ? (
              <CheckCircle2 size={64} color="green"/>
            ) : (
              <XCircle size={64} color="red"/>
            )}
          </div>
          <CardTitle className="text-lg font-bold text-center">
            {isSuccess ? 'Payment Successful' : 'Payment Failed'}
          </CardTitle>
          <CardDescription className="text-center text-md">
            {isSuccess 
              ? 'Your payment has been processed successfully.' 
              : 'There was an issue processing your payment. Please try again.'}
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center text-muted-foreground text-md">
          {isSuccess 
            ? 'Thank you for your payment. You will receive a confirmation email shortly.'
            : 'If this issue persists, please contact your bank or try a different payment method.'}
        </CardContent>
        <CardFooter className="flex justify-center space-x-2">
          <Button onClick={() => router.push('/payment')} variant="outline">
            Return to Payment
          </Button>
          {!isSuccess && (
            <Button onClick={() => router.push('/payment')} variant="default">
              Try Again
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
} 