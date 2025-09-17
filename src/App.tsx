import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
// Si tu ne vois pas les icônes, supprime l'import "lucide-react" et les <Key/> / <ShoppingCart/>
import { Key, ShoppingCart } from "lucide-react";

import ThemeToggle from "./components/ThemeToggle";
import Footer from "./components/Footer";

/** Carte tarifs animée */
type PriceCardProps = {
  title: string;
  price: string;
  features: string[];
  featured?: boolean;
  href?: string;
};

function PriceCard({ title, price, features, featured = false, href }: PriceCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6, scale: 1.01 }}
      className={`group relative overflow-hidden ${
        featured ? "bg-blue-900 text-white" : "bg-white text-gray-900"
      } rounded-xl shadow-lg ring-1 ring-black/5 hover:shadow-2xl transition duration-300`}
    >
      {featured && (
        <div className="absolute top-3 right-3 bg-yellow-300 text-yellow-900 text-xs font-bold px-2 py-1 rounded">
          Populaire
        </div>
      )}

      <div className="p-6">
        <h3 className="text-xl font-bold">{title}</h3>
        <div className="mt-1 text-4xl font-extrabold">{price}</div>

        <ul className="mt-4 space-y-2 text-sm">
          {features.map((f, i) => (
            <li key={i} className="flex items-start gap-2">
              <span>✅</span>
              <span>{f}</span>
            </li>
          ))}
        </ul>

        {href && (
          <Link
            to={href}
            className={`mt-6 inline-flex w-full justify-center py-3 px-4 rounded-lg font-semibold ${
              featured
                ? "bg-white text-blue-900 hover:bg-blue-50"
                : "bg-blue-900 text-white hover:bg-blue-800"
            }`}
          >
            Choisir
          </Link>
        )}
      </div>
    </motion.div>
  );
}

export default function App() {
  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-neutral-950 text-neutral-900 dark:text-neutral-100">
      {/* Navbar */}
      <nav className="sticky top-0 z-30 bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src="/logo.svg" alt="SpeedKeyShop91" className="w-8 h-8 rounded" />
            <span className="text-xl font-bold">SpeedKeyShop91</span>
          </div>

          <div className="hidden md:flex items-center gap-6">
            <a href="#hero" className="hover:text-blue-200">Accueil</a>
            <a href="#tarifs" className="hover:text-blue-200">Nos tarifs</a>
            <Link to="/faq" className="hover:text-blue-200">FAQ</Link>
            <Link to="/account" className="hover:text-blue-200">Mon compte</Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <Link to="/#panier" className="relative p-2 hover:bg-blue-800 rounded-lg transition-colors">
              <ShoppingCart className="w-6 h-6" />
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section (modern) */}
      <section id="hero" className="bg-gradient-to-b from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Clés logicielles officielles à prix malin
            </h1>
            <p className="mt-4 text-blue-100 text-lg">
              Paiement sécurisé, facture immédiate, livraison rapide par email.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="#tarifs" className="bg-white text-blue-900 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50">
                Voir nos packs
              </a>
              <a href="#how" className="border border-white/40 px-6 py-3 rounded-lg hover:bg-white/10">
                Comment ça marche ?
              </a>
            </div>
            <div className="mt-6 flex items-center gap-6 text-sm text-blue-100">
              <div>🔒 Stripe sécurisé</div>
              <div>⚡ Livraison rapide</div>
              <div>💬 Support 24h ouvrées</div>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -rotate-6 bg-white/10 rounded-2xl blur-md"></div>
            <div className="relative bg-white/10 backdrop-blur p-4 rounded-2xl">
              <img
                src="https://images.unsplash.com/photo-1611162618071-b39a2ec1b4b6?auto=format&fit=crop&q=80&w=900"
                alt="Mockup Windows / Office"
                className="rounded-xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="py-20 bg-gray-50 dark:bg-neutral-900 dark:text-neutral-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Comment ça marche ?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
              <div className="text-2xl font-bold mb-2">1. Choisissez</div>
              <p>Sélectionnez une licence ou un pack dans la boutique ou nos tarifs.</p>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
              <div className="text-2xl font-bold mb-2">2. Payez</div>
              <p>Paiement sécurisé par Stripe. Les remises s’appliquent si vous avez un code.</p>
            </div>
            <div className="bg-white dark:bg-neutral-800 rounded-xl p-6 shadow-sm ring-1 ring-black/5 dark:ring-white/10">
              <div className="text-2xl font-bold mb-2">3. Recevez</div>
              <p>Vous recevez immédiatement votre facture par email. Les clés suivent (selon produit).</p>
            </div>
          </div>
        </div>
      </section>

      {/* Tarifs */}
      <section id="tarifs" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Nos packs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <PriceCard
              title="Basics"
              price="49€"
              features={[
                "Installation / configuration",
                "Assistance initiale",
                "Email de suivi",
              ]}
              href="/pricing/basics"
            />
            <PriceCard
              title="Standard"
              price="99€"
              features={[
                "Diagnostic avancé",
                "Réparation logicielle",
                "Support prioritaire",
              ]}
              featured
              href="/pricing/standard"
            />
            <PriceCard
              title="Premium"
              price="149€"
              features={[
                "Accompagnement complet",
                "Optimisations",
                "Priorité + suivi dédié",
              ]}
              href="/pricing/premium"
            />
          </div>
        </div>
      </section>

      {/* Témoignages */}
      <section id="temoignages" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Ils nous font confiance</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-neutral-900 border dark:border-white/10 rounded-xl p-6 shadow-sm">
              <p className="italic">“Clé reçue très vite, activation nickel. Prix imbattables.”</p>
              <div className="mt-4 font-semibold">— Karim B.</div>
            </div>
            <div className="bg-white dark:bg-neutral-900 border dark:border-white/10 rounded-xl p-6 shadow-sm">
              <p className="italic">“Support réactif, facture propre, je recommande à 100%.”</p>
              <div className="mt-4 font-semibold">— Alice M.</div>
            </div>
            <div className="bg-white dark:bg-neutral-900 border dark:border-white/10 rounded-xl p-6 shadow-sm">
              <p className="italic">“Pack Premium + options, super clair et rapide.”</p>
              <div className="mt-4 font-semibold">— Hugo D.</div>
            </div>
          </div>

          <div className="mt-10 bg-gray-50 dark:bg-neutral-900 rounded-xl p-6 grid md:grid-cols-3 gap-4 text-center">
            <div>🔒 Paiement sécurisé Stripe</div>
            <div>⚡ Livraison rapide par email</div>
            <div>✅ Licences officielles</div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
