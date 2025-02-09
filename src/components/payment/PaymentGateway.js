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

import {
  saveTransaction,
  updateTransactionStatus,
  TRANSACTION_STATUS,
  TRANSACTION_TYPE,
  TRANSACTION_CATEGORY,
} from '@/lib/transaction-storage';

export default function PaymentGateway() {
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const total = searchParams.get('total') || '0';
  const service = searchParams.get('service');
  const plan = searchParams.get('plan');

  // Card payment state
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [cvv, setCvv] = useState('');

  // PayPal state
  const [paypalEmail, setPaypalEmail] = useState('');

  // KNET state
  const [selectedBank, setSelectedBank] = useState('');
  const [cardPrefix, setCardPrefix] = useState('');

  // Common state
  const [activeTab, setActiveTab] = useState('knet');
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
    } else if (activeTab === 'knet') {
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
    let transaction = null;

    try {
      // Determine if this is a seasonal period
      const currentDate = new Date();
      const month = currentDate.getMonth();
      let seasonalTiming = '';

      // Basic seasonal detection
      if (month === 11) seasonalTiming = 'holiday-season';
      else if (month === 6 || month === 7) seasonalTiming = 'summer-sale';
      else if (month === 1) seasonalTiming = 'winter-sale';
      else if (month === 4) seasonalTiming = 'spring-sale';

      // Get subscription details if this is a subscription purchase
      const subscriptionDetails = service
        ? {
            name: service,
            plan: plan,
            billingFrequency: plan?.toLowerCase().includes('annual') ? 'annual' : 'monthly',
          }
        : null;

      // Create enhanced transaction data
      const transactionData = {
        amount: parseFloat(total),
        currency: 'USD',
        paymentMethod: activeTab,
        service,
        plan,
        status: TRANSACTION_STATUS.PENDING,
        type: service ? TRANSACTION_TYPE.SUBSCRIPTION : TRANSACTION_TYPE.STORE_PURCHASE,
        category: service ? TRANSACTION_CATEGORY.STREAMING : TRANSACTION_CATEGORY.SHOPPING,
        regularPrice: parseFloat(total), // Add actual regular price if available
        discountApplied: 0, // Add actual discount if available
        isRecurring: !!service,
        frequency: subscriptionDetails?.billingFrequency || 'one-time',
        itemDetails: service ? [subscriptionDetails] : [], // Add subscription details or store items
        merchantInfo: {
          name: service || 'Store Purchase',
          type: service ? 'streaming-service' : 'retail',
          platform: 'online',
          location: 'global',
        },
        seasonalTiming,
        paymentDetails: {
          ...(activeTab === 'card' && {
            lastFourDigits: cardNumber.slice(-4),
            expiryDate,
            cardType: cardNumber.startsWith('4') ? 'visa' : cardNumber.startsWith('5') ? 'mastercard' : 'other',
          }),
          ...(activeTab === 'paypal' && {
            email: paypalEmail,
          }),
          ...(activeTab === 'knet' && {
            bank: selectedBank,
            lastFourDigits: cardNumber.slice(-4),
            expiryDate,
          }),
        },
        metadata: {
          deviceType: 'web',
          timestamp: new Date().toISOString(),
          userAgent: navigator.userAgent,
          ipLocation: 'to-be-implemented', // Would require backend implementation
        },
      };

      // Save initial transaction
      transaction = saveTransaction(transactionData);

      // Simulate API call
      await new Promise((resolve) => {
        setTimeout(() => {
          resolve();
        }, 1500);
      });

      // Update transaction status to success
      updateTransactionStatus(transaction.id, TRANSACTION_STATUS.SUCCESS);

      toast({
        variant: 'outline',
        title: 'Payment Successful',
        description: 'Your payment has been processed successfully.',
      });

      setTimeout(() => {
        redirect('/subscriptions');
      }, 1000);
    } catch (error) {
      // Update transaction status to failed
      if (transaction) {
        updateTransactionStatus(transaction.id, TRANSACTION_STATUS.FAILED);
      }

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
              <PayPalForm
                paypalEmail={paypalEmail}
                setPaypalEmail={setPaypalEmail}
                isProcessing={isProcessing}
                onSubmit={handleSubmit}
              />
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
