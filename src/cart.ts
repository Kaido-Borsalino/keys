// src/cart.ts

export type CartItem = { id: string; title: string; price: number; qty: number };

const KEY = "speedkeyshop-cart";

// Lire le panier depuis localStorage
function read(): CartItem[] {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

// Écrire dans localStorage
function write(items: CartItem[]) {
  localStorage.setItem(KEY, JSON.stringify(items));
  window.dispatchEvent(new CustomEvent("cart:update"));
}

// Récupérer le panier complet
export function getCart(): CartItem[] {
  return read();
}

// Compter le nombre total d’articles
export function getCount(): number {
  return read().reduce((n, it) => n + it.qty, 0);
}

// Ajouter un produit
export function addToCart(item: CartItem) {
  const items = read();
  const i = items.findIndex((x) => x.id === item.id);
  if (i >= 0) {
    items[i].qty += item.qty;
  } else {
    items.push(item);
  }
  write(items);
}

// Vider le panier
export function clearCart() {
  write([]);
}
