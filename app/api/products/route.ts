import { NextRequest, NextResponse } from 'next/server';
import { Product } from '@/lib/types';

let products: Product[] = [
  // You can initialize with some mock products if you want
];

export async function GET() {
  return NextResponse.json(products);
}

export async function POST(req: NextRequest) {
  const data = await req.json();
  const newProduct: Product = {
    ...data,
    id: Math.random().toString(36).substr(2, 9),
  };
  products.push(newProduct);
  return NextResponse.json(newProduct);
}

export async function PUT(req: NextRequest) {
  const data = await req.json();
  const idx = products.findIndex(p => p.id === data.id);
  if (idx !== -1) {
    products[idx] = { ...products[idx], ...data };
    return NextResponse.json(products[idx]);
  }
  return NextResponse.json({ error: 'Product not found' }, { status: 404 });
}

export async function DELETE(req: NextRequest) {
  const { id } = await req.json();
  products = products.filter(p => p.id !== id);
  return NextResponse.json({ success: true });
} 