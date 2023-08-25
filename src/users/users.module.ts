import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CustomerController } from './controllers/customers.controller';
import { CustomersService } from './services/customers.service';
import { User, UserSchema } from './entities/user.entity';
import { UsersController } from './controllers/users.controller';
import { UsersService } from './services/users.service';
import { ProductsModule } from 'src/products/products.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: User.name, schema: UserSchema }]),
    ProductsModule,
  ],
  controllers: [CustomerController, UsersController],
  providers: [CustomersService, UsersService],
})
export class UsersModule {}
