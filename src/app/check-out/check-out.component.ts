import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { CartService } from '../cart.service';
import { ShoppingCart } from '../model/shopping-cart.model';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})
export class CheckOutComponent implements OnInit{ 
 
  cart$?: Observable<ShoppingCart>;

  constructor(private cartService: CartService) {}
  
  ngOnInit() {
    this.cart$ = this.cartService.getCart();
  }
  
}
