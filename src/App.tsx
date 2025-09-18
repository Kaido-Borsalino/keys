import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Key } from "lucide-react";
import CartBadge from "./components/CartBadge";
import ProductGrid from "./components/ProductGrid";

export default function App() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 dark:text-neutral-100">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-blue-900 text-white shadow-md">
        <div className="container mx-auto flex items-center justify-between px-4 py-4">
          {/* Logo */}
          <div className="flex items-center gap-2">
            <Key className="w-8 h-8 text-yellow-400" />
            <span className="text-xl font-bold">SpeedKeyShop91</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-6">
            <a href="#accueil" className="hover:text-blue-200">Accueil</a>
            <a href="#packs" className="hover:text-blue-200">Nos Packs</a>
            <a href="#boutique" className="hover:text-blue-200">Boutique</a>
            <Link to="/faq" className="hover:text-blue-200">FAQ</Link>
            <Link to="/cgv" className="hover:text-blue-200">CGV</Link>
            <Link to="/mentions-legales" className="hover:text-blue-200">Mentions légales</Link>
            <Link to="/confidentialite" className="hover:text-blue-200">Confidentialité</Link>

            {/* Panier */}
            <Link to="/cart" className="relative p-2 hover:bg-blue-800 rounded-lg transition-colors" aria-label="Panier">
              <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.44A2 2 0 0 0 10 19h9v-2h-9l1.1-2h6.45a2 2 0 0 0 1.79-1.11l3.58-7.16A1 1 0 0 0 21 4H7Z" />
              </svg>
              <CartBadge />
            </Link>
          </div>

          {/* Bouton mobile */}
          <button className="md:hidden p-2 rounded-lg hover:bg-blue-800" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            ☰
          </button>
        </div>

        {/* Menu mobile */}
        {mobileMenuOpen && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="md:hidden bg-blue-800 p-4 space-y-2">
            <a href="#accueil" className="block hover:text-blue-200">Accueil</a>
            <a href="#packs" className="block hover:text-blue-200">Nos Packs</a>
            <a href="#boutique" className="block hover:text-blue-200">Boutique</a>
            <Link to="/faq" className="block hover:text-blue-200">FAQ</Link>
            <Link to="/cgv" className="block hover:text-blue-200">CGV</Link>
            <Link to="/mentions-legales" className="block hover:text-blue-200">Mentions légales</Link>
            <Link to="/confidentialite" className="block hover:text-blue-200">Confidentialité</Link>
            <Link to="/cart" className="block hover:text-blue-200">Mon panier</Link>
          </motion.div>
        )}
      </nav>

      {/* HERO */}
      <section id="accueil" className="bg-gradient-to-b from-blue-900 to-blue-700 text-white py-24">
        <div className="container mx-auto grid md:grid-cols-2 gap-10 px-4 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Obtenez vos clés Windows & Office
              <span className="block text-yellow-400">au meilleur prix</span>
            </h1>
            <p className="mt-4 text-lg text-blue-100">Livraison immédiate après paiement, garantie 100% activation.</p>
            <a href="#packs" className="mt-6 inline-block px-6 py-3 bg-yellow-400 text-blue-900 font-bold rounded-lg shadow hover:bg-yellow-300 transition">Voir les packs</a>
          </div>
          <div className="flex justify-center">
            <img src="/windows-hero.svg" alt="Windows Hero" className="rounded-xl shadow-2xl" />
          </div>
        </div>
      </section>

      {/* PACKS */}
      <section id="packs" className="py-20 container mx-auto px-4">
        <h2 className="text-3xl font-extrabold text-center mb-12">Choisissez votre pack</h2>
        <div className="grid md:grid-cols-3 gap-8">
          <div className="rounded-xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-neutral-800 p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-neutral-100">Basics</h3>
            <p className="mt-2 text-gray-700 dark:text-neutral-300">Clé Windows simple & rapide</p>
            <div className="mt-4 text-2xl font-extrabold">29.99€</div>
            <Link to="/pricing/basics" className="mt-6 block px-6 py-3 text-center rounded-lg bg-blue-900 text-white hover:bg-blue-800">Détails</Link>
          </div>
          <div className="rounded-xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-neutral-800 p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-neutral-100">Standard</h3>
            <p className="mt-2 text-gray-700 dark:text-neutral-300">Windows + Office</p>
            <div className="mt-4 text-2xl font-extrabold">59.99€</div>
            <Link to="/pricing/standard" className="mt-6 block px-6 py-3 text-center rounded-lg bg-blue-900 text-white hover:bg-blue-800">Détails</Link>
          </div>
          <div className="rounded-xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-neutral-800 p-6">
            <h3 className="text-xl font-bold text-gray-900 dark:text-neutral-100">Premium</h3>
            <p className="mt-2 text-gray-700 dark:text-neutral-300">Windows + Office + Support</p>
            <div className="mt-4 text-2xl font-extrabold">99.99€</div>
            <Link to="/pricing/premium" className="mt-6 block px-6 py-3 text-center rounded-lg bg-blue-900 text-white hover:bg-blue-800">Détails</Link>
          </div>
        </div>
      </section>

      {/* BOUTIQUE */}
      <ProductGrid />

      {/* Teaser (optionnel) */}
      <section className="py-16">
        <div className="container mx-auto px-4 grid md:grid-cols-3 gap-6">
          <div className="rounded-xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-neutral-800 p-6">
            <h4 className="font-semibold text-lg">Livraison immédiate</h4>
            <p className="text-sm text-gray-600 dark:text-neutral-300 mt-1">Vos clés sont envoyées instantanément après paiement.</p>
          </div>
          <div className="rounded-xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-neutral-800 p-6">
            <h4 className="font-semibold text-lg">Paiement sécurisé</h4>
            <p className="text-sm text-gray-600 dark:text-neutral-300 mt-1">Stripe, cartes bancaires, protections anti-fraude.</p>
          </div>
          <div className="rounded-xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-neutral-800 p-6">
            <h4 className="font-semibold text-lg">Support sous 24h</h4>
            <p className="text-sm text-gray-600 dark:text-neutral-300 mt-1">Assistance en cas de problème d’activation.</p>
          </div>
        </div>
      </section>
    </div>
  );
}
