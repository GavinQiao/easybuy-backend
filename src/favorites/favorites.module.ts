import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Favorite } from './entities/favorites.entity';
import { FavoriteService } from './favorites.service';
import { FavoriteController } from './favorites.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Favorite])],
  providers: [FavoriteService],
  controllers: [FavoriteController]
})
export class FavoriteModule {}
