import { Controller,UseGuards,Post,Param,Req,Delete,Get } from "@nestjs/common"
import { AuthGuard } from "@nestjs/passport"
import { FavoriteService } from "./favorites.service"

@Controller('favorites')
@UseGuards(AuthGuard('jwt'))
export class FavoriteController {
  constructor(private favoriteService: FavoriteService) {}

  @Post(':productId')
  async add(@Param('productId') productId: number, @Req() req) {
    return this.favoriteService.addFavorite(req.user.id, productId)
  }

  @Delete(':productId')
  async remove(@Param('productId') productId: number, @Req() req) {
    return this.favoriteService.removeFavorite(req.user.id, productId)
  }

  @Get()
  async getAll(@Req() req) {
    return this.favoriteService.getFavorites(req.user.id)
  }
}
