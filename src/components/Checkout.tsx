import React, { useState } from 'react';
import { X, CreditCard, User, Mail } from 'lucide-react';
import { CartItem, Customer } from '../types';

interface CheckoutProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  totalPrice: number;
  onOrderComplete: () => void;
}

export function Checkout({ isOpen, onClose, cartItems, totalPrice, onOrderComplete }: CheckoutProps) {
  const [step, setStep] = useState<'customer' | 'payment'>('customer');
  const [loading, setLoading] = useState(false);
  const [customer, setCustomer] = useState<Customer>({
    email: '',
    firstName: '',
    lastName: '',
    isGuest: true
  });
  const [paymentMethod, setPaymentMethod] = useState<'card' | 'paypal'>('card');

  if (!isOpen) return null;

  const handleCustomerSubmit = (e: React.FormEvent) => {
    e.preventDefault();
                setLoading(true);
                try {
                  if (coupon.trim() && !promoInfo) { await validatePromo(); }
                  const user = JSON.parse(localStorage.getItem('speedkeyshop-user') || 'null');
                  const res = await fetch('/.netlify/functions/create-checkout-session', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cartItems, user, couponCode: coupon.trim() || undefined })
                  });
                  const data = await res.json();
                  if (data.url) { window.location.href = data.url; return; }
                } catch (err) { console.error(err); } finally { setLoading(false); }
    setStep('payment');
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
                setLoading(true);
                try {
                  if (coupon.trim() && !promoInfo) { await validatePromo(); }
                  const user = JSON.parse(localStorage.getItem('speedkeyshop-user') || 'null');
                  const res = await fetch('/.netlify/functions/create-checkout-session', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cartItems, user, couponCode: coupon.trim() || undefined })
                  });
                  const data = await res.json();
                  if (data.url) { window.location.href = data.url; return; }
                } catch (err) { console.error(err); } finally { setLoading(false); }
    
    if (paymentMethod === 'paypal') {
      // For a real implementation, you would integrate PayPal SDK
      // For now, we'll show instructions to contact directly
      alert(`Pour finaliser votre commande de ${totalPrice.toFixed(2)}€, veuillez nous contacter directement :\n\nEmail: speedkeyshop91@gmail.com\nTéléphone: +33788803992\n\nNous vous enverrons un lien de paiement PayPal sécurisé.`);
    } else {
      // For card payment, also redirect to contact
      alert(`Pour finaliser votre commande de ${totalPrice.toFixed(2)}€, veuillez nous contacter directement :\n\nEmail: speedkeyshop91@gmail.com\nTéléphone: +33788803992\n\nNous acceptons les paiements par carte bancaire et PayPal.`);
    }
    
    // Close checkout after showing contact info
    onClose();
    setStep('customer');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50">
      <div className="fixed inset-4 bg-white rounded-lg shadow-xl overflow-hidden">
        <div className="flex items-center justify-between p-6 border-b">
          <h2 className="text-2xl font-semibold">
            {step === 'customer' ? 'Informations client' : 'Paiement'}
          </h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded">
            <X className="w-6 h-6" />
          </button>
        </div>

        <div className="flex h-full">
          {/* Order Summary */}
          <div className="w-1/3 bg-gray-50 p-6 border-r">
            <h3 className="text-lg font-semibold mb-4">Récapitulatif</h3>
            <div className="space-y-3">
              {cartItems.map((item) => (
                <div key={item.product.id} className="flex justify-between text-sm">
                  <span>{item.product.name} x{item.quantity}</span>
                  <span>{(item.product.price * item.quantity).toFixed(2)}€</span>
                </div>
              ))}
            </div>
            <div className="border-t mt-4 pt-4">
              <div className="flex justify-between font-bold text-lg">
                <span>Total:</span>
                <span className="text-blue-900">{totalPrice.toFixed(2)}€</span>
              </div>
            </div>
          </div>

          {/* Forms */}
          <div className="flex-1 p-6">
            {step === 'customer' && (
              <form onSubmit={handleCustomerSubmit} className="space-y-6">
                <div className="flex items-center space-x-4 mb-6">
                  <button
                    type="button"
                    onClick={() => setCustomer(prev => ({ ...prev, isGuest: true }))}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                      customer.isGuest ? 'bg-blue-900 text-white' : 'bg-white text-gray-700'
                    }`}
                  >
                    <Mail className="w-4 h-4" />
                    <span>Commande invité</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setCustomer(prev => ({ ...prev, isGuest: false }))}
                    className={`flex items-center space-x-2 px-4 py-2 rounded-lg border ${
                      !customer.isGuest ? 'bg-blue-900 text-white' : 'bg-white text-gray-700'
                    }`}
                  >
                    <User className="w-4 h-4" />
                    <span>Créer un compte</span>
                  </button>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={customer.email}
                    onChange={(e) => setCustomer(prev => ({ ...prev, email: e.target.value }))}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="votre@email.com"
                  />
                </div>

                {!customer.isGuest && (
                  <>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Prénom
                        </label>
                        <input
                          type="text"
                          value={customer.firstName}
                          onChange={(e) => setCustomer(prev => ({ ...prev, firstName: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Nom
                        </label>
                        <input
                          type="text"
                          value={customer.lastName}
                          onChange={(e) => setCustomer(prev => ({ ...prev, lastName: e.target.value }))}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </>
                )}

                <button
                  type="submit"
                  className="w-full bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors duration-300"
                >
                  Continuer vers le paiement
                </button>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Code promo"
                  value={coupon}
                  onChange={(e)=>setCoupon(e.target.value)}
                  className="md:col-span-2 p-3 border rounded-lg"
                />
                <button type="button" onClick={async ()=>{ await validatePromo(); const form = (document.querySelector('form') as HTMLFormElement); if(form) form.requestSubmit(); }} className="bg-gray-900 text-white py-3 rounded-lg">Appliquer & Payer</button>
              </div>
            </form>
            )}

            {step === 'payment' && (
              <form onSubmit={handlePaymentSubmit} className="space-y-6">
                <div className="mb-6">
                  <h3 className="text-lg font-semibold mb-4">Méthode de paiement</h3>
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentMethod === 'card'}
                        onChange={(e) => setPaymentMethod(e.target.value as 'card')}
                        className="text-blue-900"
                      />
                      <CreditCard className="w-5 h-5" />
                      <span>Carte bancaire</span>
                    </label>
                    <label className="flex items-center space-x-3 p-3 border rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="paypal"
                        checked={paymentMethod === 'paypal'}
                        onChange={(e) => setPaymentMethod(e.target.value as 'paypal')}
                        className="text-blue-900"
                      />
                      <span className="text-blue-600 font-bold">PayPal</span>
                    </label>
                  </div>
                </div>

                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Numéro de carte
                      </label>
                      <input
                        type="text"
                        placeholder="1234 5678 9012 3456"
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Date d'expiration
                        </label>
                        <input
                          type="text"
                          placeholder="MM/AA"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          CVV
                        </label>
                        <input
                          type="text"
                          placeholder="123"
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>
                  </div>
                )}

                <div className="flex space-x-4">
                  <button
                    type="button"
                    onClick={() => setStep('customer')}
                    className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-lg hover:bg-gray-300 transition-colors duration-300"
                  >
                    Retour
                  </button>
                  <button
                    type="submit"
                    className="flex-1 bg-blue-900 text-white py-3 rounded-lg hover:bg-blue-800 transition-colors duration-300"
                  >
                    Payer avec Stripe
                  </button>
                </div>
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-3">
                <input
                  type="text"
                  placeholder="Code promo"
                  value={coupon}
                  onChange={(e)=>setCoupon(e.target.value)}
                  className="md:col-span-2 p-3 border rounded-lg"
                />
                <button type="button" onClick={async ()=>{ await validatePromo(); const form = (document.querySelector('form') as HTMLFormElement); if(form) form.requestSubmit(); }} className="bg-gray-900 text-white py-3 rounded-lg">Appliquer & Payer</button>
              </div>
            </form>
            )}
          </div>
        </div>
      </div>
      {loading && (
        <div className="fixed inset-0 z-[9999] bg-black/50 backdrop-blur-sm flex items-center justify-center">
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-xl w-[320px]">
            <div className="animate-pulse h-4 w-28 bg-gray-300 dark:bg-neutral-700 rounded mb-3"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-200 dark:bg-neutral-800 rounded w-full animate-pulse"></div>
              <div className="h-3 bg-gray-200 dark:bg-neutral-800 rounded w-5/6 animate-pulse"></div>
              <div className="h-3 bg-gray-200 dark:bg-neutral-800 rounded w-3/4 animate-pulse"></div>
            </div>
            <div className="mt-5 text-sm text-gray-600 dark:text-neutral-400">Redirection vers Stripe…</div>
          </div>
        </div>
      )}
    </div>
  );
}