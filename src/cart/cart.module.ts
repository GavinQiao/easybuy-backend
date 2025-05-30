import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CartItem } from './entities/cart.entity';
import { CartService } from './cart.service';
import { CartController } from './cart.contoller';
import { Product } from 'src/product/entities/product.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CartItem,Product])],
  providers: [CartService],
  controllers: [CartController]
})
export class CartModule {}
