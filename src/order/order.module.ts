import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Orders } from './entities/order.entity';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { OrderItem } from './entities/orderItem.entity';
import { CartItem } from 'src/cart/entities/cart.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Orders,OrderItem,CartItem])],
  providers: [OrderService],
  controllers: [OrderController]
})
export class OrderModule {}
