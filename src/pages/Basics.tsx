import { useMemo, useState } from "react";
import { addToCart } from "../store/cart";

const BASE_PRICE = 49.99;
const OPTIONS = [
  { id: "install", label: "Installation & configuration", price: 19.0 },
  { id: "support", label: "Support 7j/7 par email", price: 9.0 },
  { id: "backup", label: "Mise en place de sauvegardes", price: 12.0 },
];

export default function Basics() {
  const [selected, setSelected] = useState<string[]>([]);
  const total = useMemo(
    () =>
      BASE_PRICE +
      selected.reduce((sum, id) => sum + (OPTIONS.find((o) => o.id === id)?.price || 0), 0),
    [selected]
  );

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 dark:text-neutral-100">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-extrabold">Basics</h1>
        <p className="text-gray-600 dark:text-neutral-300 mt-2">
          Pack d’entrée pour démarrer rapidement.
        </p>

        {/* Résumé prix */}
        <div className="mt-6 bg-white dark:bg-neutral-800 rounded-xl p-6 ring-1 ring-black/5 dark:ring-white/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 dark:text-neutral-300">Prix de base</div>
              <div className="text-3xl font-extrabold text-gray-900 dark:text-neutral-100">
                {BASE_PRICE.toFixed(2)}€
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-neutral-300">Total</div>
              <div className="text-3xl font-extrabold text-gray-900 dark:text-neutral-100">
                {total.toFixed(2)}€
              </div>
            </div>
          </div>
        </div>

        {/* Options */}
        <h2 className="mt-8 text-2xl font-bold">Options</h2>
        <div className="mt-3 space-y-3">
          {OPTIONS.map((opt) => (
            <label
              key={opt.id}
              className="flex items-center justify-between bg-gray-50 dark:bg-neutral-800/60 p-4 rounded-lg ring-1 ring-black/5 dark:ring-white/10 cursor-pointer"
            >
              <div className="flex items-center gap-3">
                <input
                  type="checkbox"
                  className="w-5 h-5 accent-blue-900 rounded"
                  checked={selected.includes(opt.id)}
                  onChange={() => toggle(opt.id)}
                />
                <span className="text-gray-900 dark:text-neutral-100">{opt.label}</span>
              </div>
              <span className="text-gray-700 dark:text-neutral-200">
                + {opt.price.toFixed(2)}€
              </span>
            </label>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <button
            onClick={() => {
              const title =
                "Pack Basics" +
                (selected.length
                  ? " (" +
                    selected
                      .map((id) => OPTIONS.find((o) => o.id === id)?.label)
                      .filter(Boolean)
                      .join(", ") +
                    ")"
                  : "");
              addToCart({ id: "pack-basics", title, price: total, qty: 1 });
              window.dispatchEvent(
                new CustomEvent("toast:ok", { detail: "Pack ajouté au panier" })
              );
            }}
            className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800"
          >
            Ajouter au panier
          </button>
          <a href="/" className="px-6 py-3 rounded-lg border">
            Retour
          </a>
        </div>
      </div>
    </div>
  );
}
