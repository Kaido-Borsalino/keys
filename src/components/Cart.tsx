import React, { useEffect, useState } from 'react';
import { X, Minus, Plus, ShoppingBag } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onRemoveItem: (productId: string) => void;
  onCheckout: () => void;
  totalPrice: number;
}

export function Cart({ 
  const [promo, setPromo] = useState<string>('');
  const [promoInfo, setPromoInfo] = useState<{percent_off?: number; amount_off?: number; currency?: string} | null>(null);
  const [estimatedDiscount, setEstimatedDiscount] = useState<number>(0);
  useEffect(()=>{
    const saved = localStorage.getItem('speedkeyshop-promo');
    if (saved) {
      try { const p = JSON.parse(saved); setPromo(p.code||''); setPromoInfo(p.info||null); } catch(e){}
    }
  }, []);
  useEffect(()=>{
    const subtotal = totalPrice;
    if (!promoInfo) { setEstimatedDiscount(0); return; }
    if (promoInfo.percent_off) setEstimatedDiscount(subtotal * (promoInfo.percent_off/100));
    else if (promoInfo.amount_off) setEstimatedDiscount((promoInfo.amount_off||0)/100);
    else setEstimatedDiscount(0);
  }, [promoInfo, totalPrice]);

  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem, 
  onCheckout,
  totalPrice 
}: CartProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold flex items-center">
            <ShoppingBag className="w-5 h-5 mr-2" />
            Panier ({cartItems.length})
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="w-16 h-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500">Votre panier est vide</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex items-center space-x-4 bg-gray-50 p-4 rounded-lg">
                  <img 
                    src={item.product.image} 
                    alt={item.product.name}
                    className="w-16 h-16 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold text-sm">{item.product.name}</h3>
                    <p className="text-blue-900 font-bold">{item.product.price.toFixed(2)}€</p>
                    <div className="flex items-center space-x-2 mt-2">
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity - 1)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="px-2 py-1 bg-white rounded border">{item.quantity}</span>
                      <button
                        onClick={() => onUpdateQuantity(item.product.id, item.quantity + 1)}
                        className="p-1 hover:bg-gray-200 rounded"
                      >
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                  <button
                    onClick={() => onRemoveItem(item.product.id)}
                    className="p-2 text-red-500 hover:bg-red-50 rounded"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="border-t p-4">
            <div className="flex justify-between items-center mb-4">
              <span className="text-sm text-gray-500">Sous-total:</span>
              <span className="text-lg font-semibold">{totalPrice.toFixed(2)}€</span>
            </div>
            {estimatedDiscount>0 && (
              <div className="flex justify-between items-center mb-2 text-green-700">
                <span className="text-sm">Remise {promoInfo?.percent_off? `${promoInfo?.percent_off}%`: ""}</span>
                <span>-{estimatedDiscount.toFixed(2)}€</span>
              </div>
            )}
            <div className="flex justify-between items-center mb-4">
              <span className="text-lg font-semibold">Total estimé:</span>
              <span className="text-2xl font-bold text-blue-900">{(Math.max(totalPrice - estimatedDiscount,0)).toFixed(2)}€</span>
            </div>
              <span className="text-lg font-semibold">Total:</span>
              <span className="text-2xl font-bold text-blue-900">{totalPrice.toFixed(2)}€</span>
            </div>
            <button
              onClick={()=>{ if(!localStorage.getItem('speedkeyshop-user')) { window.location.href='/signup'; } else { onCheckout(); } }}
              className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors duration-300"
            >
              Procéder au paiement
            </button>
          </div>
        )}
      </div>
    </div>
  );
}