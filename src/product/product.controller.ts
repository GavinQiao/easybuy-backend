import {
    Controller, Get, Post, Put, Delete, Param, Body, ParseIntPipe,
    UseInterceptors,UploadedFile
  } from '@nestjs/common';
  import { ProductService } from './product.service';
  import { CreateProductDto } from './dto/create-product.dto';
  import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import {diskStorage} from 'multer';
import { extname } from 'path';
  
  @Controller('products')
  export class ProductController {
    constructor(private readonly service: ProductService) {}
  
    @Post()
    create(@Body() dto: CreateProductDto) {
      return this.service.create(dto);
    }
  
    @Get()
    findAll() {
      return this.service.findAll();
    }

    @Get('best-seller')
    getBestSeller(){
      console.log(this.service.getTopSellingProducts())
      return this.service.getTopSellingProducts();
    }

    @Post('upload')
    @UseInterceptors(
      FileInterceptor('file',{
        storage: diskStorage({
          destination:'./uploads',
          filename:(req,file,callback)=>{
            const uniqueSuffix = Date.now()+'-'+Math.round(Math.random()*1e9);
            const ext = extname(file.originalname);
            callback(null,`${uniqueSuffix}${ext}`)
          },
        }),
      }),
    )
    upload(@UploadedFile() file: Express.Multer.File) {
    const url = `http://localhost:3000/uploads/${file.filename}`;
    return { imageUrl: url };
  }
  
    @Get(':id')
    findOne(@Param('id', ParseIntPipe) id: number) {
      return this.service.findOne(id);
    }

    
  
    @Put(':id')
    update(
      @Param('id', ParseIntPipe) id: number,
      @Body() dto: UpdateProductDto,
    ) {
      return this.service.update(id, dto);
    }
  
    @Delete(':id')
    remove(@Param('id', ParseIntPipe) id: number) {
      return this.service.remove(id);
    }
  }
  