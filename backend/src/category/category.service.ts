import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category } from './category.model';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async getCategories() {
    const categories = await this.categoryModel.find().exec();
    return categories.map((category) => ({
      id: category.id,
      name: category.name,
    }));
  }
}
