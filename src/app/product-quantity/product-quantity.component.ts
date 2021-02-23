import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../model/product.model';
import { ShoppingCart } from '../model/shopping-cart.model';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.css']
})
export class ProductQuantityComponent {

  constructor ( private cartService: CartService) {}

  @Input('product') product?: Product;
  @Input('shopping-cart') shoppingCart?: ShoppingCart;


  addToCart() {
    this.cartService.addToCart(this.product!);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product!);
  }

}
