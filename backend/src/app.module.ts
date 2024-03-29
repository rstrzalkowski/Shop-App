import {
  MiddlewareConsumer,
  Module,
  NestModule,
  RequestMethod,
} from '@nestjs/common';
import { InjectConnection, MongooseModule } from '@nestjs/mongoose';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { CategoryModule } from './category/category.module';
import { Connection } from 'mongoose';
import { environment } from '../environment/environment';

const staffCORS = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', `${environment.baseIP}:4201`);
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
};

const anyCORS = function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept',
  );
  next();
};

@Module({
  imports: [
    MongooseModule.forRoot(
      'mongodb://nest:nestpassword@localhost/nestdb?authSource=admin',
    ),
    OrderModule,
    ProductModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  @InjectConnection() private connection: Connection;

  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(staffCORS)
      .forRoutes({ path: '/*', method: RequestMethod.ALL });
    consumer
      .apply(anyCORS)
      .forRoutes(
        { path: '/products', method: RequestMethod.GET },
        { path: '/orders', method: RequestMethod.POST },
        { path: '/categories', method: RequestMethod.GET },
      );
  }

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
