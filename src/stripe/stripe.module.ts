// src/stripe/stripe.module.ts
import { Module } from '@nestjs/common';
import { StripeService } from './stripe.service';
import { StripeController } from './stripe.controller';
import { CartModule } from '../cart/cart.module'; // 如果需要访问购物车内容

@Module({
  imports: [CartModule], // 如果 StripeService 中需要调用 CartService
  controllers: [StripeController],
  providers: [StripeService],
  exports: [StripeService], // 如果其他模块也需要使用 StripeService
})
export class StripeModule {}
