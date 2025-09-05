// src/stripe/stripe.module.ts
import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { CartModule } from '../cart/cart.module'; // 如果需要访问购物车内容
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from 'src/order/entities/order.entity';
import { CartItem } from 'src/cart/entities/cart.entity';
import { CartService } from 'src/cart/cart.service';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Orders, CartItem, Product]), // ✅ 注入实体
  ], // 如果 StripeService 中需要调用 CartService
  controllers: [StripeController],
  providers: [StripeService,CartService],
  exports: [StripeService], // 如果其他模块也需要使用 StripeService
})
export class StripeModule {}
