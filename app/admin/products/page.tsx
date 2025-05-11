"use client";
import { useEffect, useState } from 'react';
import { Product } from '@/lib/types';

const emptyProduct: Omit<Product, 'id'> = {
  name: '',
  image: '',
  price: 0,
  description: '',
  inStock: true,
};

export default function AdminProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [showEdit, setShowEdit] = useState<string | null>(null);
  const [form, setForm] = useState<Omit<Product, 'id'>>(emptyProduct);

  useEffect(() => {
    fetch('/api/products')
      .then(res => res.json())
      .then(setProducts);
  }, []);

  const handleAdd = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/products', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    const newProduct = await res.json();
    setProducts(p => [...p, newProduct]);
    setForm(emptyProduct);
    setShowAdd(false);
  };

  const handleEdit = (product: Product) => {
    setForm({ ...product });
    setShowEdit(product.id);
  };

  const handleEditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setProducts(p => p.map(prod => prod.id === showEdit ? { ...prod, ...form } : prod));
    setShowEdit(null);
    setForm(emptyProduct);
  };

  const handleDelete = (id: string) => {
    setProducts(p => p.filter(prod => prod.id !== id));
  };

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Admin: Products</h1>
      <button
        className="mb-4 bg-green-600 text-white px-4 py-2 rounded"
        onClick={() => { setShowAdd(true); setForm(emptyProduct); }}
      >
        Add Product
      </button>
      {showAdd && (
        <form onSubmit={handleAdd} className="mb-6 p-4 bg-gray-100 rounded space-y-2">
          <input required placeholder="Name" className="w-full border rounded px-2 py-1" value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} />
          <input required placeholder="Image URL" className="w-full border rounded px-2 py-1" value={form.image} onChange={e => setForm(f => ({ ...f, image: e.target.value }))} />
          <input required type="number" min={0} step={0.01} placeholder="Price" className="w-full border rounded px-2 py-1" value={form.price} onChange={e => setForm(f => ({ ...f, price: parseFloat(e.target.value) }))} />
          <input required placeholder="Description" className="w-full border rounded px-2 py-1" value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} />
          <label className="flex items-center gap-2">
            <input type="checkbox" checked={form.inStock} onChange={e => setForm(f => ({ ...f, inStock: e.target.checked }))} /> In Stock
          </label>
          <div className="flex gap-2">
            <button type="submit" className="bg-blue-600 text-white px-4 py-1 rounded">Save</button>
            <button type="button" className="bg-gray-400 text-white px-4 py-1 rounded" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </form>
      )}
      <table className="w-full border rounded bg-white">
        <thead>
          <tr className="bg-gray-100">
            <th className="p-2 border">Image</th>
            <th className="p-2 border">Name</th>
            <th className="p-2 border">Price</th>
            <th className="p-2 border">Description</th>
            <th className="p-2 border">Stock</th>
            <th className="p-2 border">Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product.id} className="border-t">
              <td className="p-2 border"><img src={product.image} alt={product.name} className="w-16 h-16 object-cover rounded" /></td>
              <td className="p-2 border">{showEdit === product.id ? (
                <input value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))} className="border rounded px-2 py-1 w-full" />
              ) : product.name}</td>
              <td className="p-2 border">{showEdit === product.id ? (
                <input type="number" value={form.price} onChange={e => setForm(f => ({ ...f, price: parseFloat(e.target.value) }))} className="border rounded px-2 py-1 w-full" />
              ) : `$${product.price.toFixed(2)}`}</td>
              <td className="p-2 border">{showEdit === product.id ? (
                <input value={form.description} onChange={e => setForm(f => ({ ...f, description: e.target.value }))} className="border rounded px-2 py-1 w-full" />
              ) : product.description}</td>
              <td className="p-2 border">{showEdit === product.id ? (
                <input type="checkbox" checked={form.inStock} onChange={e => setForm(f => ({ ...f, inStock: e.target.checked }))} />
              ) : (product.inStock ? 'Yes' : 'No')}</td>
              <td className="p-2 border space-x-2">
                {showEdit === product.id ? (
                  <>
                    <button className="bg-blue-600 text-white px-2 py-1 rounded" onClick={handleEditSubmit}>Save</button>
                    <button className="bg-gray-400 text-white px-2 py-1 rounded" onClick={() => setShowEdit(null)}>Cancel</button>
                  </>
                ) : (
                  <>
                    <button className="bg-yellow-500 text-white px-2 py-1 rounded" onClick={() => handleEdit(product)}>Edit</button>
                    <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDelete(product.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
} 