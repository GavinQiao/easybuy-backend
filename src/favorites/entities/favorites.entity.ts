import { Entity,PrimaryGeneratedColumn,ManyToOne } from "typeorm"
import { User } from "src/user/entities/user.entity"
import { Product } from "src/product/entities/product.entity"

@Entity('favorites')
export class Favorite {
  @PrimaryGeneratedColumn()
  id: number

  @ManyToOne(() => User, (user) => user.favorites)
  user: User

  @ManyToOne(() => Product, (product) => product.favorites)
  product: Product
}
