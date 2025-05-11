import { NextRequest, NextResponse } from 'next/server';

interface Order {
  id: string;
  user: {
    name: string;
    email: string;
    address: string;
    payment: string;
    phone?: string;
  };
  cart: Array<any>;
  subtotal: number;
  createdAt: string;
}

let orders: Order[] = [];

export async function POST(req: NextRequest) {
  const data = await req.json();
  const order: Order = {
    id: Math.random().toString(36).substr(2, 9),
    user: data.user,
    cart: data.cart,
    subtotal: data.subtotal,
    createdAt: new Date().toISOString(),
  };
  orders.push(order);
  return NextResponse.json({ success: true, order });
}

export async function GET() {
  return NextResponse.json(orders);
} 