import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { OrderItem } from '../entities/order-item.entity';
import { Product } from '../../products/entities/product.entity';

import { CreateOrderItemDto, UpdateOrderItemDto } from '../dto/order-item.dto';

@Injectable()
export class OrderItemService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(OrderItem) private itemRepo: Repository<OrderItem>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}
  findAll() {
    return this.itemRepo.find({
      relations: {
        order: {
          customer: true,
        },
      },
    });
  }

  async findOne(id: number) {
    const item = await this.itemRepo.findOne({
      where: { id },
      relations: {
        order: true,
        product: true,
      },
    });
    if (!item) {
      throw new NotFoundException(`item ${id} not found`);
    }
    return item;
  }

  async create(data: CreateOrderItemDto) {
    const order = await this.orderRepo.findOne({
      where: { id: data.orderId },
    });
    const product = await this.productRepo.findOne({
      where: { id: data.productId },
    });
    const item = new OrderItem();
    item.order = order;
    item.product = product;
    item.quantity = data.quantity;
    return this.itemRepo.save(item);
  }

  async update(id: number, changes: UpdateOrderItemDto) {
    const orderItem = await this.itemRepo.findOne({
      where: { id },
    });
    if (changes.orderId) {
      const order = await this.orderRepo.findOne({
        where: { id: changes.orderId },
      });
      orderItem.order = order;
    }
    if (changes.productId) {
      const product = await this.productRepo.findOne({
        where: { id: changes.productId },
      });
      orderItem.product = product;
    }
    if (changes.quantity) {
      orderItem.quantity = changes.quantity;
    }
    return this.itemRepo.save(orderItem);
  }
  delete(id: number) {
    return this.itemRepo.delete(id);
  }
}
