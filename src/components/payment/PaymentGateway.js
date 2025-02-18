'use client';

import { useState, useEffect } from 'react';
import { useGeolocated } from 'react-geolocated';
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

  const [locationStatus, setLocationStatus] = useState('loading');

  const { coords, isGeolocationAvailable, isGeolocationEnabled, positionError, getPosition } = useGeolocated({
    positionOptions: {
      enableHighAccuracy: false,
      maximumAge: 300000, // 5 minutes
    },
    watchPosition: true,
    userDecisionTimeout: 10000,
    onError: (error) => {
      console.log('Geolocation error:', error);
      setLocationStatus('error');
    },
    onSuccess: (position) => {
      console.log('Location obtained:', position);
      setLocationStatus('success');
    },
  });

  // Monitor geolocation state changes
  useEffect(() => {
    if (!isGeolocationAvailable) {
      setLocationStatus('error');
      return;
    }

    if (!isGeolocationEnabled) {
      setLocationStatus('error');
      return;
    }

    if (positionError) {
      setLocationStatus('error');
      return;
    }

    if (coords) {
      setLocationStatus('success');
    }
  }, [isGeolocationAvailable, isGeolocationEnabled, coords, positionError]);

  // Add retry button handler
  const handleRetryLocation = () => {
    setLocationStatus('loading');
    getPosition();
  };

  const total = searchParams?.get('total') || '0';
  const service = searchParams?.get('service') || '';
  const plan = searchParams?.get('plan') || '';

  // Safely parse items with error handling
  const getItems = () => {
    try {
      const itemsParam = searchParams?.get('items');
      return itemsParam ? JSON.parse(decodeURIComponent(itemsParam)) : [];
    } catch (error) {
      console.error('Error parsing items:', error);
      return [];
    }
  };

  const items = getItems();

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
        return;
      }
      isValid = validateCVRDPayment(cardNumber, expiryDate, cvv, selectedBank, cardPrefix);
    }

    if (!isValid) {
      return;
    }

    setIsProcessing(true);

    try {
      const latitude = coords?.latitude ?? null;
      const longitude = coords?.longitude ?? null;

      console.log('Location obtained:', { latitude, longitude });
      console.log('GeoState:', coords);
      console.log('GeoState JSON:', JSON.stringify(coords));

      // Prepare transaction details
      const transactionType = service ? 'SUBSCRIPTION' : 'STORE_PURCHASE';

      // Parse items and ensure all values are properly typed
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
        // Pass the decline reason and original payment parameters to the status page
        const statusParams = new URLSearchParams({
          status: 'failed',
          reason: transaction.declineReason || 'Unknown error',
          paymentParams: searchParams.toString(), // Pass original payment parameters
        });
        router.push(`/payment-status?${statusParams.toString()}`);
      }
    } catch (error) {
      console.error('Payment error:', error);

      // Handle API-level errors and pass original payment parameters
      const statusParams = new URLSearchParams({
        status: 'failed',
        reason: error.message || 'Unknown error',
        paymentParams: searchParams.toString(), // Pass original payment parameters
      });
      router.push(`/payment-status?${statusParams.toString()}`);
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="container mx-auto flex min-h-[80vh] w-screen max-w-3xl flex-col items-center justify-center gap-4 p-4 py-10">
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
              <TabsTrigger value="knet" className="flex-1">
                KNET
              </TabsTrigger>
              <TabsTrigger value="card" className="flex-1">
                Credit Card
              </TabsTrigger>
              <TabsTrigger value="paypal" className="flex-1">
                PayPal
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
        <CardFooter className="flex-col space-y-2">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="h-1 w-1 rounded-full bg-green-500"></div>
            Your payment information is secure and encrypted
          </div>
        </CardFooter>
      </Card>
      {/* Location Status Indicator */}
      <div className="flex items-center justify-center gap-2 text-xs">
        {!isGeolocationAvailable ? (
          <div className="flex items-center gap-1 text-destructive">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
            Location services not supported
          </div>
        ) : !isGeolocationEnabled ? (
          <button onClick={handleRetryLocation} className="flex items-center gap-1 text-primary hover:underline">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Enable location for enhanced security
          </button>
        ) : locationStatus === 'loading' ? (
          <div className="flex items-center gap-1 text-muted-foreground">
            <div className="h-3 w-3 animate-spin rounded-full border border-primary border-t-transparent"></div>
            Verifying location...
          </div>
        ) : locationStatus === 'error' ? (
          <button onClick={handleRetryLocation} className="flex items-center gap-1 text-destructive hover:underline">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M1 4v6h6" />
              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
            </svg>
            Retry location verification
          </button>
        ) : (
          <div className="flex items-center gap-1 text-green-600">
            <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20 6L9 17l-5-5" />
            </svg>
            Location verified
          </div>
        )}
      </div>
    </div>
  );
}
