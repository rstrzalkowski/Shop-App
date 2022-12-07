import * as mongoose from 'mongoose';
import { Product } from '../product/product.model';
import { ProductSchema } from '../product/product.model';
import { OrderState, OrderStateSchema } from './orderState.model';

export const ProductEntrySchema = new mongoose.Schema({
  product: ProductSchema,
  quantity: Number,
});

export interface ProductEntry extends mongoose.Document {
  product: Product;
  quantity: number;
}

export const OrderSchema = new mongoose.Schema({
  confirmationDate: { type: Date, required: false },
  username: { type: String, required: true },
  email: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  products: { type: [ProductEntrySchema], required: true },
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

/*
//[product: Product, quantity: number];
{ product: ProductSchema, quantity: Number }
Array<Product>
Zamówienie: 
- data zatwierdzenia (data, dopuszczalny null), 
- stan zamówienia (jedno obowiązkowe odniesienie do encji Stan Zamówienia) 
- nazwa użytkownika,
- email (oba typu tekst),
- numer telefonu (typu tekst),
- lista zamówionych towarów wraz z liczbą sztuk każdego towaru (liczby całkowite dodatnie). 
Należy dodać odpowiednie tabele w bazie danych.

Stan Zamówienia: 
- nazwa (typu tekst) 
	+ predefiniowane w bazie stany:
		* NIEZATWIERDZONE
		* ZATWIERDZONE
		* ANULOWANE
		* ZREALIZOWANE (nazwy można przetłumaczyć na angielski)
		
 */
