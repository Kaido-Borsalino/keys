export type Product = {
  id: string;
  title: string;
  description: string;
  price: number; // EUR
  image?: string;
  category: "Windows" | "Office";
};

export const products: Product[] = [
  {
    id: "win11-pro",
    title: "Windows 11 Pro – Clé officielle",
    description: "Activation en ligne • 1 PC • Livraison immédiate par email",
    price: 19.99,
    image: "/windows-key.png",
    category: "Windows",
  },
  {
    id: "win10-pro",
    title: "Windows 10 Pro – Clé officielle",
    description: "Activation en ligne • 1 PC • Livraison immédiate par email",
    price: 14.99,
    image: "/windows-key.png",
    category: "Windows",
  },
  {
    id: "office-2021-pro",
    title: "Office 2021 Professionnel Plus",
    description: "Word, Excel, PowerPoint, Outlook… • 1 PC",
    price: 29.99,
    image: "/windows-key.png",
    category: "Office",
  },
  {
    id: "office-2019-pro",
    title: "Office 2019 Professionnel Plus",
    description: "Word, Excel, PowerPoint, Outlook… • 1 PC",
    price: 24.99,
    image: "/windows-key.png",
    category: "Office",
  },
];
