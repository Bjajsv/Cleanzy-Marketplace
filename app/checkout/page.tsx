"use client";
import { useForm, Controller } from "react-hook-form";
import { useCart } from '@/context/CartContext';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface BillingInfo {
  name: string;
  email: string;
  address: string;
  payment: 'mpesa' | 'mock';
  phone?: string;
}

export default function CheckoutPage() {
  const { cart, subtotal, clearCart } = useCart();
  const { register, handleSubmit, watch, formState: { errors }, control } = useForm<BillingInfo>();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const paymentMethod = watch('payment');

  const onSubmit = async (data: BillingInfo) => {
    setLoading(true);
    setError(null);
    try {
      if (data.payment === 'mpesa') {
        // Simulate MPesa payment processing
        await new Promise((resolve) => setTimeout(resolve, 2000));
      }
      const res = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user: data,
          cart,
          subtotal,
        }),
      });
      if (!res.ok) throw new Error('Order failed');
      clearCart();
      router.push('/checkout/success');
    } catch (e: any) {
      setError(e.message || 'Order failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Checkout</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded shadow">
        <div>
          <label className="block font-medium mb-1">Name</label>
          <input {...register('name', { required: true })} className="w-full border rounded px-3 py-2" />
          {errors.name && <span className="text-red-500 text-sm">Name is required</span>}
        </div>
        <div>
          <label className="block font-medium mb-1">Email</label>
          <input type="email" {...register('email', { required: true })} className="w-full border rounded px-3 py-2" />
          {errors.email && <span className="text-red-500 text-sm">Email is required</span>}
        </div>
        <div>
          <label className="block font-medium mb-1">Address</label>
          <input {...register('address', { required: true })} className="w-full border rounded px-3 py-2" />
          {errors.address && <span className="text-red-500 text-sm">Address is required</span>}
        </div>
        <div>
          <label className="block font-medium mb-1">Payment Method</label>
          <select {...register('payment', { required: true })} className="w-full border rounded px-3 py-2">
            <option value="mpesa">MPesa</option>
            <option value="mock">Mock Payment</option>
          </select>
        </div>
        {paymentMethod === 'mpesa' && (
          <div>
            <label className="block font-medium mb-1">MPesa Phone Number</label>
            <input
              {...register('phone', {
                required: paymentMethod === 'mpesa',
                pattern: /^\d{10,15}$/,
              })}
              type="tel"
              placeholder="e.g. 0712345678"
              className="w-full border rounded px-3 py-2"
            />
            {errors.phone?.type === 'required' && (
              <span className="text-red-500 text-sm">Phone number is required for MPesa</span>
            )}
            {errors.phone?.type === 'pattern' && (
              <span className="text-red-500 text-sm">Enter a valid phone number</span>
            )}
          </div>
        )}
        <div>
          <h2 className="font-semibold mb-2">Cart Summary</h2>
          {cart.length === 0 ? (
            <p className="text-gray-600">Your cart is empty.</p>
          ) : (
            <ul className="mb-2">
              {cart.map(item => (
                <li key={item.id} className="flex justify-between">
                  <span>{item.name} x {item.quantity}</span>
                  <span>${(item.price * item.quantity).toFixed(2)}</span>
                </li>
              ))}
            </ul>
          )}
          <div className="flex justify-between font-bold">
            <span>Subtotal:</span>
            <span>${subtotal.toFixed(2)}</span>
          </div>
        </div>
        {error && <div className="text-red-500">{error}</div>}
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded font-semibold disabled:bg-gray-300"
          disabled={loading || cart.length === 0}
        >
          {loading ? (paymentMethod === 'mpesa' ? 'Processing MPesa payment...' : 'Placing Order...') : 'Place Order'}
        </button>
      </form>
    </main>
  );
} 