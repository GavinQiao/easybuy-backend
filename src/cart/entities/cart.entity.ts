import {
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  Column,
  CreateDateColumn,
} from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { Product } from '../../product/entities/product.entity';

@Entity('cart_items')
export class CartItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.cartItem)
  user: User;

  @ManyToOne(() => Product, (product) => product.cartItem)
  product: Product;

  @Column()
  quantity: number;

  @CreateDateColumn()
  createdAt: Date;
}
