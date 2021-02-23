import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
import { CartService } from './cart.service';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db: AngularFireDatabase, private cartService: CartService) { }

  placeOrder(order: any) {
    let result = this.db.list('/orders').push(order);
    this.cartService.clearCart();
    return result;
  }

  // get all orders
  getOrders() {
    return this.db.list('/orders');
  }

  //getOrders by user

  getOrdersByUser(userId: string) {
    return this.db.list('/orders', ref=> userId ? ref.orderByChild('userId').equalTo(userId): ref).valueChanges();
  }
}
