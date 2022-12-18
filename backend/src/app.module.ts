import { Module } from '@nestjs/common';
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
  controllers: [],
})
export class AppModule {
  @InjectConnection() private connection: Connection;

  onModuleInit() {
    const categories = this.connection.collection('categories');
    const orderstates = this.connection.collection('orderstates');
    categories.updateOne(
      { name: 'Sport' },
      { $setOnInsert: { name: 'Sport' } },
      { upsert: true },
    );

    categories.updateOne(
      { name: 'Clothes' },
      { $setOnInsert: { name: 'Clothes' } },
      { upsert: true },
    );
    categories.updateOne(
      { name: 'Shoes' },
      { $setOnInsert: { name: 'Shoes' } },
      { upsert: true },
    );
    categories.updateOne(
      { name: 'Electronics' },
      { $setOnInsert: { name: 'Electronics' } },
      { upsert: true },
    );
    categories.updateOne(
      { name: 'Books' },
      { $setOnInsert: { name: 'Books' } },
      { upsert: true },
    );
    orderstates.updateOne(
      { name: 'UNCONFIRMED' },
      { $setOnInsert: { name: 'UNCONFIRMED' } },
      { upsert: true },
    );
    orderstates.updateOne(
      { name: 'CONFIRMED' },
      { $setOnInsert: { name: 'CONFIRMED' } },
      { upsert: true },
    );
    orderstates.updateOne(
      { name: 'CANCELLED' },
      { $setOnInsert: { name: 'CANCELLED' } },
      { upsert: true },
    );
    orderstates.updateOne(
      { name: 'DONE' },
      { $setOnInsert: { name: 'DONE' } },
      { upsert: true },
    );
  }
}
