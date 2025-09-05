// stripe.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CartItem } from 'src/cart/entities/cart.entity';
import { Orders } from 'src/order/entities/order.entity';
import Stripe from 'stripe';
import { Repository } from 'typeorm';

@Injectable()
export class StripeService {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY||'Default Key', {
    
  });

  constructor(
    @InjectRepository(Orders)
    private orderRepo: Repository<Orders>,
    @InjectRepository(CartItem)
    private cartRepo: Repository<CartItem>
  ) {}

  async createCheckoutSession(userId: number, items: { name: string; discountPrice: number; quantity: number }[]) {
    console.log(userId)
    console.log(items)
    const order = this.orderRepo.create({ status: 'pending' });

    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: Math.round(item.discountPrice * 100), // Stripe 以分为单位
      },
      quantity: item.quantity,
    }));

    const session = await this.stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      line_items: lineItems,
      mode: 'payment',
      success_url: 'http://localhost:5173/success',
      cancel_url: 'http://localhost:5173/cancel',
      metadata: {
        userId: userId.toString(),
      }
    });

    order.stripeSessionId = session.id;
    await this.orderRepo.save(order);

    return session;
  }

  async handleWebhook(payload: Buffer, signature: string) {
    const event = this.constructEvent(payload, signature);

    if (event.type === 'checkout.session.completed') {
      const session = event.data.object as Stripe.Checkout.Session;
      console.log('✅ Checkout Session completed:', session.id);

      // 1. 更新订单状态为已支付
      const order = await this.orderRepo.findOne({
        where: { stripeSessionId: session.id },
      });
      if (order) {
        order.status = 'paid';
        await this.orderRepo.save(order);
      }

      // 2. 清空该用户购物车
      const userId = session.metadata?.userId;

      if (userId) {
        const userIdNum = parseInt(userId,10);
        await this.cartRepo.createQueryBuilder().delete().from(CartItem).where('userId = :userId',{userId:userIdNum}).execute();
      }
    } else {
      console.log(`Unhandled event type ${event.type}`);
    }
  }

  constructEvent(payload: Buffer, sig: string) {
    return this.stripe.webhooks.constructEvent(
      payload,
      sig,
      process.env.STRIPE_WEBHOOK_SECRET!, // 用 `stripe listen` 命令得到
    );
  }
}
