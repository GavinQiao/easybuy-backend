import { UseGuards,Controller,Post,Req,Res,BadRequestException,RawBodyRequest, Body } from "@nestjs/common";
import { StripeService } from "./stripe.service";
import { CartService } from "src/cart/cart.service";
import { AuthGuard } from "@nestjs/passport";
import Stripe from "stripe";
// stripe.controller.ts
@UseGuards(AuthGuard('jwt'))
@Controller('api/stripe')
export class StripeController {
  constructor(
    private readonly stripeService: StripeService,
    private readonly cartService: CartService, // 需要访问购物车
  ) {}

  @Post('create-checkout-session')
  async createCheckoutSession(@Req() req) {
    const userId = req.user.id;

    const cartItems = await this.cartService.getCartItems(userId);
    if (cartItems.length === 0) {
      throw new BadRequestException('购物车为空');
    }

    const items = cartItems.map(item => ({
      name: item.product.name,
      discountPrice: item.product.discountPrice,
      quantity: item.quantity,
    }));

    const session = await this.stripeService.createCheckoutSession(userId, items);
    return { url: session.url };
  }

  @Post('webhook')
  async webhook(@Req() req: RawBodyRequest<Request>, @Res() res: Response) {
    const sig = req.headers['stripe-signature'];
    let event: Stripe.Event;

    try {
    await this.stripeService.handleWebhook(req.rawBody as Buffer, sig as string);
    return { received: true };
  } catch (err) {
    console.error('⚠️ Webhook Error:', err.message);
    throw new BadRequestException('Webhook Error!');
  }
  }
}
