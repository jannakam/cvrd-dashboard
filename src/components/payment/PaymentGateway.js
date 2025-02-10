'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { useToast } from '@/hooks/use-toast';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation';
import { CardPaymentForm } from '@/components/payment/CardPaymentForm';
import { PayPalForm } from '@/components/payment/PayPalForm';
import { CVRDForm } from '@/components/payment/CVRDForm';
import {
  formatPrice,
  validateCardPayment,
  validateCVRDPayment,
  generateTransactionDescription,
} from '@/lib/payment-utils';
import { useCreateTransaction } from '@/hooks/useTransactions';

export default function PaymentGateway() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();
  const createTransaction = useCreateTransaction();

  const total = searchParams.get('total') || '0';
  const service = searchParams.get('service');
  const plan = searchParams.get('plan');

  // Card payment state
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // KNET state
  const [selectedBank, setSelectedBank] = useState('');
  const [cardPrefix, setCardPrefix] = useState('');

  // Common state
  const [activeTab, setActiveTab] = useState('knet');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayPalRedirect = async () => {
    setIsProcessing(true);
    try {
      // Redirect to PayPal sign in
      window.location.href = 'https://www.paypal.com/signin';
    } catch (error) {
      console.error('PayPal error:', error);
      toast({
        variant: 'outline',
        title: 'Redirect Failed',
        description: 'Failed to redirect to PayPal. Please try again.',
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Form submitted', { activeTab, cardNumber, expiryDate, cvv, selectedBank, cardPrefix });

    if (activeTab === 'paypal') {
      await handlePayPalRedirect();
      return;
    }

    let isValid = false;
    if (activeTab === 'card') {
      isValid = validateCardPayment(cardNumber, expiryDate, cvv);
    } else if (activeTab === 'knet') {
      if (!selectedBank || !cardPrefix || !cardNumber || !expiryDate || !cvv) {
        toast({
          variant: 'outline',
          title: 'Validation Error',
          description: 'Please fill in all required fields.',
        });
        return;
      }
      isValid = validateCVRDPayment(cardNumber, expiryDate, cvv, selectedBank, cardPrefix);
    }

    if (!isValid) {
      toast({
        variant: 'outline',
        title: 'Validation Error',
        description: 'Please check all fields and try again.',
      });
      return;
    }

    setIsProcessing(true);

    try {
      // Get user's current location for location-based cards
      let latitude = null;
      let longitude = null;

      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        latitude = position.coords.latitude;
        longitude = position.coords.longitude;
      } catch (error) {
        console.log('Location not available:', error);
      }

      // Prepare transaction details
      const transactionType = service ? 'SUBSCRIPTION' : 'STORE_PURCHASE';

      // Parse items and ensure all values are properly typed
      const items = JSON.parse(decodeURIComponent(searchParams.get('items') || '[]'));
      console.log('Parsed items:', items);

      const transactionDetails = service
        ? {
            // Subscription details
            service,
            serviceName: searchParams.get('serviceName'),
            serviceCategory: searchParams.get('serviceCategory'),
            plan,
            amount: parseFloat(total),
            isRecurring: true,

            // Subscription features
            devices: parseInt(searchParams.get('devices') || '1'),
            quality: searchParams.get('quality') || 'HD',
            billingCycle: searchParams.get('billingCycle') || 'monthly',
            features: searchParams.get('features')?.split(',') || [],
          }
        : {
            // For store purchases
            items: items,
            subtotal: parseFloat(searchParams.get('subtotal') || total),
            tax: parseFloat(searchParams.get('tax') || '0'),
            shipping: parseFloat(searchParams.get('shipping') || '0'),
            amount: parseFloat(total),
            // Store/Merchant details
            merchant: searchParams.get('storeName'),
            merchantName: searchParams.get('merchantName'),
            merchantCategory: searchParams.get('merchantCategory'),
            storeDescription: searchParams.get('storeDescription'),
            // Location details will be added from geolocation
            latitude,
            longitude,
          };

      const transactionData = {
        cardNumber:
          activeTab === 'knet' ? `${cardPrefix}${cardNumber.replace(/\s/g, '')}` : cardNumber.replace(/\s/g, ''),
        cvv,
        expiryDate,
        merchant: service ? searchParams.get('serviceName') : searchParams.get('storeName'),
        amount: parseFloat(total),
        isRecurring: !!searchParams.get('isRecurring'),
        description: generateTransactionDescription(transactionType, {
          ...transactionDetails,
          paymentMethod: activeTab.toUpperCase(),
          items: items, // Ensure items are passed to description generator
        }),
        type: transactionType,
        category: service ? searchParams.get('serviceCategory') : searchParams.get('merchantCategory'),
        latitude,
        longitude,
        paymentMethod: activeTab.toUpperCase(),
      };

      console.log('Creating transaction with data:', {
        ...transactionData,
        cardNumber: '************' + transactionData.cardNumber.slice(-4),
        cvv: '***',
        items: items, // Log items for verification
      });

      const transaction = await createTransaction.mutateAsync(transactionData);
      console.log('Transaction response:', transaction);

      if (transaction.status === 'APPROVED') {
        toast({
          variant: 'outline',
          title: 'Payment Successful',
          description: 'Your payment has been processed successfully.',
        });
        router.push('/payment-status?status=success');
      } else {
        // Pass the decline reason to the status page
        const searchParams = new URLSearchParams({
          status: 'failed',
          reason: transaction.declineReason || 'Unknown error',
        });
        router.push(`/payment-status?${searchParams.toString()}`);
      }
    } catch (error) {
      console.error('Payment error:', error);

      // Handle API-level errors
      const searchParams = new URLSearchParams({
        status: 'failed',
        reason: error.message || 'Unknown error',
      });
      router.push(`/payment-status?${searchParams.toString()}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto flex min-h-[80vh] w-screen max-w-3xl items-center justify-center p-4">
      <Card className="w-[450px]">
        <CardHeader className="space-y-4 text-center">
          <div className="rounded-lg bg-primary/5 p-6">
            <div className="mb-2 text-sm font-medium text-muted-foreground">Amount to Pay</div>
            <div className="text-4xl font-bold text-primary">{formatPrice(parseFloat(total))}</div>
          </div>
          <CardDescription className="pt-2">Select your preferred payment method below</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="knet" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="inline-flex h-10 w-full items-center justify-center rounded-md bg-muted p-1 text-muted-foreground">
              <TabsTrigger value="card" className="flex-1">
                Credit Card
              </TabsTrigger>
              <TabsTrigger value="paypal" className="flex-1">
                PayPal
              </TabsTrigger>
              <TabsTrigger value="knet" className="flex-1">
                KNET
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
              <PayPalForm isProcessing={isProcessing} onSubmit={handleSubmit} total={total} />
            </TabsContent>

            <TabsContent value="knet" className="mt-4">
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
