import React from 'react';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Monitor, Cpu, HardDrive, Shield, MessageCircle, Clock, ChevronRight, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Key, Lock, Settings, ShoppingCart, CreditCard } from 'lucide-react';
import { ProductCard } from './components/ProductCard';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import ThemeToggle from './components/ThemeToggle';
import { useCart } from './hooks/useCart';
import { products } from './data/products';
import { Product } from './types';

function App() {
  const {
    cartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    clearCart,
    getTotalPrice,
    getTotalItems
  } = useCart();

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'windows' | 'office' | 'games'>('all');
  const [showAddedToCart, setShowAddedToCart] = useState(false);
  const [addedProduct, setAddedProduct] = useState<Product | null>(null);

  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);

  const handleAddToCart = (product: Product) => {
    addToCart(product);
    setAddedProduct(product);
    setShowAddedToCart(true);
    setTimeout(() => {
      setShowAddedToCart(false);
      setAddedProduct(null);
    }, 3000);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    clearCart();
    alert('Commande confirmée ! Vous recevrez vos clés par email sous 24h.');
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-blue-900 text-white">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <img src="/logo.svg" alt="SpeedKeyShop" className="w-8 h-8 rounded" />
              <span className="font-bold tracking-wide">SpeedKeyShop</span>
              <Key className="w-8 h-8" />
              <span className="text-xl font-bold">SpeedKeyShop91</span>
            </motion.div>
            <div className="hidden md:flex space-x-6">
              <a href="#accueil" className="hover:text-blue-200">Accueil</a>
              <a href="#services" className="hover:text-blue-200">Services</a>
              <a href="#cles" className="hover:text-blue-200">Clés</a>
              <a href="#boutique" className="hover:text-blue-200">Boutique</a>
              <a href="#tarifs" className="hover:text-blue-200">Tarifs</a>
              <a href="#contact" className="hover:text-blue-200">Contact</a>
            </motion.div>
            <div className="hidden md:block mr-3"><ThemeToggle /></div>
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 hover:bg-blue-800 rounded-lg transition-colors duration-300"
            >
              <ShoppingCart className="w-6 h-6" />
              {getTotalItems() > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                  {getTotalItems()}
                </span>
              )}
            </button>
          </motion.div>
        </motion.div>
      </nav>

      {
      {/* Hero Section (modern) */}
      <section id="hero" className="bg-gradient-to-b from-blue-900 to-blue-700 text-white">
        <div className="container mx-auto px-4 py-24 grid md:grid-cols-2 gap-10 items-center">
          <div>
            <h1 className="text-4xl md:text-5xl font-extrabold leading-tight">
              Clés logicielles <span className="opacity-90">officielles</span> à prix malin
            </h1>
            <p className="mt-4 text-blue-100 text-lg">
              Paiement sécurisé, facture immédiate, livraison instantanée par email.
            </p>
            <div className="mt-8 flex gap-4">
              <a href="#tarifs" className="bg-white text-blue-900 font-semibold px-6 py-3 rounded-lg hover:bg-blue-50">Voir nos packs</a>
              <a href="#how" className="border border-white/40 px-6 py-3 rounded-lg hover:bg-white/10">Comment ça marche ?</a>
            </motion.div>
            <div className="mt-6 flex items-center gap-6 text-sm text-blue-100">
              <div>🔒 Stripe sécurisé</div>
              <div>⚡ Livraison instantanée</div>
              <div>💬 Support réactif</div>
            </motion.div>
          </motion.div>
          <div className="relative">
            <div className="absolute inset-0 -rotate-6 bg-white/10 rounded-2xl blur-md"></div>
            <div className="relative bg-white/10 backdrop-blur p-8 rounded-2xl">
              <div className="text-2xl font-semibold mb-2">Pack Standard</div>
              <div className="text-4xl font-extrabold mb-4">99€</div>
              <ul className="space-y-2 text-sm">
                <li>✅ Diagnostic avancé</li>
                <li>✅ Réparation logicielle</li>
                <li>✅ Support prioritaire</li>
              </ul>
            </motion.div>
          </motion.div>
        </motion.div>
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
    
      {/* Testimonials Section */}
      <section id="testimonials" className="bg-gray-50">
        <div className="container mx-auto px-4 py-20">
          <h2 className="text-3xl font-bold text-center mb-12">Ils nous font confiance</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-700">"Rapide et efficace, j'ai reçu ma clé en moins d'une minute !"</p>
              <div className="mt-4 font-semibold">— Julien, Paris</div>
            </motion.div>
            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-700">"Prix imbattables et facture immédiate, parfait pour mon entreprise."</p>
              <div className="mt-4 font-semibold">— Sarah, Lyon</div>
            </motion.div>
            <div className="bg-white p-6 rounded-xl shadow">
              <p className="text-gray-700">"Support client réactif, je recommande à 100%."</p>
              <div className="mt-4 font-semibold">— Ahmed, Marseille</div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
    
    /* Hero Section */}
      <section id="accueil" className="relative bg-blue-900 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl md:text-5xl font-bold mb-6">
                Clés Windows et Services Informatiques
              </h1>
              <p className="text-xl mb-8">
                Licences Windows, clés de jeux et expertise technique pour tous vos besoins
              </p>
              <a href="#contact" className="bg-white text-blue-900 px-8 py-3 rounded-full font-semibold hover:bg-blue-100 transition duration-300">
                Contactez-nous
              </a>
            </motion.div>
            <div className="hidden md:block">
              <img 
                src="https://images.unsplash.com/photo-1633419461186-7d40a38105ec?auto=format&fit=crop&q=80&w=2000" 
                alt="Windows et Licences" 
                className="rounded-lg shadow-xl"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Key Sales Section */}
      <section id="cles" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Licences et Clés</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Key />}
              title="Clés Windows"
              description="Licences Windows 10/11 authentiques et garanties"
            />
            <ServiceCard 
              icon={<Lock />}
              title="Clés Office"
              description="Suite Microsoft Office pour particuliers et entreprises"
            />
            <ServiceCard 
              icon={<Settings />}
              title="Clés de Jeux"
              description="Codes d'activation pour vos jeux préférés"
            />
          </motion.div>
          <div className="mt-12 bg-gray-50 p-8 rounded-lg">
            <h3 className="text-2xl font-semibold mb-6 text-center">Nos Produits</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="space-y-2">
                <h4 className="font-semibold text-center mb-4">Systèmes d'exploitation</h4>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Windows 10 Home</li>
                  <li>Windows 10 Pro</li>
                  <li>Windows 11 Home</li>
                  <li>Windows 11 Pro</li>
                </ul>
              </motion.div>
              <div className="space-y-2">
                <h4 className="font-semibold text-center mb-4">Logiciels Microsoft</h4>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Office 365 Personnel</li>
                  <li>Office 365 Famille</li>
                  <li>Office 2021 Pro</li>
                  <li>Microsoft Project</li>
                </ul>
              </motion.div>
              <div className="space-y-2">
                <h4 className="font-semibold text-center mb-4">Clés de Jeux</h4>
                <ul className="list-disc pl-5 text-gray-600">
                  <li>Jeux Steam</li>
                  <li>Jeux Origin</li>
                  <li>Jeux Battle.net</li>
                  <li>Cartes Steam</li>
                </ul>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Services Informatiques</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ServiceCard 
              icon={<Cpu />}
              title="Réparation Matérielle"
              description="Diagnostic et réparation de tous types d'ordinateurs et composants"
            />
            <ServiceCard 
              icon={<Shield />}
              title="Sécurité & Virus"
              description="Protection et nettoyage des logiciels malveillants"
            />
            <ServiceCard 
              icon={<HardDrive />}
              title="Récupération de Données"
              description="Restauration de vos données importantes perdues"
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Pricing Section */}
      <section id="tarifs" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Nos Tarifs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <PriceCard 
              title="Basic"
              price="49"
              href="/pricing/basics"
              features={[
                "Diagnostic complet",
                "Nettoyage basique",
                "Support email"
              ]}
            />
            <PriceCard 
              title="Standard"
              price="99"
              href="/pricing/standard"
              featured={true}
              features={[
                "Diagnostic avancé",
                "Réparation logicielle",
                "Support prioritaire",
                "Garantie 3 mois"
              ]}
            />
            <PriceCard 
              title="Premium"
              price="199"
              href="/pricing/premium"
              features={[
                "Service complet",
                "Réparation matérielle",
                "Support 24/7",
                "Garantie 6 mois"
              ]}
            />
          </motion.div>
        </motion.div>
      </section>

      {/* Shop Section */}
      <section id="boutique" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Boutique en ligne</h2>
          
          {/* Trust Badges */}
          <div className="bg-white p-6 rounded-lg shadow-md mb-8">
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <Shield className="w-8 h-8 text-green-600 mb-2" />
                <h4 className="font-semibold text-sm">Licences Authentiques</h4>
                <p className="text-xs text-gray-600">100% Originales</p>
              </motion.div>
              <div className="flex flex-col items-center">
                <Clock className="w-8 h-8 text-blue-600 mb-2" />
                <h4 className="font-semibold text-sm">Livraison Rapide</h4>
                <p className="text-xs text-gray-600">Sous 24h par email</p>
              </motion.div>
              <div className="flex flex-col items-center">
                <MessageCircle className="w-8 h-8 text-purple-600 mb-2" />
                <h4 className="font-semibold text-sm">Support 7j/7</h4>
                <p className="text-xs text-gray-600">Assistance gratuite</p>
              </motion.div>
              <div className="flex flex-col items-center">
                <Lock className="w-8 h-8 text-red-600 mb-2" />
                <h4 className="font-semibold text-sm">Paiement Sécurisé</h4>
                <p className="text-xs text-gray-600">SSL & Cryptage</p>
              </motion.div>
            </motion.div>
          </motion.div>

          {/* Category Filter */}
          <div className="flex justify-center mb-8">
            <div className="flex space-x-2 bg-white p-2 rounded-lg shadow-md">
              <div className="hidden md:block mr-3"><ThemeToggle /></div>
            <button
                onClick={() => setSelectedCategory('all')}
                className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                  selectedCategory === 'all' ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Tous
              </button>
              <div className="hidden md:block mr-3"><ThemeToggle /></div>
            <button
                onClick={() => setSelectedCategory('windows')}
                className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                  selectedCategory === 'windows' ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Windows
              </button>
              <div className="hidden md:block mr-3"><ThemeToggle /></div>
            <button
                onClick={() => setSelectedCategory('office')}
                className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                  selectedCategory === 'office' ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Office
              </button>
              <div className="hidden md:block mr-3"><ThemeToggle /></div>
            <button
                onClick={() => setSelectedCategory('games')}
                className={`px-4 py-2 rounded-md transition-colors duration-300 ${
                  selectedCategory === 'games' ? 'bg-blue-900 text-white' : 'text-gray-700 hover:bg-gray-100'
                }`}
              >
                Jeux
              </button>
            </motion.div>
          </motion.div>

          {/* Products Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onAddToCart={handleAddToCart}
              />
            ))}
          </motion.div>
        </motion.div>
      </section>

      {/* Trust & Testimonials Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Pourquoi nous faire confiance ?</h2>
          
          {/* Statistics */}
          <div className="grid md:grid-cols-4 gap-8 mb-16">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">5000+</div>
              <div className="text-gray-600">Clients satisfaits</div>
            </motion.div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">99.8%</div>
              <div className="text-gray-600">Taux de satisfaction</div>
            </motion.div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">24h</div>
              <div className="text-gray-600">Livraison moyenne</div>
            </motion.div>
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-900 mb-2">5 ans</div>
              <div className="text-gray-600">D'expérience</div>
            </motion.div>
          </motion.div>

          {/* Testimonials */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            <TestimonialCard 
              name="Marie L."
              rating={5}
              comment="Service impeccable ! J'ai reçu ma clé Windows 11 en moins de 2 heures. Installation parfaite, aucun problème."
            />
            <TestimonialCard 
              name="Pierre D."
              rating={5}
              comment="Très professionnel. Support réactif et clés authentiques. Je recommande vivement pour tous vos besoins en licences."
            />
            <TestimonialCard 
              name="Sophie M."
              rating={5}
              comment="Prix imbattables et service client au top. Ma clé Office fonctionne parfaitement. Merci SpeedKeyShop91 !"
            />
          </motion.div>

          {/* Guarantees */}
          <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white p-8 rounded-lg">
            <h3 className="text-2xl font-bold text-center mb-8">Nos Garanties</h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <Shield className="w-12 h-12 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Garantie Authenticité</h4>
                <p className="text-blue-100">Toutes nos licences sont 100% authentiques et légales</p>
              </motion.div>
              <div className="text-center">
                <Clock className="w-12 h-12 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Garantie Livraison</h4>
                <p className="text-blue-100">Livraison sous 24h ou remboursement intégral</p>
              </motion.div>
              <div className="text-center">
                <MessageCircle className="w-12 h-12 mx-auto mb-4" />
                <h4 className="font-semibold mb-2">Support à Vie</h4>
                <p className="text-blue-100">Assistance technique gratuite et illimitée</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Security & Certifications */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Sécurité & Certifications</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold mb-6">Vos données sont protégées</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <Lock className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Cryptage SSL 256-bit</h4>
                    <p className="text-gray-600">Toutes vos données sont cryptées et sécurisées</p>
                  </motion.div>
                </motion.div>
                <div className="flex items-start space-x-3">
                  <Shield className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Conformité RGPD</h4>
                    <p className="text-gray-600">Respect total de la réglementation européenne</p>
                  </motion.div>
                </motion.div>
                <div className="flex items-start space-x-3">
                  <Key className="w-6 h-6 text-green-600 mt-1" />
                  <div>
                    <h4 className="font-semibold">Partenaire Microsoft</h4>
                    <p className="text-gray-600">Revendeur agréé de licences Microsoft</p>
                  </motion.div>
                </motion.div>
              </motion.div>
            </motion.div>
            <div className="text-center">
              <div className="bg-white p-8 rounded-lg shadow-lg">
                <h4 className="text-xl font-semibold mb-4">Moyens de paiement sécurisés</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-100 p-4 rounded">
                    <CreditCard className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                    <p className="text-sm font-medium">Carte Bancaire</p>
                  </motion.div>
                  <div className="bg-gray-100 p-4 rounded">
                    <div className="w-8 h-8 mx-auto mb-2 bg-blue-600 rounded flex items-center justify-center">
                      <span className="text-white font-bold text-xs">PP</span>
                    </motion.div>
                    <p className="text-sm font-medium">PayPal</p>
                  </motion.div>
                </motion.div>
                <p className="text-xs text-gray-500 mt-4">Paiements protégés par cryptage SSL</p>
              </motion.div>
            </motion.div>
          </motion.div>
        </motion.div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Contactez-nous</h2>
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <form 
                action="https://formspree.io/f/xpznvqko" 
                method="POST"
                className="space-y-6"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">Nom</label>
                  <input 
                    type="text" 
                    name="name"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border" 
                  />
                </motion.div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Email</label>
                  <input 
                    type="email" 
                    name="email"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border" 
                  />
                </motion.div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea 
                    rows={4} 
                    name="message"
                    required
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 px-3 py-2 border"
                  ></textarea>
                </motion.div>
                <input type="hidden" name="_next" value="https://speedkeyshop91.boats" />
                <input type="hidden" name="_subject" value="Nouveau message depuis SpeedKeyShop91" />
                <div className="hidden md:block mr-3"><ThemeToggle /></div>
            <button type="submit" className="bg-blue-900 text-white px-6 py-2 rounded-md hover:bg-blue-800">
                  Envoyer
                </button>
              </form>
            </motion.div>
            <div className="space-y-6">
              <ContactInfo 
                icon={<Phone />}
                title="Téléphone"
                info="+33788803992"
              />
              <ContactInfo 
                icon={<Mail />}
                title="Email"
               info="speedkeyshop91@gmail.com"
              />
              <ContactInfo 
                icon={<MapPin />}
                title="Adresse"
                info="1 Avenue Balzac, 91380 Chilly-Mazarin"
              />
            </motion.div>
          </motion.div>
        </motion.div>
      </section>
      {/* Témoignages */}
      <section id="temoignages" className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-10">Ils nous font confiance</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white border rounded-xl p-6 shadow-sm">
              <p className="italic">“Clé reçue en 2 minutes, activation nickel. Prix imbattables.”</p>
              <div className="mt-4 font-semibold">— Karim B.</div>
            </div>
            <div className="bg-white border rounded-xl p-6 shadow-sm">
              <p className="italic">“Support réactif, facture propre, je recommande à 100%.”</p>
              <div className="mt-4 font-semibold">— Alice M.</div>
            </div>
            <div className="bg-white border rounded-xl p-6 shadow-sm">
              <p className="italic">“J’ai pris un pack Premium + options, super clair et rapide.”</p>
              <div className="mt-4 font-semibold">— Hugo D.</div>
            </div>
          </div>
          <div className="mt-10 bg-gray-50 rounded-xl p-6 grid md:grid-cols-3 gap-4 text-center">
            <div>🔒 Paiement sécurisé Stripe</div>
            <div>⚡ Livraison immédiate par email</div>
            <div>✅ Licences officielles</div>
          </div>
        </div>
      </section>
      {/* FAQ */}
      <section id="faq" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 max-w-3xl">
          <h2 className="text-3xl font-bold text-center mb-10">FAQ</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold">Comment vais-je recevoir ma clé ?</h3>
              <p>Votre clé logicielle est envoyée automatiquement par email quelques minutes après le paiement, avec la facture en pièce jointe.</p>
            </div>
            <div>
              <h3 className="font-semibold">Quels sont les délais de livraison ?</h3>
              <p>La livraison est immédiate. Si vous ne recevez rien, pensez à vérifier vos spams ou contactez notre support.</p>
            </div>
            <div>
              <h3 className="font-semibold">Puis-je être remboursé ?</h3>
              <p>Non. Les logiciels et clés d’activation numériques ne sont pas remboursables une fois envoyés.</p>
            </div>
            <div>
              <h3 className="font-semibold">Comment contacter le support ?</h3>
              <p>Vous pouvez nous écrire à support@votredomaine.com — nous répondons sous 24h ouvrées.</p>
            </div>
          </div>
        </div>
      </section>
    
    

      {/* Footer */}
      <footer className="bg-blue-900 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SpeedKeyShop91</h3>
              <p className="text-blue-200">Solutions professionnelles pour vos licences et besoins informatiques</p>
            </motion.div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Liens Rapides</h4>
              <ul className="space-y-2">
                <li><a href="#accueil" className="text-blue-200 hover:text-white">Accueil</a></li>
                <li><a href="#services" className="text-blue-200 hover:text-white">Services</a></li>
                <li><a href="#cles" className="text-blue-200 hover:text-white">Clés</a></li>
                <li><a href="#boutique" className="text-blue-200 hover:text-white">Boutique</a></li>
                <li><a href="#tarifs" className="text-blue-200 hover:text-white">Tarifs</a></li>
                <li><a href="#contact" className="text-blue-200 hover:text-white">Contact</a></li>
              </ul>
            </motion.div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Horaires</h4>
              <ul className="space-y-2 text-blue-200">
                <li>Lun-Ven: 9h-18h</li>
                <li>Samedi: 10h-16h</li>
                <li>Dimanche: Fermé</li>
              </ul>
            </motion.div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Suivez-nous</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-blue-200 hover:text-white"><Facebook /></a>
                <a href="#" className="text-blue-200 hover:text-white"><Twitter /></a>
                <a href="#" className="text-blue-200 hover:text-white"><Instagram /></a>
              </motion.div>
            </motion.div>
          </motion.div>
          <div className="border-t border-blue-800 mt-8 pt-8 text-center text-blue-200">
            <p>&copy; 2025 SpeedKeyShop91. Tous droits réservés.</p>
          </motion.div>
        </motion.div>
      </footer>

      {/* Cart */}
      <Cart
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={updateQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
        totalPrice={getTotalPrice()}
      />

      {/* Checkout */}
      <Checkout
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        totalPrice={getTotalPrice()}
        onOrderComplete={handleOrderComplete}
      />

      {/* Added to Cart Notification */}
      {showAddedToCart && addedProduct && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 animate-pulse">
          <div className="flex items-center space-x-2">
            <ShoppingCart className="w-5 h-5" />
            <span className="font-medium">
              {addedProduct.name} ajouté au panier !
            </span>
          </motion.div>
        </motion.div>
      )}
    </motion.div>
  );
}

function TestimonialCard({ name, rating, comment }: { name: string; rating: number; comment: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <div className="flex items-center mb-4">
        <div className="w-12 h-12 bg-blue-900 rounded-full flex items-center justify-center text-white font-bold">
          {name.charAt(0)}
        </motion.div>
        <div className="ml-4">
          <h4 className="font-semibold">{name}</h4>
          <div className="flex">
            {[...Array(rating)].map((_, i) => (
              <span key={i} className="text-yellow-400">★</span>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
      <p className="text-gray-600 italic">"{comment}"</p>
    </motion.div>
  );
}

function ServiceCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition duration-300">
      <div className="text-blue-900 mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </motion.div>
  );
}

function PriceCard({ title, price, features, featured = false, href }: { title: string; price: string; features: string[]; featured?: boolean }) {
  return (
    <motion.div whileHover={{scale:1.03}} whileTap={{scale:0.98}} className={`group relative overflow-hidden ${featured ? 'bg-blue-900 text-white' : 'bg-white'} p-6 rounded-xl shadow-lg ring-1 ring-black/5 hover:shadow-2xl hover:-translate-y-1 transition duration-300`}
    >>
      {featured && (<div className='absolute top-3 right-3 bg-yellow-300 text-yellow-900 text-xs font-bold px-2 py-1 rounded'>Populaire</div>)}
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <div className="text-3xl font-bold mb-4">{price}€</div>
      <ul className="space-y-2">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <ChevronRight className="w-4 h-4 mr-2" />
            {feature}
          </li>
        ))}
      </ul>
      <button className={`mt-6 w-full py-3 px-4 rounded-lg font-semibold group-hover:opacity-100 ${featured ? 'bg-white text-blue-900' : 'bg-blue-900 text-white'} hover:opacity-90 transition duration-300`}
    >>
        Choisir
      </button>
    </motion.div>
  );
}

function ContactInfo({ icon, title, info }: { icon: React.ReactNode; title: string; info: string }) {
  return (
    <div className="flex items-start space-x-4">
      <div className="text-blue-900">{icon}</div>
      <div>
        <h4 className="font-semibold">{title}</h4>
        <p className="text-gray-600">{info}</p>
      </motion.div>
    </motion.div>
  );
}

export default App;