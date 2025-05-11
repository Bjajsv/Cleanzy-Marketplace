import { Product } from '@/lib/types';

export const products: Product[] = [
  {
    id: '1',
    name: 'All-Purpose Cleaner',
    image: '/images/all-purpose-cleaner.jpg',
    price: 5.99,
    description: 'A versatile cleaner for all surfaces.',
    inStock: true,
  },
  {
    id: '2',
    name: 'Microfiber Cloths',
    image: '/images/microfiber-cloths.jpg',
    price: 3.49,
    description: 'Soft, reusable cloths for dusting and wiping.',
    inStock: true,
  },
  {
    id: '3',
    name: 'Glass Cleaner',
    image: '/images/glass-cleaner.jpg',
    price: 4.25,
    description: 'Streak-free formula for windows and mirrors.',
    inStock: false,
  },
  {
    id: '4',
    name: 'Scrub Brush',
    image: '/images/scrub-brush.jpg',
    price: 2.99,
    description: 'Durable brush for tough stains.',
    inStock: true,
  },
]; 