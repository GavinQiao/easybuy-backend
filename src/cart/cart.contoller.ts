import { Controller, Post, Body, UseGuards, Req,Get } from '@nestjs/common';
import { CartService } from './cart.service';
import { CreateCartItemDto } from './dto/cart.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('api/cart')
@UseGuards(AuthGuard('jwt')) // 需要用户登录
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post('add')
  addToCart(@Body() dto: CreateCartItemDto, @Req() req) {
    const userId = req.user.id;
    return this.cartService.addToCart(userId, dto);
  }

  @Get()
  getCart(@Req() req) {
      const userId = req.user.id;
      return this.cartService.getCartItems(userId);
  }

  @Post('clear')
  async clearCart(@Req() req){
    this.cartService.clearCart(req.user.id)
    return 'Cart has cleared!';
  }
}
