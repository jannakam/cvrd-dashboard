'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { redirect } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { CardPaymentForm } from '@/components/payment/CardPaymentForm';
import { PayPalForm } from '@/components/payment/PayPalForm';
import { CVRDForm } from '@/components/payment/CVRDForm';
import { formatPrice, validateCardPayment, validateCVRDPayment } from '@/lib/payment-utils';

export default function PaymentGateway() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const total = searchParams.get('total') || '0';

  // Card payment state
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // PayPal state
  const [paypalEmail, setPaypalEmail] = useState('');

  // CVRD state
  const [selectedBank, setSelectedBank] = useState('');
  const [cardPrefix, setCardPrefix] = useState('');

  // Common state
  const [activeTab, setActiveTab] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayPalRedirect = (email) => {
    const paypalBaseUrl = 'https://www.paypal.com/signin';
    window.location.href = paypalBaseUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted', activeTab);

    if (activeTab === 'paypal') {
      if (paypalEmail) {
        handlePayPalRedirect(paypalEmail);
        return;
      }
    }

    let isValid = false;
    if (activeTab === 'card') {
      isValid = validateCardPayment(cardNumber, expiryDate, cvv);
    } else if (activeTab === 'cvrd') {
      isValid = validateCVRDPayment(cardNumber, expiryDate, cvv, selectedBank, cardPrefix);
    }

    if (!isValid) {
      toast({
        variant: 'outline',
        title: 'Validation Error',
        description: 'Please fill in all required fields correctly.',
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (Math.random() > 0.5) {
            resolve();
          } else {
            reject(new Error('Payment failed'));
          }
        }, 1500);
      });

      toast({
        variant: 'outline',
        title: 'Payment Successful',
        description: 'Your payment has been processed successfully.',
      });

      setTimeout(() => {
        redirect('/payment-status?status=success');
      }, 1000);
    } catch (error) {
      toast({
        variant: 'outline',
        title: 'Payment Failed',
        description: error.message || 'There was an error processing your payment.',
      });

      setTimeout(() => {
        redirect('/payment-status?status=failed');
      }, 1000);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto flex min-h-[80vh] w-screen max-w-3xl items-center justify-center p-4">
      <Card className="w-[450px]">
        <CardHeader className="space-y-4 text-center">
          {/* <CardTitle className="text-3xl font-bold">Payment Gateway</CardTitle> */}
          <div className="rounded-lg bg-primary/5 p-6">
            <div className="mb-2 text-sm font-medium text-muted-foreground">Amount to Pay</div>
            <div className="text-4xl font-bold text-primary">{formatPrice(parseFloat(total))}</div>
          </div>
          <CardDescription className="pt-2">Select your preferred payment method below</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="card" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="inline-flex h-10 w-full items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
              <TabsTrigger value="card" className="flex-1">
                Credit Card
              </TabsTrigger>
              <TabsTrigger value="paypal" className="flex-1">
                PayPal
              </TabsTrigger>
              <TabsTrigger value="cvrd" className="flex-1">
                CVRD
              </TabsTrigger>
            </TabsList>

            <TabsContent value="card" className="mt-4">
              <CardPaymentForm
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
                expiryDate={expiryDate}
                setExpiryDate={setExpiryDate}
                cvv={cvv}
                setCvv={setCvv}
                isProcessing={isProcessing}
                total={total}
                onSubmit={handleSubmit}
              />
            </TabsContent>

            <TabsContent value="paypal" className="mt-4">
              <PayPalForm
                paypalEmail={paypalEmail}
                setPaypalEmail={setPaypalEmail}
                isProcessing={isProcessing}
                onSubmit={handleSubmit}
              />
            </TabsContent>

            <TabsContent value="cvrd" className="mt-4">
              <CVRDForm
                selectedBank={selectedBank}
                setSelectedBank={setSelectedBank}
                cardPrefix={cardPrefix}
                setCardPrefix={setCardPrefix}
                cardNumber={cardNumber}
                setCardNumber={setCardNumber}
                expiryDate={expiryDate}
                setExpiryDate={setExpiryDate}
                cvv={cvv}
                setCvv={setCvv}
                isProcessing={isProcessing}
                total={total}
                onSubmit={handleSubmit}
              />
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="justify-center text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="h-1 w-1 rounded-full bg-green-500"></div>
            Your payment information is secure and encrypted
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
