import * as mongoose from 'mongoose';
import { Product, ProductSchema } from '../product/product.model';
import { OrderState, OrderStateSchema } from './orderState.model';

export interface ProductEntry extends mongoose.Document {
  product: Product;
  quantity: number;
}

export const OrderSchema = new mongoose.Schema({
  confirmationDate: { type: Date, required: false },
  username: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  products: {
    type: [
      {
        product: ProductSchema,
        quantity: Number,
      },
    ],
    required: true,
    _id: false,
  },
  state: { type: OrderStateSchema, required: true },
});

export interface Order extends mongoose.Document {
  id: string;
  confirmationDate: Date;
  username: string;
  email: string;
  phoneNumber: string;
  products: Array<ProductEntry>;
  state: OrderState;
}
