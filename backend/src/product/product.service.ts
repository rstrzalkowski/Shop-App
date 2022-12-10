import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.model';
import { Category } from '../category/category.model';
import { CreateProductDTO } from './dto/create-product';
import { UpdateProductDTO } from './dto/update-product';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel('Product') private readonly productModel: Model<Product>,
    @InjectModel('Category') private readonly categoryModel: Model<Category>,
  ) {}

  async insertProduct(dto: CreateProductDTO) {
    const newProduct = new this.productModel({
      name: dto.name,
      description: dto.description,
      price: dto.price,
      weight: dto.weight,
      category: await this.resolveCategoryByName(dto.category),
    });
    const result = await newProduct.save();
    return result.id as string;
  }

  async getProduct(id: string) {
    const product = await this.productModel.findById(id).select('-__v').exec();
    return product;
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

  async updateProduct(id: string, dto: UpdateProductDTO) {
    const product = await this.getProduct(id);
    product.name = dto.name;
    product.description = dto.description;
    product.price = dto.price;
    product.weight = dto.weight;
    product.category =
      dto.category != null
        ? await this.resolveCategoryByName(dto.category)
        : product.category;
    await this.productModel.findByIdAndUpdate(id, product);
  }

  async removeProduct(id: string) {
    await this.productModel.findByIdAndDelete(id);
  }

  async resolveCategoryByName(name: string) {
    return await this.categoryModel.findOne({ name: name }).exec();
  }
}
