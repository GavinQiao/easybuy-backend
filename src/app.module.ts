import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { AuthModule } from './user/auth.module';
import {FavoriteModule} from './favorites/favorites.module'
import { CartModule } from './cart/cart.module';
import { OrderModule } from './order/order.module';
import { StripeModule } from './stripe/stripe.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal:true
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'Qktyyy5073',
      database: 'easybuy',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // 开发阶段可打开, 生产记得关闭
    }),
    UserModule,
    AuthModule,
    FavoriteModule,
    ProductModule,
    CartModule,
    OrderModule,
    StripeModule
  ],
})
export class AppModule {}
