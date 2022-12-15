import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CategorySchema } from './category.model';
import { CategoryService } from './category.service';
import { CategoryController } from './category.controller';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Category', schema: CategorySchema }]),
  ],
  exports: [CategoryService],
  controllers: [CategoryController],
  providers: [CategoryService],
})
export class CategoryModule {}
