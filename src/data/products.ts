import { Product } from '../types';

export const products: Product[] = [
  // Windows
  {
    id: 'win10-home',
    name: 'Windows 10 Home',
    price: 29.99,
    category: 'windows',
    description: 'Licence authentique Windows 10 Home - Activation à vie',
    image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'win10-pro',
    name: 'Windows 10 Pro',
    price: 49.99,
    category: 'windows',
    description: 'Licence authentique Windows 10 Pro - Fonctionnalités avancées',
    image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'win11-home',
    name: 'Windows 11 Home',
    price: 39.99,
    category: 'windows',
    description: 'Licence authentique Windows 11 Home - Dernière version',
    image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'win11-pro',
    name: 'Windows 11 Pro',
    price: 59.99,
    category: 'windows',
    description: 'Licence authentique Windows 11 Pro - Version professionnelle',
    image: 'https://images.unsplash.com/photo-1633419461186-7d40a38105ec?auto=format&fit=crop&q=80&w=400'
  },
  
  // Office
  {
    id: 'office365-personal',
    name: 'Office 365 Personnel',
    price: 69.99,
    category: 'office',
    description: 'Abonnement Office 365 pour 1 utilisateur - 1 an',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'office365-family',
    name: 'Office 365 Famille',
    price: 99.99,
    category: 'office',
    description: 'Abonnement Office 365 pour 6 utilisateurs - 1 an',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'office2021-pro',
    name: 'Office 2021 Pro',
    price: 149.99,
    category: 'office',
    description: 'Suite Office 2021 Professional - Licence à vie',
    image: 'https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=400'
  },
  
  // Games
  {
    id: 'steam-card-20',
    name: 'Carte Steam 20€',
    price: 20.00,
    category: 'games',
    description: 'Carte cadeau Steam de 20€ - Livraison instantanée',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'steam-card-50',
    name: 'Carte Steam 50€',
    price: 50.00,
    category: 'games',
    description: 'Carte cadeau Steam de 50€ - Livraison instantanée',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400'
  },
  {
    id: 'game-key-cod',
    name: 'Call of Duty - Clé Steam',
    price: 39.99,
    category: 'games',
    description: 'Clé d\'activation Steam pour Call of Duty',
    image: 'https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&q=80&w=400'
  }
];