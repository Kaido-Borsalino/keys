import React from "react";
import { Link } from "react-router-dom";
import ProductGrid from "./components/ProductGrid";
import CartBadge from "./components/CartBadge";
import Toast from "./components/Toast";
import ThemeToggle from "./components/ThemeToggle";
import Footer from "./components/Footer";

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
            <a href="#boutique" className="hover:text-blue-200">Boutique</a>
            <Link to="/faq" className="hover:text-blue-200">FAQ</Link>
          </div>

          <div className="flex items-center gap-2">
            <div className="hidden md:block">
              <ThemeToggle />
            </div>
            <div className="relative p-2 hover:bg-blue-800 rounded-lg transition-colors">
              <a href="/#panier" aria-label="Panier">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor"><path d="M7 4h-2l-1 2h2l3.6 7.59-1.35 2.44A2 2 0 0 0 10 19h9v-2h-9l1.1-2h6.45a2 2 0 0 0 1.79-1.11l3.58-7.16A1 1 0 0 0 21 4H7Z"/></svg>
              </a>
              <CartBadge />
            </div>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section id="hero" className="bg-gradient-to-b from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Clés Windows & Office officielles à prix malin
            </h1>
            <p className="mt-4 text-blue-100 text-lg">
              Paiement sécurisé, facture immédiate, livraison rapide par email.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="#tarifs" className="bg-white text-blue-900 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50">
                Voir nos packs
              </a>
              <a href="#boutique" className="border border-white/40 px-6 py-3 rounded-lg hover:bg-white/10">
                Boutique Windows/Office
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 -rotate-6 bg-white/10 rounded-2xl blur-md"></div>
            <div className="relative bg-white/10 backdrop-blur p-4 rounded-2xl">
              <img src="/windows-hero.png" alt="Mockup Windows / Office" className="rounded-xl shadow-2xl" />
            </div>
          </div>
        </div>
      </section>

      {/* Tarifs (exemple simple – tes cartes existantes) */}
      <section id="tarifs" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Nos packs</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="rounded-xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-neutral-800 p-6">
              <h3 className="text-xl font-bold">Basics</h3>
              <div className="text-4xl font-extrabold mt-1">49.99€</div>
              <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-neutral-300">
                <li>✅ Installation / configuration</li>
                <li>✅ Assistance initiale</li>
              </ul>
              <Link to="/pricing/basics" className="mt-6 inline-flex w-full justify-center py-3 px-4 rounded-lg font-semibold bg-blue-900 text-white hover:bg-blue-800">
                Voir le pack
              </Link>
            </div>

            <div className="rounded-xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-neutral-800 p-6">
              <h3 className="text-xl font-bold">Standard</h3>
              <div className="text-4xl font-extrabold mt-1">99.99€</div>
              <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-neutral-300">
                <li>✅ Diagnostic avancé</li>
                <li>✅ Support prioritaire</li>
              </ul>
              <Link to="/pricing/standard" className="mt-6 inline-flex w-full justify-center py-3 px-4 rounded-lg font-semibold bg-blue-900 text-white hover:bg-blue-800">
                Voir le pack
              </Link>
            </div>

            <div className="rounded-xl ring-1 ring-black/5 dark:ring-white/10 bg-white dark:bg-neutral-800 p-6">
              <h3 className="text-xl font-bold">Premium</h3>
              <div className="text-4xl font-extrabold mt-1">149.99€</div>
              <ul className="mt-3 space-y-2 text-sm text-gray-700 dark:text-neutral-300">
                <li>✅ Accompagnement complet</li>
                <li>✅ Priorité + suivi dédié</li>
              </ul>
              <Link to="/pricing/premium" className="mt-6 inline-flex w-full justify-center py-3 px-4 rounded-lg font-semibold bg-blue-900 text-white hover:bg-blue-800">
                Voir le pack
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Boutique */}
      <ProductGrid />

      <Footer />
      <Toast />
    </div>
  );
}
