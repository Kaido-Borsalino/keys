
import React, { useMemo, useState } from 'react';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';

const DATA = [
  { q: 'Quand recevrai-je ma clé ?', a: 'Immédiatement après paiement, vous recevez un email avec la facture. Les clés logicielles sont envoyées rapidement (selon le produit).' },
  { q: 'Comment activer ma licence ?', a: 'Nous indiquons les étapes d’activation sur la page produit. En cas de doute, contactez le support.' },
  { q: 'Quels moyens de paiement acceptez-vous ?', a: 'Cartes bancaires via Stripe (Visa, Mastercard...).' },
  { q: 'Puis-je être remboursé ?', a: 'Les licences logicielles sont des produits numériques. Après activation, elles ne sont pas remboursables.' },
  { q: 'Avez-vous un support client ?', a: 'Oui, via email. Nous répondons en général sous 24h ouvrées.' }
];

export default function FAQ() {
  const [q, setQ] = useState('');
  const items = useMemo(()=>{
    const s = q.trim().toLowerCase();
    if (!s) return DATA;
    return DATA.filter(it => (it.q+it.a).toLowerCase().includes(s));
  }, [q]);

  return (
    <div className="min-h-screen bg-white dark:bg-neutral-950 dark:text-neutral-100">
      <div className="container mx-auto px-4 py-16 max-w-3xl">
        <h1 className="text-3xl font-bold mb-6">FAQ</h1>
        <input
          value={q}
          onChange={(e)=>setQ(e.target.value)}
          placeholder="Rechercher une question..."
          className="w-full p-3 rounded-lg border mb-6 dark:bg-neutral-900 dark:border-white/10"
        />
        <div className="divide-y dark:divide-white/10">
          <AnimatePresence initial={false}>
            {items.map((x, i)=>(
              <motion.details
                key={x.q}
                className="py-4 group"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
              >
                <summary className="cursor-pointer font-semibold group-open:text-blue-900 dark:group-open:text-blue-300">
                  {x.q}
                </summary>
                <motion.p
                  className="mt-2 text-gray-600 dark:text-neutral-300"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                >
                  {x.a}
                </motion.p>
              </motion.details>
            ))}
          </AnimatePresence>
        </div>
      </div>
      <Footer />
    </div>
  );
}
