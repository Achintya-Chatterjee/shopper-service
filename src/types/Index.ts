export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  image?: string;
}

export interface CartItem {
  service: Service;
  quantity: number;
}

export interface Address {
  fullName: string;
  email: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
}
