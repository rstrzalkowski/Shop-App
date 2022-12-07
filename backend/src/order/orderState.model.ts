import * as mongoose from 'mongoose';

export const OrderStateSchema = new mongoose.Schema({
  name: { type: String, required: true },
});

export interface OrderState extends mongoose.Document {
  name: string;
}
