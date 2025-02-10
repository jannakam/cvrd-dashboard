import { toast } from '@/hooks/use-toast';

export const generateTransactionDescription = (type, details) => {
  try {
    // For subscription payments
    if (type === 'SUBSCRIPTION') {
      return JSON.stringify({
        type: 'SUBSCRIPTION',
        service: details.service,
        serviceName: details.serviceName || 'Unknown Service',
        serviceCategory: details.serviceCategory || 'Streaming',
        plan: details.plan,
        amount: parseFloat(details.amount).toFixed(2),
        isRecurring: true,
        features: {
          devices: parseInt(details.devices) || 1,
          quality: details.quality || 'HD',
          billingCycle: details.billingCycle || 'monthly',
          additionalFeatures: details.features || [],
        },
        paymentMethod: details.paymentMethod,
      });
    }

    // For store purchases
    const items = Array.isArray(details.items)
      ? details.items.map((item) => ({
          id: item.id,
          name: item.name,
          quantity: parseInt(item.quantity) || 1,
          unitPrice: parseFloat(item.price).toFixed(2),
          totalPrice: (parseFloat(item.price) * (parseInt(item.quantity) || 1)).toFixed(2),
          category: item.category || 'General',
        }))
      : [];

    return JSON.stringify({
      type: 'PURCHASE',
      merchant: {
        name: details.merchant || details.merchantName || 'Unknown Store',
        category: details.merchantCategory || 'General',
        description: details.storeDescription || '',
        location:
          details.latitude && details.longitude
            ? {
                latitude: details.latitude,
                longitude: details.longitude,
              }
            : null,
      },
      transaction: {
        items,
        subtotal: parseFloat(details.subtotal).toFixed(2),
        tax: parseFloat(details.tax).toFixed(2),
        shipping: parseFloat(details.shipping).toFixed(2),
        total: parseFloat(details.amount).toFixed(2),
        paymentMethod: details.paymentMethod,
      },
    });
  } catch (error) {
    console.error('Error generating transaction description:', error);
    console.error('Details received:', details);

    toast({
      variant: 'destructive',
      title: 'Transaction Error',
      description: 'Failed to generate transaction description.',
    });

    return JSON.stringify({
      type: type,
      error: 'Failed to generate complete transaction description',
      amount: details.amount,
    });
  }
};
