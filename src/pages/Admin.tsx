import React, { useEffect, useState } from 'react';

type Order = { id: string; email: string; amount_total: number; items: any[]; created: string; };

export default function Admin() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    fetch('/.netlify/functions/admin-orders')
      .then(r => r.json())
      .then(setOrders)
      .catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-10">
        <h1 className="text-3xl font-bold mb-6">Commandes</h1>
        <div className="bg-gray-50 rounded-xl p-4">
          <table className="w-full text-sm">
            <thead><tr className="text-left">
              <th className="p-2">ID</th>
              <th className="p-2">Email</th>
              <th className="p-2">Montant</th>
              <th className="p-2">Date</th>
              <th className="p-2">Articles</th>
            </tr></thead>
            <tbody>
              {orders.map(o => (
                <tr key={o.id} className="border-t">
                  <td className="p-2">{o.id}</td>
                  <td className="p-2">{o.email}</td>
                  <td className="p-2">{(o.amount_total/100).toFixed(2)}€</td>
                  <td className="p-2">{new Date(o.created).toLocaleString('fr-FR')}</td>
                  <td className="p-2">{o.items?.map((it:any)=>`${it.name} x${it.quantity}`).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
