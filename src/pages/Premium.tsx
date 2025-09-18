import { useMemo, useState } from "react";
import { addToCart } from "../cart";

// --- Config du pack ---
const BASE_PRICE = 149.99;
const OPTIONS = [
  { id: "vip", label: "Support VIP (24h)", price: 25.0 },
  { id: "full-migration", label: "Migration complète + sauvegarde", price: 29.0 },
  { id: "remote", label: "Prise en main à distance (1h)", price: 19.0 },
  { id: "security", label: "Durcissement sécurité + antivirus", price: 15.0 },
];

const fmt = (n: number) => `${n.toFixed(2)}€`;

export default function Premium() {
  const [selected, setSelected] = useState<string[]>([]);

  const total = useMemo(
    () =>
      BASE_PRICE +
      selected.reduce(
        (sum, id) => sum + (OPTIONS.find((o) => o.id === id)?.price || 0),
        0
      ),
    [selected]
  );

  const toggle = (id: string) =>
    setSelected((s) => (s.includes(id) ? s.filter((x) => x !== id) : [...s, id]));

  const handleAddToCart = () => {
    const title =
      "Pack Premium" +
      (selected.length
        ? " (" +
          selected
            .map((id) => OPTIONS.find((o) => o.id === id)?.label)
            .filter(Boolean)
            .join(", ") +
          ")"
        : "");

    addToCart({ id: "pack-premium", title, price: total, qty: 1 });
    alert("✅ Pack Premium ajouté au panier !");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 dark:text-neutral-100">
      <div className="container mx-auto px-4 py-12 max-w-3xl">
        <h1 className="text-4xl font-extrabold">Premium</h1>
        <p className="text-gray-600 dark:text-neutral-300 mt-2">
          Accompagnement complet, prioritaire et personnalisé.
        </p>

        {/* Carte prix */}
        <div className="mt-6 bg-white dark:bg-neutral-800 rounded-xl p-6 ring-1 ring-black/5 dark:ring-white/10">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm text-gray-500 dark:text-neutral-300">Prix de base</div>
              <div className="text-3xl font-extrabold text-gray-900 dark:text-neutral-100">{fmt(BASE_PRICE)}</div>
            </div>
            <div className="text-right">
              <div className="text-sm text-gray-500 dark:text-neutral-300">Total</div>
              <div className="text-3xl font-extrabold text-gray-900 dark:text-neutral-100">{fmt(total)}</div>
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
              <span className="text-gray-700 dark:text-neutral-200">+ {fmt(opt.price)}</span>
            </label>
          ))}
        </div>

        {/* Actions */}
        <div className="mt-8 flex gap-4">
          <button onClick={handleAddToCart} className="bg-blue-900 text-white px-6 py-3 rounded-lg hover:bg-blue-800">
            Ajouter au panier
          </button>
          <a href="/" className="px-6 py-3 rounded-lg border">Retour</a>
        </div>
      </div>
    </div>
  );
}
