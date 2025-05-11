import { Product } from '@/lib/types';
import { useCart } from '@/context/CartContext';

interface AddToCartButtonProps {
  product: Product;
}

export default function AddToCartButton({ product }: AddToCartButtonProps) {
  const { addToCart } = useCart();

  return (
    <button
      className="w-full bg-blue-600 text-white py-2 rounded disabled:bg-gray-300"
      disabled={!product.inStock}
      onClick={() => addToCart(product)}
    >
      Add to Cart
    </button>
  );
} 