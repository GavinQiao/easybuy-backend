import { Injectable } from "@nestjs/common"
import { InjectRepository } from "@nestjs/typeorm"
import { Favorite } from "./entities/favorites.entity"
import { Repository } from "typeorm"

@Injectable()
export class FavoriteService {
  constructor(@InjectRepository(Favorite) private repo: Repository<Favorite>) {}

  async addFavorite(userId: number, productId: number) {
    const existing = await this.repo.findOne({ where: { user: { id: userId }, product: { id: productId } } })
    if (existing) return { message: '已收藏' }
    const favorite = this.repo.create({ user: { id: userId }, product: { id: productId } })
    return this.repo.save(favorite)
  }

  async removeFavorite(userId: number, productId: number) {
    return this.repo.delete({ user: { id: userId }, product: { id: productId } })
  }

  async getFavorites(userId: number) {
    return this.repo.find({
      where: { user: { id: userId } },
      relations: ['product']
    })
  }
}
