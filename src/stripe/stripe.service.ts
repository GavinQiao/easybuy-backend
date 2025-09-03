// stripe.service.ts
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';

@Injectable()
export class StripeService {
  private stripe = new Stripe(process.env.STRIPE_SECRET_KEY||'Default Key', {
    
  });

  async createCheckoutSession(userId: number, items: { name: string; discountPrice: number; quantity: number }[]) {
    console.log(userId)
    console.log(items)
    const lineItems = items.map(item => ({
      price_data: {
        currency: 'usd',
        product_data: { name: item.name },
        unit_amount: item.discountPrice * 100, // Stripe 以分为单位
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

    return session;
  }
}
