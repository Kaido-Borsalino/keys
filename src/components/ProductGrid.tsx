import { products } from "../data/products";
import { addToCart } from "../store/cart";

export default function ProductGrid() {
  return (
    <section id="boutique" className="py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Clés Windows & Office</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {products.map((p) => (
            <div
              key={p.id}
              className="rounded-xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-neutral-800 p-5"
            >
              {p.image && (
                <img
                  src={p.image}
                  alt={p.title}
                  className="h-28 object-contain mb-4 mx-auto"
                />
              )}
              <div className="text-xs uppercase tracking-wide text-gray-500 dark:text-gray-300">
                {p.category}
              </div>
              <h3 className="text-lg font-semibold mt-1">{p.title}</h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                {p.description}
              </p>
              <div className="mt-4 flex items-center justify-between">
                <div className="text-2xl font-extrabold">{p.price.toFixed(2)}€</div>
                <button
                  onClick={() => {
                    addToCart({ id: p.id, title: p.title, price: p.price, qty: 1 });
                    window.dispatchEvent(
                      new CustomEvent("toast:ok", { detail: "Ajouté au panier" })
                    );
                  }}
                  className="bg-blue-900 text-white px-4 py-2 rounded-lg hover:bg-blue-800"
                >
                  Acheter
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
