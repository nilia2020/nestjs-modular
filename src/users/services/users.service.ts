import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { Db } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as bcrypt from 'bcrypt';
// import { ConfigService } from '@nestjs/config';
// import { Order } from '../entities/order.entity';
import { User } from '../entities/user.entity';
import { CreateUserDto, UpdateUserDto } from '../dtos/user.dto';
import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @Inject('MONGO') private databaseMongo: Db,
    private productsService: ProductsService,
  ) {}

  findAll() {
    return this.userModel.find().exec();
  }

  async findOneById(id: string) {
    const user = await this.userModel.findById(id).exec();
    if (!user) {
      throw new NotFoundException(`User #${id} not found`);
    }
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.userModel.findOne({ email }).exec();
    if (!user) {
      throw new NotFoundException(`User email:${email} not found`);
    }
    return user;
  }

  async create(data: CreateUserDto): Promise<any> {
    const newUser = new this.userModel(data);
    const hashPassword = await bcrypt.hash(newUser.password, 10);
    newUser.password = hashPassword;
    const user = await newUser.save();
    const { password, ...response } = user;
    if (password) {
    }
    return response;
  }

  async update(id: string, changes: UpdateUserDto) {
    const user = await this.userModel
      .findByIdAndUpdate(id, { $set: changes }, { new: true })
      .exec();

    return user;
  }

  remove(id: string) {
    return this.userModel.findByIdAndDelete(id).exec();
  }

  async getOrderByUser(id: string) {
    const user = this.userModel.findById(id).exec();
    return {
      date: new Date(),
      user,
      products: this.productsService.findAll(),
    };
  }
}
