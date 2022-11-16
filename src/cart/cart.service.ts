import { Injectable } from '@nestjs/common';

@Injectable()
export class CartService {
    cartList = [];
    getAllCart(){
        return {
            data: this.cartList,
        };
    }

    add(item: Item) {
        item.id = Date.now().toString();
        this.cartList.push(item);
        return {
            message: "Add Done !!!",
        }
    }

    update (id: string, newItem: Item) {
        for ( let i = 0; i < this.cartList.length; i++) {
            if (this.cartList[i].id == id ) {
                this.cartList[i] = {
                    ...this.cartList[i],
                    ...newItem,
                };
                return {
                    message: "Update Done!!!",
                    data: this.cartList[i],
                };
            }
        }
        throw Error('Can not find item to update');
    }

    delete (id: string) {
        for (let i = 0; i < this.cartList.length; i++) {
            if (this.cartList[i].id == id) {
                this.cartList.splice(i, 1);
                return {
                    message: "Delete Done!!!"
                }
            }
        }
        throw Error('Can not find Item have same ID');
    }
}
