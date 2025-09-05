import { UseGuards,Controller,Post,Req } from "@nestjs/common";
import { OrderService } from "./order.service";
import { AuthGuard } from "@nestjs/passport";

@UseGuards(AuthGuard('jwt'))
@Controller('api/orders')
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Post('checkout')
  createOrder(@Req() req) {
    return this.orderService.createOrder(req.user.id);
  }
}
