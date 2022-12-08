import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderSchema, ProductEntrySchema } from './order.model';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { OrderStateSchema } from './orderState.model';
import { ProductModule } from '../product/product.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Order', schema: OrderSchema }]),
    MongooseModule.forFeature([
      { name: 'OrderState', schema: OrderStateSchema },
    ]),
    MongooseModule.forFeature([
      { name: 'ProductEntry', schema: ProductEntrySchema },
    ]),
    ProductModule,
  ],
  controllers: [OrderController],
  providers: [OrderService],
})
export class OrderModule {}
