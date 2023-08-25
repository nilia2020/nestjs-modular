import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

import { Product, ProductSchema } from './entities/product.entity';
import { ProductsController } from './controllers/products.controller';
import { ProductsService } from './services/products.service';

import { Category, CategorySchema } from './entities/category.entity';
import { CategoriesController } from './controllers/categories.controller';
import { CategoriesService } from './services/categories.service';

import { Brand, BrandSchema } from './entities/brand.entity';
import { BrandsService } from './services/brands.service';
import { BrandsController } from './controllers/brands.controller';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      {
        name: Category.name,
        schema: CategorySchema,
      },
      {
        name: Brand.name,
        schema: BrandSchema,
      },
    ]),
  ],
  controllers: [ProductsController, CategoriesController, BrandsController],
  providers: [ProductsService, BrandsService, CategoriesService],
  exports: [ProductsService],
})
export class ProductsModule {}
