import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './product.model';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { CategorySchema } from '../category/category.model';
import { CategoryModule } from '../category/category.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
    CategoryModule,
  ],
  exports: [ProductService],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
