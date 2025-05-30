import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Favorite } from 'src/favorites/entities/favorites.entity';
import { CartItem } from 'src/cart/entities/cart.entity';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  category: string;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  originalPrice: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  discountPrice: number;

  @Column({default:0})
  soldAmount: number;

  @Column()
  stock: number;

  @Column()
  imageUrl: string;

  @OneToMany(() => Favorite, (favorite) => favorite.product)
  favorites: Favorite[];

  @OneToMany(()=>CartItem,(cartItem)=>cartItem.product)
  cartItem: CartItem[];
}
