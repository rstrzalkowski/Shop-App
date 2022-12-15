import {Category} from "./category.model";


export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  category: Category;

  quantity: number;
}
