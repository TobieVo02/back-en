import { Injectable } from '@nestjs/common';

@Injectable()
export class ProductService {


  constructor() { }


  productList = [];

  create(createProduct: Product) {
    createProduct.id = Date.now().toString();
    this.productList.push(createProduct);
    return {
      message: 'Created product !!!'
    }
  }

  findAll() {
    return {
      data: this.productList,
      message: `This action returns all product`
    };
  }

  findOne(id: string) {
    for (let i = 0; i < this.productList.length; i++) {
      if (this.productList[i].id == id) {
        return {
          data: this.productList[i],
        }
      }
    }
    throw Error("Can't Find Product");
  }

  update(id: string, updateProduct: Product) {
    for (let i = 0; i < this.productList.length; i++) {
      if (this.productList[i].id == id) {
        this.productList[i] = {
          ...this.productList[i],
          ...updateProduct,
        };
        return {
          message: "Update Done !!!",
          data: this.productList[i]
        }
      }
    }
    throw Error("Can't find Product to update !!!");
  }

  remove(id: string) {
    for (let i = 0; i < this.productList.length; i++) {
      if (this.productList[i].id == id) {
        this.productList.splice(i, 1);
        return {
          message: "Delete done !!!"
        }
      }
    }
    throw Error("Can't find Product to delete")
  }


  cart: Product[] = [];
  sum = 0;
  totalOfProduct() {
    this.sum = 0;
    console.log(this.cart)
    for (let i = 0; i < this.cart.length; i++) {
      this.sum = this.sum + this.cart[i].inStock * this.cart[i].price;
      console.log(this.sum)
      for (let j = 0; j < this.cart.length; j++) {
        if (this.productList[j].id == this.cart[i].id) {
          this.productList[j].inStock = this.productList[j].inStock - this.cart[i].quantity;
        }
      }
    }
    this.cart = [];
    return this.sum;
  }

  addToCart(product: Product) {
    let alreadyHas = false;
    console.log(product.id)
    if (this.cart.length == 0) this.cart.push(product)
    // for (let i = 0; i < this.productList.length; i++) {
    //   if (this.cart[i].id == product.id) {
    //     this.cart[i].quantity++;
    //     alreadyHas = true;
    //   }
    // }
    // if(!alreadyHas) this.cart.push(product)
    console.log(this.cart);
  }
}
