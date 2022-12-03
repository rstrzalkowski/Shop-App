import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';
import { Category } from '../category/category.model';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async insertProduct(
    name: string,
    desc: string,
    price: number,
    weight: number,
    category: string,
  ) {
    const newProduct = new this.productModel({
      name: name,
      description: desc,
      price,
      weight,
      category: new this.categoryModel({ name: category }),
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getProducts() {
    const products = await this.productModel.find().exec();
    return products.map((prod) => ({
      id: prod.id,
      name: prod.name,
      description: prod.description,
      price: prod.price,
      weight: prod.weight,
      category: prod.category,
    }));
  }
}
