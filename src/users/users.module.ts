import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm/dist';
//Customer
import { CustomerController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { Customer } from './entities/customer.entity';
//User
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { User } from './entities/user.entity';

import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { Order } from './entities/order.entity';
import { OrderItem } from './entities/order-item.entity';

import { ProductsModule } from 'src/products/products.module';
import { OrderItemController } from './controllers/order-item.controller';
import { OrderItemService } from './services/order-item.service';
import { ProfileController } from './controllers/profile.controller';

@Module({
  imports: [
    ProductsModule,
    TypeOrmModule.forFeature([Customer, User, Order, OrderItem]),
  ],
  controllers: [
    CustomerController,
    UsersController,
    OrdersController,
    OrderItemController,
    ProfileController,
  ],
  providers: [CustomersService, UsersService, OrdersService, OrderItemService],
  exports: [UsersService],
})
export class UsersModule {}
