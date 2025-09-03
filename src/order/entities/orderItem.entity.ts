// order-item.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, Column } from 'typeorm';
import { Orders } from '../../order/entities/order.entity';
import { Product } from '../../product/entities/product.entity';

@Entity()
export class OrderItem {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Orders, order => order.items)
  order: Orders;

  @ManyToOne(() => Product)
  product: Product;

  @Column()
  quantity: number;
}
