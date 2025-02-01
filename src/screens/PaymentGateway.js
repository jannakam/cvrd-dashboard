"use client";
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from 'next/navigation';

const banks = [
  {
    name: "Boubyan Bank",
    prefixes: ["400012", "400134", "400256"]
  },
  {
    name: "Kuwait Finance House",
    prefixes: ["510012", "510134", "510256"]
  },
  {
    name: "Ahli United Bank",
    prefixes: ["450012", "450134", "450256"]
  },
  {
    name: "Burgan Bank",
    prefixes: ["520012", "520134", "520256"]
  },
  {
    name: "National Bank of Kuwait",
    prefixes: ["410012", "410134", "410256"]
  },
  {
    name: "Warba Bank",
    prefixes: ["530012", "530134", "530256"]
  },
  {
    name: "Al-Tijari Bank",
    prefixes: ["430012", "430134", "430256"]
  },
  {
    name: "Kuwait International Bank",
    prefixes: ["540012", "540134", "540256"]
  },
  {
    name: "Al Ahli Bank of Kuwait",
    prefixes: ["440012", "440134", "440256"]
  },
  {
    name: "Bank of Bahrain and Kuwait",
    prefixes: ["550012", "550134", "550256"]
  },
  {
    name: "Gulf Bank",
    prefixes: ["460012", "460134", "460256"]
  }
];

export default function PaymentGateway() {
  const { toast } = useToast();
  const router = useRouter();
  const [selectedBank, setSelectedBank] = useState("");
  const [cardPrefix, setCardPrefix] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");
  const [activeTab, setActiveTab] = useState("visa");
  const [isProcessing, setIsProcessing] = useState(false);

  const availablePrefixes = banks.find(bank => bank.name.toLowerCase() === selectedBank)?.prefixes || [];

  const handlePayPalRedirect = (email) => {
    const paypalBaseUrl = "https://www.paypal.com/signin";
    window.location.href = paypalBaseUrl;
  };

  const validatePayment = () => {
    if (activeTab === 'paypal') {
      return !!paypalEmail;
    }

    // For card payments
    const cleanCardNumber = cardNumber.replace(/\s/g, '');
    let isCardNumberValid;
    
    if (activeTab === 'cvrd') {
      // For CVRD, we need to consider the 6-digit prefix separately
      // The remaining number should be 10 digits, but with spaces it will be "1234 5678 90"
      // So we check the cleaned number (without spaces) should be 10 digits
      const cleanRemainingNumber = cleanCardNumber.replace(/\s/g, '');
      isCardNumberValid = cardPrefix.length === 6 && cleanRemainingNumber.length === 12;
    } else {
      // For regular cards (Visa/Mastercard)
      isCardNumberValid = cleanCardNumber.length >= 14 && cleanCardNumber.length <= 16;
    }

    const isExpiryValid = expiryDate.length === 5;
    const isCvvValid = cvv.length === 3;
    
    if (activeTab === 'cvrd') {
      return isCardNumberValid && isExpiryValid && isCvvValid && selectedBank && cardPrefix;
    }

    return isCardNumberValid && isExpiryValid && isCvvValid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Form submitted", activeTab);
    
    if (activeTab === 'paypal') {
      if (paypalEmail) {
        handlePayPalRedirect(paypalEmail);
        return;
      }
    }

    if (!validatePayment()) {
      toast({
        variant: "outline",
        title: "Validation Error",
        description: "Please fill in all required fields correctly.",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Randomly succeed or fail for demonstration
          if (Math.random() > 0.5) {
            resolve();
          } else {
            reject(new Error("Payment failed"));
          }
        }, 1500);
      });

      toast({
        variant: "outline",
        title: "Payment Successful",
        description: "Your payment has been processed successfully.",
      });

      // Redirect to success page after a short delay to show the toast
      setTimeout(() => {
        router.push('/payment-status?status=success');
      }, 1000);
    } catch (error) {
      toast({
        variant: "outline",
        title: "Payment Failed",
        description: error.message || "There was an error processing your payment.",
      });

      // Redirect to failure page after a short delay to show the toast
      setTimeout(() => {
        router.push('/payment-status?status=failed');
      }, 1000);
    } finally {
      setIsProcessing(false);
    }
  };

  const formatExpiryDate = (value) => {
    // Remove any non-digit characters
    const cleanValue = value.replace(/\D/g, '');
    
    // Handle backspace - if the last character was a slash, remove the digit before it
    if (value.length < expiryDate.length && value.length === 2) {
      return cleanValue.slice(0, -1);
    }

    // Format as MM/YY
    if (cleanValue.length >= 2) {
      const month = cleanValue.slice(0, 2);
      const year = cleanValue.slice(2, 4);
      
      // Validate month (01-12)
      if (parseInt(month) > 12) {
        return '12' + (year ? '/' + year : '');
      }
      if (parseInt(month) === 0) {
        return '01' + (year ? '/' + year : '');
      }
      
      return month + (cleanValue.length > 2 ? '/' + year : '');
    }
    
    return cleanValue;
  };

  const handleExpiryChange = (e) => {
    const formattedValue = formatExpiryDate(e.target.value);
    setExpiryDate(formattedValue);
  };

  const formatCardNumber = (value) => {
    const v = value.replace(/\s+/g, "").replace(/[^0-9]/gi, "");
    const matches = v.match(/\d{4,16}/g);
    const match = (matches && matches[0]) || "";
    const parts = [];

    for (let i = 0, len = match.length; i < len; i += 4) {
      parts.push(match.substring(i, i + 4));
    }

    if (parts.length) {
      return parts.join(" ");
    } else {
      return value;
    }
  };

  return (
    <div className="h-screen w-screen container mx-auto p-4 max-w-3xl flex items-center justify-center min-h-[80vh]">
      <Card className="w-[450px]">
        <CardHeader className="space-y-2">
          <CardTitle className="text-2xl font-bold">Payment Gateway</CardTitle>
          <CardDescription>Choose your preferred payment method</CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="visa" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground w-full">
              <TabsTrigger value="visa" className="flex-1">Visa</TabsTrigger>
              <TabsTrigger value="mastercard" className="flex-1">Mastercard</TabsTrigger>
              <TabsTrigger value="paypal" className="flex-1">PayPal</TabsTrigger>
              <TabsTrigger value="cvrd" className="flex-1">CVRD</TabsTrigger>
            </TabsList>

            {/* Visa Payment Form */}
            <TabsContent value="visa" className="mt-4 h-[280px]">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Card Number"
                  value={formatCardNumber(cardNumber)}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength="19"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={handleExpiryChange}
                    maxLength="5"
                  />
                  <Input
                    type="text"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    maxLength="3"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Pay Now"}
                </Button>
              </form>
            </TabsContent>

            {/* Mastercard Payment Form */}
            <TabsContent value="mastercard" className="mt-4 h-[280px]">
              <form onSubmit={handleSubmit} className="space-y-4">
                <Input
                  type="text"
                  placeholder="Card Number"
                  value={formatCardNumber(cardNumber)}
                  onChange={(e) => setCardNumber(e.target.value)}
                  maxLength="19"
                />
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={handleExpiryChange}
                    maxLength="5"
                  />
                  <Input
                    type="text"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    maxLength="3"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Pay Now"}
                </Button>
              </form>
            </TabsContent>

            {/* PayPal Payment Form */}
            <TabsContent value="paypal" className="mt-4 h-[280px]">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                  <Input
                    type="email"
                    placeholder="PayPal Email"
                    className="w-full"
                    value={paypalEmail}
                    onChange={(e) => setPaypalEmail(e.target.value)}
                    required
                  />
                  <div className="text-center">
                    <p className="text-muted-foreground text-sm mb-4">You will be redirected to PayPal to complete your payment</p>
                  </div>
                </div>
                <Button type="submit" className="w-full" disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Continue with PayPal"}
                </Button>
              </form>
            </TabsContent>

            {/* CVRD Payment Form */}
            <TabsContent value="cvrd" className="mt-4 h-[280px]">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-4">
                  <Select value={selectedBank} onValueChange={(value) => {
                    setSelectedBank(value);
                    setCardPrefix(""); // Reset prefix when bank changes
                  }}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your bank" />
                    </SelectTrigger>
                    <SelectContent>
                      {banks.map((bank) => (
                        <SelectItem key={bank.name} value={bank.name.toLowerCase()}>
                          {bank.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <div className="flex space-x-2">
                    <Select 
                      value={cardPrefix} 
                      onValueChange={setCardPrefix}
                      disabled={!selectedBank}
                      className="w-1/3"
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="First 6 digits" />
                      </SelectTrigger>
                      <SelectContent>
                        {availablePrefixes.map((prefix) => (
                          <SelectItem key={prefix} value={prefix}>
                            {prefix}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <Input
                      className="w-2/3"
                      type="text"
                      placeholder="Remaining card number"
                      value={formatCardNumber(cardNumber)}
                      onChange={(e) => setCardNumber(e.target.value)}
                      maxLength="14"
                      disabled={!cardPrefix}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    type="text"
                    placeholder="MM/YY"
                    value={expiryDate}
                    onChange={handleExpiryChange}
                    maxLength="5"
                  />
                  <Input
                    type="text"
                    placeholder="CVV"
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    maxLength="3"
                  />
                </div>
                <Button type="submit" className="w-full" disabled={isProcessing}>
                  {isProcessing ? "Processing..." : "Pay Now"}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
        <CardFooter className="flex justify-center text-sm text-muted-foreground">
          Your payment information is secure and encrypted
        </CardFooter>
      </Card>
    </div>
  );
}
