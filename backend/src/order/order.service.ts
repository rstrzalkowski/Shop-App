import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderState } from './orderState.model';
import { Order } from './order.model';

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    @InjectModel('OrderState')
    private readonly orderStateModel: Model<OrderState>,
  ) {}

  async insertOrder(confirmationDate, username, email, phoneNumber, products) {
    const newOrder = new this.orderModel({
      confirmationDate: confirmationDate,
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      products: products,
      state: new this.orderStateModel({ name: 'UNCONFIRMED' }),
    });
    const result = await newOrder.save();
    return result.id as string;
  }

  async getOrders() {
    const orders = await this.orderModel.find().exec();
    return orders.map((order) => ({
      id: order.id,
      confirmationDate: order.confirmationDate,
      username: order.username,
      email: order.email,
      phoneNumber: order.phoneNumber,
      products: order.products,
      state: order.state,
    }));
  }
}
