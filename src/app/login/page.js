'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Loader2 } from 'lucide-react';
import { useSearchParams, useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();

  // Get redirect parameters
  const redirectTo = searchParams.get('redirectTo');
  const total = searchParams.get('total');
  const service = searchParams.get('service');
  const plan = searchParams.get('plan');

  // Determine if this is a payment flow
  const isPaymentFlow = total && service && plan;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      console.log('Starting login process...');
      const loginResult = await login(email, password);
      console.log('Login successful:', loginResult);

      toast({
        title: 'Success',
        description: 'You have been successfully logged in.',
      });

      // Add a small delay to ensure the auth state is updated
      await new Promise((resolve) => setTimeout(resolve, 500));

      // Determine the target URL
      let targetUrl;
      if (isPaymentFlow) {
        // If we're in a payment flow, construct the payment URL
        targetUrl = `/payment?total=${encodeURIComponent(total)}&service=${encodeURIComponent(service)}&plan=${encodeURIComponent(plan)}`;
      } else if (redirectTo) {
        // If we have a redirect URL, use it
        targetUrl = redirectTo;
      } else {
        // Default to dashboard
        targetUrl = '/';
      }

      console.log('Final redirect URL:', targetUrl);
      router.replace(targetUrl);
    } catch (error) {
      console.error('Login error:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: error.message || 'Failed to login. Please try again.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <Card className="w-[350px]">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl">Welcome back</CardTitle>
          <CardDescription>
            {isPaymentFlow ? 'Please log in to complete your purchase' : 'Enter your credentials to sign in'}
          </CardDescription>
          {isPaymentFlow && (
            <div className="mt-2 rounded-lg bg-primary/5 p-4">
              <div className="text-sm font-medium text-muted-foreground">Selected Plan</div>
              <div className="mt-1 font-semibold">
                {service} - {plan}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">Total: ${total}</div>
            </div>
          )}
        </CardHeader>
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-4">
            <div className="grid gap-2">
              <Input
                id="email"
                type="email"
                placeholder="name@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full" type="submit" disabled={isLoading}>
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {isPaymentFlow ? 'Sign in to Continue Purchase' : 'Sign In'}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
