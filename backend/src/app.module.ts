import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { Connection } from 'mongoose';

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://nest:nestpassword@localhost/nestdb?authSource=admin',
    ),
    ProductModule,
    OrderModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  @InjectConnection() private connection: Connection;

  onModuleInit() {
    const categories = this.connection.collection('categories');
    const orderstates = this.connection.collection('categories');

    categories.insertOne({ name: 'Sport' });
    categories.insertOne({ name: 'Clothes' });
    categories.insertOne({ name: 'Shoes' });
    categories.insertOne({ name: 'Electronics' });
    categories.insertOne({ name: 'Books' });

    orderstates.insertOne({ name: 'UNCONFIRMED' });
    orderstates.insertOne({ name: 'CONFIRMED' });
    orderstates.insertOne({ name: 'CANCELLED' });
    orderstates.insertOne({ name: 'DONE' });
  }
}
