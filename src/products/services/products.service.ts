import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm/dist/common';
import { Repository } from 'typeorm/repository/Repository';
import { In, Between, FindOptionsWhere } from 'typeorm';

import { Product } from './../entities/product.entity';
import { Category } from '../entities/category.entity';
import { Brand } from '../entities/brand.entity';
import {
  CreateProductDto,
  FilterProductsDto,
  UpdateProductDto,
} from '../dtos/products.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepo: Repository<Product>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Brand) private brandRepo: Repository<Brand>,
  ) {}

  findAll(params?: FilterProductsDto) {
    if (params) {
      const where: FindOptionsWhere<Product> = {};
      const { limit, offset, minPrice, maxPrice } = params;
      if (minPrice && maxPrice) {
        where.price = Between(minPrice, maxPrice);
      }
      return this.productRepo.find({
        where,
        relations: ['brand', 'categories'],
        take: limit,
        skip: offset,
      });
    }
    return this.productRepo.find({
      relations: ['brand', 'categories'],
    });
  }

  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['brand', 'categories'],
    });
    if (!product) {
      throw new NotFoundException(`Product #${id} not found`);
    }
    return product;
  }

  async create(data: CreateProductDto) {
    // const newProduct = new Product();
    // newProduct.name = data.name;
    // newProduct.description = data.description;
    // newProduct.price = data.price;
    // newProduct.stock = data.stock;
    // newProduct.image = data.image;
    const newProduct = this.productRepo.create(data);
    if (data.brandId) {
      const brand = await this.brandRepo.findOne({
        where: { id: data.brandId },
      });
      newProduct.brand = brand;
    }
    if (data.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(data.categoriesIds),
      });
      newProduct.categories = categories;
    }
    return this.productRepo.save(newProduct);
  }

  async addOneCategorytoProduct(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    const category = await this.categoryRepo.findOne({
      where: { id: categoryId },
    });
    product.categories.push(category);
    return this.productRepo.save(product);
  }

  async update(id: number, changes: UpdateProductDto) {
    const product = await this.productRepo.findOne({
      where: { id },
    });
    if (changes.brandId) {
      const brand = await this.brandRepo.findOne({
        where: { id: changes.brandId },
      });
      product.brand = brand;
    }
    if (changes.categoriesIds) {
      const categories = await this.categoryRepo.findBy({
        id: In(changes.categoriesIds),
      });
      product.categories = categories;
    }
    this.productRepo.merge(product, changes);
    return this.productRepo.save(product);
  }
  async removeOneCategory(productId: number, categoryId: number) {
    const product = await this.productRepo.findOne({
      where: { id: productId },
      relations: ['categories'],
    });
    product.categories = await product.categories.filter(
      (item) => item.id !== categoryId,
    );
    return this.productRepo.save(product);
  }
  remove(id: number) {
    return this.productRepo.delete(id);
  }
}
