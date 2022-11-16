import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { brotliDecompressSync } from 'zlib';
import { CartService } from './cart.service';

@Controller('cart')
export class CartController {
    constructor(
        private readonly cartService: CartService
    ) {}
    
    @Get('/all')
    getAllCart(): any {
        return this.cartService.getAllCart();
    }

    @Post()
    add(@Body() item: Item) {
        console.log(item);
        return this.cartService.add(item);
    }

    @Put('/:id')
    update(@Body() newItem: Item, @Param('id') id: string) {
        try {
            return this.cartService.update(id, newItem);
        } catch (err) {
            return {
                message: 'Can not update !!!',
                error: err.message,
            };
        }
    }

    @Delete('/:id')
    delete(@Body() @Param('id') id: string) {
        try {
            return this.cartService.delete(id);
        } catch (err) {
            return {
                message: 'Can not delete !!!',
                error: err.message,
            };
        }
    }
}
