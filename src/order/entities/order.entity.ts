// order.entity.ts
import { Entity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, OneToMany, Column } from 'typeorm';
import { User } from '../../user/entities/user.entity';
import { OrderItem } from './orderItem.entity';

@Entity()
export class Orders {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  status: string;

  @Column({ nullable: true })
  stripeSessionId: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, user => user.orders)
  user: User;

  @OneToMany(() => OrderItem, item => item.order, { cascade: true })
  items: OrderItem[];
}
