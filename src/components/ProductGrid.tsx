import { products } from "../data/products";
import { addToCart } from "../cart";

const currency = (n: number) => `${n.toFixed(2)}€`;

export default function ProductGrid() {
  const cats = ["Windows 11", "Windows 10", "Office", "Antivirus"] as const;

  return (
    <section id="boutique" className="py-20 bg-gray-50 dark:bg-neutral-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center mb-10">
          Clés officielles & logiciels
        </h2>

        {cats.map((cat) => {
          const list = products.filter((p) => p.category === cat);
          return (
            <div key={cat} className="mb-12">
              <div className="flex items-end justify-between mb-4">
                <h3 className="text-xl font-bold">{cat}</h3>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {list.map((p) => (
                  <article
                    key={p.id}
                    className="rounded-xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-neutral-800 overflow-hidden flex flex-col"
                  >
                    <img src={p.image} alt={p.title} className="h-36 w-full object-contain bg-blue-50/40 dark:bg-neutral-800/50" />
                    <div className="p-5 flex flex-col gap-2 flex-1">
                      <h4 className="font-semibold">{p.title}</h4>
                      <p className="text-sm text-gray-600 dark:text-neutral-300 flex-1">
                        {p.description}
                      </p>
                      <div className="mt-2 flex items-center justify-between">
                        <div className="text-2xl font-extrabold">{currency(p.price)}</div>
                        <button
                          onClick={() => {
                            addToCart({ id: p.id, title: p.title, price: p.price, qty: 1 });
                            window.dispatchEvent(new CustomEvent("toast:ok", { detail: "Ajouté au panier" }));
                          }}
                          className="px-4 py-2 rounded-lg bg-blue-900 text-white hover:bg-blue-800"
                        >
                          Acheter
                        </button>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
