import { Component, Input, OnInit } from '@angular/core';
import { CartService } from '../cart.service';
import { Product } from '../model/product.model';
import { ShoppingCart } from '../model/shopping-cart.model';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {

  @Input('product') product!: Product;
  @Input('show-actions') showActions: boolean = true;
  @Input('shopping-cart') shoppingCart?: ShoppingCart;

  defaultImage = 'https://blog.nscsports.org/wp-content/uploads/2014/10/default-img.gif';

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
  }

  addToCart() {
    this.cartService.addToCart(this.product!);
  }

}
