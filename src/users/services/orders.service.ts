import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Order } from '../entities/order.entity';
import { Customer } from '../entities/customer.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dto/order.dto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Customer) private customerRepo: Repository<Customer>,
  ) {}

  findAll() {
    return this.orderRepo.find({
      relations: {
        customer: true,
      },
    });
  }

  async ordersByCustomer(customerId: number) {
    return this.orderRepo.find({
      where: {
        customer: {
          id: customerId,
        },
      },
    });
  }

  async findOne(id: number) {
    const order = await this.orderRepo.findOne({
      where: { id },
      relations: ['items', 'items.product', 'customer'],
    });
    if (!order) {
      throw new NotFoundException(`order ${id} not found`);
    }
    return order;
  }

  async create(data: CreateOrderDto) {
    const newOrder = new Order();
    if (data.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: data.customerId },
      });
      newOrder.customer = customer;
    }
    return this.orderRepo.save(newOrder);
  }

  async update(id: number, changes: UpdateOrderDto) {
    const order = await this.orderRepo.findOne({
      where: { id },
    });
    if (changes.customerId) {
      const customer = await this.customerRepo.findOne({
        where: { id: changes.customerId },
      });
      order.customer = customer;
    }
    return this.orderRepo.save(order);
  }

  remove(id: number) {
    return this.orderRepo.delete(id);
  }
}
