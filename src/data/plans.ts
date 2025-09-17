
export type Addon = { id: string; label: string; price: number; };
export type Plan = {
  slug: 'basics' | 'standard' | 'premium';
  name: string;
  description: string;
  basePrice: number;
  addons: Addon[];
};

export const plans: Plan[] = [
  {
    slug: 'basics',
    name: 'Basics',
    description: 'Pack d’entrée pour démarrer rapidement.',
    basePrice: 49.99,
    addons: [
      { id: 'install', label: 'Installation & configuration', price: 19.0 },
      { id: 'support7', label: 'Support 7j/7 par email', price: 9.0 },
      { id: 'backup', label: 'Mise en place de sauvegardes', price: 12.0 },
    ],
  },
  {
    slug: 'standard',
    name: 'Standard',
    description: 'Le meilleur équilibre fonctionnalités / prix.',
    basePrice: 99.99,
    addons: [
      { id: 'priority', label: 'Support prioritaire', price: 15.0 },
      { id: 'monitoring', label: 'Monitoring & alertes', price: 18.0 },
      { id: 'migrate', label: 'Migration de données', price: 25.0 },
    ],
  },
  {
    slug: 'premium',
    name: 'Premium',
    description: 'Pour les besoins exigeants et pro.',
    basePrice: 199.99,
    addons: [
      { id: 'dedicated', label: 'Gestionnaire dédié', price: 49.0 },
      { id: 'sla', label: 'SLA 99.9%', price: 39.0 },
      { id: 'training', label: 'Formation utilisateur 2h', price: 59.0 },
    ],
  },
];
