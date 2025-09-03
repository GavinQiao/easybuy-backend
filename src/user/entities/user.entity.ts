// user.entity.ts
import { CartItem } from 'src/cart/entities/cart.entity';
import { Favorite } from 'src/favorites/entities/favorites.entity';
import { Orders } from 'src/order/entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @OneToMany(()=>Favorite,(favorite)=>favorite.user)
  favorites:Favorite[]

  @OneToMany(()=>CartItem,(cartItem)=>cartItem.user)
  cartItem:CartItem[]

  @OneToMany(()=>Orders,(order)=>order.user)
  orders:Orders[]
}
