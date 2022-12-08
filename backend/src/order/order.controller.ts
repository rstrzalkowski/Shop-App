import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/create-order';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async addOrder(@Body() dto: CreateOrderDTO) {
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

  @Get('/:id')
  getProduct(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }
}
