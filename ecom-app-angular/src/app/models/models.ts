export interface Product {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

export interface ProductItem {
  id: number;
  productId: string;
  price: number;
  quantity: number;
  product?: Product;
}

export interface Order {
  id: string;
  date: string;
  state: string;
  productItems: ProductItem[];
}
