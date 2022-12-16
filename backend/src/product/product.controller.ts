import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product';
import { UpdateProductDTO } from './dto/update-product';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async addProduct(@Body() dto: CreateProductDTO) {
    const generatedId = await this.productService.insertProduct(dto);
    return { id: generatedId };
  }

  @Get()
  getProducts() {
    return this.productService.getProducts();
  }

  @Get('/:id')
  getProduct(@Param('id') id: string) {
    return this.productService.getProduct(id);
  }

  @Put('/:id')
  updateProduct(@Param('id') id: string, @Body() dto: UpdateProductDTO) {
    return this.productService.updateProduct(id, dto);
  }

  @Delete('/:id')
  removeProduct(@Param('id') id: string) {
    this.productService.removeProduct(id);
  }
}
