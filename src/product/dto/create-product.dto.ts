// dto/create-product.dto.ts
import { IsString, IsNumber, Min, MaxLength } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @MaxLength(100)
  name: string;

  @IsString()
  @MaxLength(50)
  category:string;

  @IsNumber()
  @Min(0)
  originalPrice: number;

  @IsNumber()
  @Min(0)
  discountPrice: number;

  @IsNumber()
  @Min(0)
  soldAmount: number;

  @IsNumber()
  @Min(0)
  stock: number;

  @IsString()
  imageUrl:string;
}
