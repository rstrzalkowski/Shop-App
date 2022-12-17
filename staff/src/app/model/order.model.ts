import {Product} from "./product.model";


export interface ProductEntry {
  product: Product;
  quantity: number;
}

export interface State {
  name: string;
}

export interface Order {
  id: string;
  confirmationDate: Date;
  username: string;
  email: string;
  phoneNumber: string;
  products: ProductEntry[];
  state: State;
}
