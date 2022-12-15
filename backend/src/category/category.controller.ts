import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  getCategories() {
    return this.categoryService.getCategories();
  }
}
