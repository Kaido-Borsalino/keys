import { useEffect, useMemo, useState } from "react";
import { getCart, clearCart } from "../cart";

type Item = { id: string; title: string; price: number; qty: number };

export default function CartPage() {
  const [items, setItems] = useState<Item[]>([]);

  // recharge à l'ouverture + sur évènement global
  useEffect(() => {
    const load = () => setItems(getCart());
    load();
    const onUpdate = () => load();
    window.addEventListener("cart:update", onUpdate);
    return () => window.removeEventListener("cart:update", onUpdate);
  }, []);

  const total = useMemo(() => items.reduce((s, it) => s + it.price * it.qty, 0), [items]);

  const fmt = (n: number) => `${n.toFixed(2)}€`;

  const changeQty = (id: string, dir: 1 | -1) => {
    const next = items.map((it) =>
      it.id === id ? { ...it, qty: Math.max(1, it.qty + dir) } : it
    );
    localStorage.setItem("speedkeyshop-cart", JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("cart:update"));
  };

  const remove = (id: string) => {
    const next = items.filter((it) => it.id !== id);
    localStorage.setItem("speedkeyshop-cart", JSON.stringify(next));
    window.dispatchEvent(new CustomEvent("cart:update"));
  };

  const handleCheckout = async () => {
    // Sécurité simple: si les clés sont encore "dummy", on explique
    const pk = import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY;
    if (!pk || String(pk).includes("dummy")) {
      alert("Ajoute tes clés Stripe (test) dans Netlify pour activer le paiement.\nMenu: Site configuration → Environment variables.");
      return;
    }

    try {
      const res = await fetch("/.netlify/functions/create-checkout-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items }),
      });
      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || "Erreur inconnue");
      }
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch (e: any) {
      alert("Impossible de démarrer le paiement Stripe : " + (e?.message || e));
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 dark:text-neutral-100">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-3xl font-extrabold">Mon panier</h1>

        {!items.length ? (
          <div className="mt-8 rounded-xl p-6 ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-neutral-800">
            <p>Votre panier est vide.</p>
            <a href="/" className="inline-block mt-4 px-5 py-3 rounded-lg bg-blue-900 text-white hover:bg-blue-800">
              Continuer mes achats
            </a>
          </div>
        ) : (
          <>
            <div className="mt-6 space-y-3">
              {items.map((it) => (
                <div
                  key={it.id}
                  className="flex items-center justify-between rounded-xl p-4 ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-neutral-800"
                >
                  <div className="min-w-0">
                    <div className="font-semibold text-gray-900 dark:text-neutral-100 truncate">{it.title}</div>
                    <div className="text-sm text-gray-600 dark:text-neutral-300">{(it.price).toFixed(2)}€</div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => changeQty(it.id, -1)}
                      className="w-8 h-8 rounded border hover:bg-black/5 dark:hover:bg-white/10"
                      aria-label="Diminuer la quantité"
                    >−</button>
                    <div className="w-8 text-center">{it.qty}</div>
                    <button
                      onClick={() => changeQty(it.id, +1)}
                      className="w-8 h-8 rounded border hover:bg-black/5 dark:hover:bg-white/10"
                      aria-label="Augmenter la quantité"
                    >+</button>
                    <button
                      onClick={() => remove(it.id)}
                      className="ml-2 text-sm text-red-600 hover:underline"
                    >
                      Retirer
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-xl p-6 ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-neutral-800">
              <div className="flex items-center justify-between">
                <div className="text-sm text-gray-600 dark:text-neutral-300">Total TTC</div>
                <div className="text-2xl font-extrabold text-gray-900 dark:text-neutral-100">{fmt(total)}</div>
              </div>
              <div className="mt-4 flex gap-3">
                <button
                  onClick={handleCheckout}
                  className="px-6 py-3 rounded-lg bg-blue-900 text-white hover:bg-blue-800"
                >
                  Payer avec Stripe
                </button>
                <button
                  onClick={() => {
                    clearCart();
                    setItems([]);
                  }}
                  className="px-6 py-3 rounded-lg border"
                >
                  Vider le panier
                </button>
              </div>
              <p className="mt-3 text-xs text-gray-500 dark:text-neutral-400">
                Le paiement test fonctionnera dès que tes clés Stripe (mode test) seront ajoutées dans Netlify.
              </p>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
