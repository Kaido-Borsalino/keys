export interface Product {
  id: string;
  name: string;
  price: number;
  category: 'windows' | 'office' | 'games' | 'plans';
  description: string;
  image: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export interface Customer {
  email: string;
  firstName?: string;
  lastName?: string;
  isGuest: boolean;
}

export interface UserAccount {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  country: string;
}
