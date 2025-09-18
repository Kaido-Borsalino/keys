export type Product = {
  id: string;
  title: string;
  description: string;
  price: number;    // EUR
  image: string;    // chemin public
  category: "Windows 11" | "Windows 10" | "Office" | "Antivirus";
};

export const products: Product[] = [
  // Windows 11
  {
    id: "win11-pro",
    title: "Windows 11 Pro — Clé officielle",
    description: "Activation en ligne • 1 PC • Livraison immédiate par email",
    price: 19.99,
    image: "/windows11.svg",
    category: "Windows 11",
  },
  {
    id: "win11-home",
    title: "Windows 11 Home — Clé officielle",
    description: "Activation en ligne • 1 PC • Livraison immédiate par email",
    price: 16.99,
    image: "/windows11.svg",
    category: "Windows 11",
  },

  // Windows 10
  {
    id: "win10-pro",
    title: "Windows 10 Pro — Clé officielle",
    description: "Toujours activable • 1 PC • Livraison immédiate par email",
    price: 14.99,
    image: "/windows10.svg",
    category: "Windows 10",
  },
  {
    id: "win10-home",
    title: "Windows 10 Home — Clé officielle",
    description: "Toujours activable • 1 PC • Livraison immédiate par email",
    price: 12.99,
    image: "/windows10.svg",
    category: "Windows 10",
  },

  // Office
  {
    id: "office-2021-pro",
    title: "Office 2021 Professionnel Plus",
    description: "Word, Excel, PowerPoint, Outlook… • 1 PC",
    price: 29.99,
    image: "/office.svg",
    category: "Office",
  },
  {
    id: "office-2019-pro",
    title: "Office 2019 Professionnel Plus",
    description: "Suite complète • 1 PC",
    price: 24.99,
    image: "/office.svg",
    category: "Office",
  },

  // Antivirus
  {
    id: "av-bitdefender",
    title: "Bitdefender — 1 an / 1 appareil",
    description: "Protection complète, faible impact système",
    price: 11.99,
    image: "/antivirus.svg",
    category: "Antivirus",
  },
  {
    id: "av-kaspersky",
    title: "Kaspersky — 1 an / 1 appareil",
    description: "Détection reconnue, protection web",
    price: 10.99,
    image: "/antivirus.svg",
    category: "Antivirus",
  },
];
