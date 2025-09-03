import { Injectable,BadRequestException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Orders } from "./entities/order.entity";
import { CartItem } from "src/cart/entities/cart.entity";
import { Repository } from "typeorm";

@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Orders) private orderRepo: Repository<Orders>,
    @InjectRepository(CartItem) private cartRepo: Repository<CartItem>,
  ) {}

  async createOrder(userId: number) {
    const cartItems = await this.cartRepo.find({
      where: { user: { id: userId } },
      relations: ['product'],
    });

    if (cartItems.length === 0) {
      throw new BadRequestException('购物车为空');
    }

    const order = this.orderRepo.create({
      user: { id: userId },
      items: cartItems.map(item => ({
        product: item.product,
        quantity: item.quantity,
      })),
    });

    await this.orderRepo.save(order);
    await this.cartRepo.delete({ user: { id: userId } }); // 清空购物车

    return order;
  }
}
