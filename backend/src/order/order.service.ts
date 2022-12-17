import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { OrderState } from './orderState.model';
import { Order } from './order.model';
import { ProductService } from '../product/product.service';
import { ProductEntryDTO } from './dto/create-order';

//TODO Exception handling + implement Update and Delete

@Injectable()
export class OrderService {
  constructor(
    @InjectModel('Order') private readonly orderModel: Model<Order>,
    @InjectModel('OrderState')
    private readonly orderStateModel: Model<OrderState>,
    private readonly productService: ProductService,
  ) {}

  async insertOrder(
    username,
    email,
    phoneNumber,
    products: Array<ProductEntryDTO>,
  ) {
    const foundProducts = [];
    for (const entry of products) {
      const tempProduct = await this.productService.getProduct(entry.id);
      const tempProductEntry = {
        product: tempProduct,
        quantity: entry.quantity,
      };
      foundProducts.push(tempProductEntry);
    }

    const newOrder = new this.orderModel({
      confirmationDate: null,
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

  async getOrdersByState(stateName: string) {
    const orders = await this.orderModel
      .find()
      .where('state.name')
      .equals(stateName)
      .select('-state._id')
      .exec();
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
      .exec()
      .catch(() => {
        throw new HttpException(
          'Cannot retrieve order with given id',
          HttpStatus.NOT_FOUND,
        );
      });
    if (!order) {
      throw new HttpException(
        'Order with given id not found',
        HttpStatus.NOT_FOUND,
      );
    }
    return order;
  }

  async changeState(id: string, state: string) {
    const foundState = await this.orderStateModel
      .findOne({ name: state })
      .exec()
      .catch(() => {
        throw new HttpException(
          'Cannot retrieve order with given id',
          HttpStatus.NOT_FOUND,
        );
      });
    const order = await this.orderModel
      .findById(id)
      .exec()
      .catch(() => {
        throw new HttpException(
          'Cannot retrieve state with given name',
          HttpStatus.NOT_FOUND,
        );
      });

    if (foundState != null && order != null) {
      if (order.state.name == 'UNCONFIRMED' && foundState.name == 'CONFIRMED') {
        order.confirmationDate = new Date();
        order.state = foundState;
        await this.orderModel.findByIdAndUpdate(id, order);
      } else if (
        order.state.name == 'UNCONFIRMED' &&
        foundState.name == 'CANCELLED'
      ) {
        order.state = foundState;
        await this.orderModel.findByIdAndUpdate(id, order);
      } else if (order.state.name == 'CONFIRMED' && foundState.name == 'DONE') {
        order.state = foundState;
        await this.orderModel.findByIdAndUpdate(id, order);
      } else if (order.state.name == 'CANCELLED') {
        throw new HttpException(
          'Cannot change state of cancelled order',
          HttpStatus.CONFLICT,
        );
      } else {
        throw new HttpException(
          `Cannot change order state from ${order.state.name} to ${foundState.name}`,
          HttpStatus.CONFLICT,
        );
      }
    } else {
      let message;
      if (order == null) {
        message = 'Order with given id not found';
      } else if (foundState == null) {
        message = 'State with given name not found';
      }
      throw new HttpException(message, HttpStatus.NOT_FOUND);
    }
  }

  async getStates() {
    const states = await this.orderStateModel.find().exec();
    return states.map((state) => ({
      id: state.id,
      name: state.name,
    }));
  }
}
