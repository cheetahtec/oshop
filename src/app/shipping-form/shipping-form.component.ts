import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from '../auth.service';
import { Order } from '../model/order.model';
import { Shipping } from '../model/shipping.model';
import { ShoppingCart } from '../model/shopping-cart.model';
import { OrderService } from '../order.service';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.css']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  
  shipping?: Shipping; 
  @Input('cart') cart?: ShoppingCart;
  user?: string = '';
  userSubscription?: Subscription;

  constructor( private orderService: OrderService, private authService: AuthService, private router: Router){}

  async placeOrder() {
    let order = new Order(this.user!, this.shipping!, this.cart!);
    let orderID = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success',orderID.key]);
  }    

  ngOnInit(): void {
    this.shipping = new Shipping();
    this.userSubscription = this.authService.user$.subscribe(user => this.user = user.uid);

  }
  ngOnDestroy(): void {
    if(this.userSubscription) this.userSubscription.unsubscribe();
  }

}
