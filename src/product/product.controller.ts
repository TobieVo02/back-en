import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private readonly productService: ProductService) { }

  @Post()
  create(@Body() createProduct: Product) {
    return this.productService.create(createProduct);
  }

  @Get()
  findAll() {
    return this.productService.findAll();
  }

  @Get('/:id')
  findOne(@Param('id') id: string) {
    console.log(id)
    return this.productService.findOne(id);
  }

  @Put('/:id')
  update(@Body() newProduct: Product, @Param('id') id: string) {
    try {
      return this.productService.update(id, newProduct);
    } catch (err) {
      return {
        message: "Can't update!!!",
        error: err.message,
      }
    }
  }

  @Delete('/:id')
  remove(@Body() @Param('id') id: string) {
    try {
      return this.productService.remove(id);
    } catch (err) {
      return {
        message: "Can't Delete !!!",
        error: err.message,
      }
    }
  }

  @Get('/sum')
  Sum() {
    return this.productService.totalOfProduct();
  }

  @Post('/add/:id')
  addToCart(@Param('id') id: string) {
    let temp = this.productService.findOne(id)
    return this.productService.addToCart(temp.data)
  }
}
