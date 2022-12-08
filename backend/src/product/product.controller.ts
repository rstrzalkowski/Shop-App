import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDTO } from './dto/create-product';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async addProduct(@Body() dto: CreateProductDTO) {
    const generatedId = await this.productService.insertProduct(
      dto.name,
      dto.description,
      dto.price,
      dto.weight,
      dto.category,
    );
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
}
