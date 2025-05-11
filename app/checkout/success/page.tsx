export default function CheckoutSuccessPage() {
  return (
    <main className="max-w-xl mx-auto px-4 py-16 text-center">
      <h1 className="text-3xl font-bold mb-4">Thank you for your order!</h1>
      <p className="text-lg text-gray-700 mb-8">Your order has been placed successfully. We will process it soon.</p>
      <a href="/marketplace" className="inline-block bg-blue-600 text-white px-6 py-2 rounded font-semibold">Continue Shopping</a>
    </main>
  );
} 