
import React, { useMemo, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { plans } from '../data/plans';
import { useCart } from '../hooks/useCart';
import { Product } from '../types';

export default function PricingPlanPage() {
  const { planSlug } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [selected, setSelected] = useState<string[]>([]);

  const plan = useMemo(() => plans.find(p => p.slug === (planSlug as any)), [planSlug]);
  const total = useMemo(() => {
    if (!plan) return 0;
    const addonsTotal = plan.addons
      .filter(a => selected.includes(a.id))
      .reduce((s, a) => s + a.price, 0);
    return plan.basePrice + addonsTotal;
  }, [plan, selected]);

  if (!plan) {
    return (
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-3xl font-bold mb-4">Plan introuvable</h1>
        <button className="underline" onClick={() => navigate('/')}>Retour</button>
      </div>
    );
  }

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]);
  };

  const addToBasket = () => {
    const product: Product = {
      id: `plan-${plan.slug}-${Date.now()}`,
      name: `${plan.name} (${selected.length ? 'avec options' : 'sans options'})`,
      price: Number(total.toFixed(2)),
      category: 'plans',
      description: `${plan.description}. Options: ${plan.addons.filter(a=>selected.includes(a.id)).map(a=>a.label).join(', ') || 'Aucune'}`,
      image: 'https://images.unsplash.com/photo-1556139943-4bdca53adf1e?auto=format&fit=crop&q=80&w=800'
    };
    addToCart(product);
    navigate('/?added=1');
  };

  return (
    <div className="min-h-screen bg-white">
      <div className="container mx-auto px-4 py-16">
        <h1 className="text-4xl font-bold mb-2">{plan.name}</h1>
        <p className="text-gray-600 mb-8">{plan.description}</p>

        <div className="bg-gray-50 rounded-xl p-6 mb-6">
          <div className="flex items-end justify-between">
            <div>
              <div className="text-sm text-gray-500 mb-1">Prix de base</div>
              <div className="text-3xl font-bold">{plan.basePrice.toFixed(2)}€</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 mb-1">Total</div>
              <div className="text-4xl font-extrabold">{total.toFixed(2)}€</div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-semibold mb-4">Options</h2>
        <div className="space-y-3">
          {plan.addons.map(add => (
            <label key={add.id} className="flex items-center justify-between bg-gray-50 p-4 rounded-lg cursor-pointer group">
              <div className="flex items-center gap-3">
                <span title="Cliquez pour ajouter cette option" className="text-xs px-2 py-1 rounded bg-blue-100 text-blue-800 opacity-0 group-hover:opacity-100 transition">i</span>
                <input
                  type="checkbox"
                  checked={selected.includes(add.id)}
                  onChange={() => toggle(add.id)}
                  className="w-5 h-5 accent-blue-900 rounded"
                />
                <span className="font-medium">{add.label}</span>
              </div>
              <span className="font-semibold">+ {add.price.toFixed(2)}€</span>
            </label>
          ))}
        </div>

        <div className="mt-8 flex gap-4">
          <button onClick={addToBasket} className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800">
            Ajouter au panier
          </button>
          <button onClick={() => navigate('/')} className="px-6 py-3 rounded-lg border">Retour</button>
        </div>
      </div>
    </div>
  );
}
