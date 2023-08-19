import {
  Entity,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

import { Product } from 'src/products/entities/product.entity';
import { User } from './user.entity';

@Entity()
export class Order {
  @PrimaryColumn({ type: 'date' })
  date: Date;
  user: User;
  products: Product[];
  @CreateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  createAt: Date;
  @UpdateDateColumn({ type: 'timestamptz', default: () => 'CURRENT_TIMESTAMP' })
  updateAt: Date;
}
