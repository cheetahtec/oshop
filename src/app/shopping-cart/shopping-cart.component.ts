import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CartService } from '../cart.service';
import { ShoppingCart } from '../model/shopping-cart.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  cart$?: Observable<ShoppingCart>;

  constructor(private cartService: CartService) { }

  ngOnInit(): void {
    this.cart$ = this.cartService.getCart();
  }
  
  clearCart() {
    this.cartService.clearCart();
  }
}
