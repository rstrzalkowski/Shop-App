import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDTO } from './dto/create-order';

@Controller('orders')
export class OrderController {
  constructor(private orderService: OrderService) {}

  @Post()
  async addOrder(@Body() dto: CreateOrderDTO) {
    const generatedId = await this.orderService.insertOrder(
      dto.username,
      dto.email,
      dto.phoneNumber,
      dto.products,
    );
    return { id: generatedId };
  }

  @Get()
  getOrders() {
    return this.orderService.getOrders();
  }

  @Get('states')
  getStates() {
    return this.orderService.getStates();
  }

  @Get('/state/:state')
  getProductsByState(@Param('state') stateName: string) {
    return this.orderService.getOrdersByState(stateName.toUpperCase());
  }

  @Get('/username/:username')
  getProductsByUsername(@Param('username') username: string) {
    return this.orderService.getOrdersByUsername(username);
  }

  @Get('/:id')
  getProduct(@Param('id') id: string) {
    return this.orderService.getOrder(id);
  }

  @Put('/:id')
  changeState(@Param('id') id: string, @Body() body) {
    return this.orderService.changeState(id, body.state);
  }
}
