import * as mongoose from 'mongoose';
import { Category, CategorySchema } from '../category/category.model';

export const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  weight: { type: Number, required: true },
  category: { type: CategorySchema, required: true },
});

export interface Product extends mongoose.Document {
  id: string;
  name: string;
  description: string;
  price: number;
  weight: number;
  category: Category;
}
