import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CartItem } from "./entities/cart.entity";
import { Repository } from "typeorm";
import { Product } from "src/product/entities/product.entity";
import { CreateCartItemDto } from "./dto/cart.dto";
import { NotFoundException } from "@nestjs/common";

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(CartItem)
    private cartRepo: Repository<CartItem>,

    @InjectRepository(Product)
    private productRepo: Repository<Product>,
  ) {}

  async addToCart(userId: number, dto: CreateCartItemDto) {
    const { productId, quantity } = dto;

    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!product) throw new NotFoundException('商品不存在');

    let cartItem = await this.cartRepo.findOne({
      where: { user: { id: userId }, product: { id: productId } },
      relations: ['user', 'product']
    });

    if (cartItem) {
      cartItem.quantity += quantity;
    } else {
      cartItem = this.cartRepo.create({
        user: { id: userId },
        product: { id: productId },
        quantity,
      });
    }

    return await this.cartRepo.save(cartItem);
  }

  async getCartItems(userId: number) {
    return this.cartRepo.find({
      where: { user: { id: userId } },
      relations: ['product'], // 关联商品信息
    });
  }

  async clearCart(userId: number){
    await this.cartRepo.delete({
      user: {id:userId}
    })
  }
}
