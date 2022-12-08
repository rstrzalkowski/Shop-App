import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderState } from './orderState.model';
import { Order, ProductEntry } from './order.model';
import { ProductService } from '../product/product.service';
import { ProductEntryDTO } from './dto/create-order';

//TODO Exception handling + implement Update and Delete

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    @InjectModel('OrderState')
    private readonly orderStateModel: Model<OrderState>,
    @InjectModel('ProductEntry')
    private readonly productEntryModel: Model<ProductEntry>,
    private readonly productService: ProductService,
  ) {}

  async insertOrder(
    confirmationDate,
    username,
    email,
    phoneNumber,
    products: Array<ProductEntryDTO>,
  ) {
    const foundProducts = [];
    for (const entry of products) {
      const tempProduct = await this.productService.getProduct(entry.id);
      const tempProductEntry = new this.productEntryModel({
        product: tempProduct,
        quantity: entry.quantity,
      });
      foundProducts.push(tempProductEntry);
    }

    const newOrder = new this.orderModel({
      confirmationDate: confirmationDate,
      username: username,
      email: email,
      phoneNumber: phoneNumber,
      products: foundProducts,
      state: await this.orderStateModel.findOne({ name: 'UNCONFIRMED' }).exec(),
    });
    const result = await newOrder.save();
    return result.id as string;
  }

  async getOrders() {
    const orders = await this.orderModel.find().select('-state._id').exec();
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

  async getOrder(id: string) {
    const order = await this.orderModel
      .findById(id)
      .select('-state._id -__v')
      .exec();
    return order;
  }
}
