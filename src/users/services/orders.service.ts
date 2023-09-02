import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { Order } from '../entities/order.entity';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/order.dto';

@Injectable()
export class OrderService {
  constructor(@InjectModel(Order.name) private orderModel: Model<Order>) {}

  findAll() {
    return this.orderModel
      .find()
      .populate('customer') // 👈 join customer 1:1
      .populate({
        path: 'products',
        populate: {
          path: 'brand',
        },
      }) // 👈 join products 1:N
      .exec();
  }

  async ordersByCustomer(customerId: string) {
    return await this.orderModel
      .find({
        customer: customerId,
      })
      .populate('products')
      .exec();
  }

  async findOne(id: string) {
    const order = await this.orderModel
      .findById(id)
      .populate('customer') // 👈 join customer 1:1
      .populate('products')
      .exec();
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  create(data: CreateOrderDto) {
    const newOrder = new this.orderModel(data);
    return newOrder.save();
  }

  update(id: string, changes: UpdateOrderDto) {
    const order = this.orderModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    }
    return order;
  }

  remove(id: string) {
    return this.orderModel.findByIdAndDelete(id).exec();
  }

  async removeProduct(id: string, productId: string) {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    } else {
      if (order.products.length > 0) {
        order.products.pull(productId);
      } else {
        throw new NotFoundException(`Order #${id} is empty`);
      }
    }
    return order.save();
  }

  async addProduct(id: string, productsIds: string[]) {
    const order = await this.orderModel.findById(id);
    if (!order) {
      throw new NotFoundException(`Order #${id} not found`);
    } else {
      productsIds.forEach((item) => {
        order.products.push(item);
      });
    }
    return order.save();
  }
}
