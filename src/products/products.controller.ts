import {
  Body,
  Controller,
  Delete,
  Get,
  Header,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  Redirect,
  Req,
  Res,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { CreateProductDto } from './dto/create-procuct.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';
import { Product } from './schemas/product.schema';
@Controller('products')
export class ProductsController {
  constructor(private readonly productService: ProductsService) {}
  // @Get()
  // //@Redirect('https://google.com')
  // getAll(@Req() req: Request, @Res() res: Response): string {
  //   res.status(333);
  //   return 'getAll';
  // }
  @Get()
  getAll(): Promise<Product[]> {
    return this.productService.getAll();
  }
  @Get(':id')
  getOne(@Param('id') id: string): Promise<Product> {
    return this.productService.getById(id);
  }
  @Post()
  @HttpCode(HttpStatus.CREATED)
  @Header('Cach-control', 'none')
  create(@Body() createProductDto: CreateProductDto): Promise<Product> {
    return this.productService.create(createProductDto);
  }
  @Delete(':id')
  remove(@Param('id') id: string): Promise<Product> {
    return this.productService.remove(id);
  }
  @Put(':id')
  update(
    @Body() updatePruductDto: UpdateProductDto,
    @Param('id') id: string,
  ): Promise<Product> {
    return this.productService.update(id, updatePruductDto);
  }
}
