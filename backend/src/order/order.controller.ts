import { Body, Controller, Get, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/create-order';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async addProduct(@Body() dto: CreateOrderDTO) {
    const generatedId = await this.orderService.insertOrder(
      dto.confirmationDate,
      dto.username,
      dto.email,
      dto.phoneNumber,
      dto.products,
    );
    return { id: generatedId };
  }

  @Get()
  getProducts() {
    return this.orderService.getOrders();
  }
}
