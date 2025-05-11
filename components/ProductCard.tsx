import { Product } from '@/lib/types';
import AddToCartButton from './AddToCartButton';

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4 flex flex-col items-center">
      <img
        src={product.image}
        alt={product.name}
        className="w-32 h-32 object-cover mb-4 rounded"
      />
      <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <div className="flex items-center justify-between w-full mb-2">
        <span className="text-green-700 font-bold">${product.price.toFixed(2)}</span>
        <span className={product.inStock ? 'text-green-600' : 'text-red-500'}>
          {product.inStock ? 'In Stock' : 'Out of Stock'}
        </span>
      </div>
      <AddToCartButton product={product} />
    </div>
  );
} 