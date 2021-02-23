import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map, take } from 'rxjs/operators';
import { Product } from './model/product.model';
import { ShoppingCartItem } from './model/shopping-cart-item.model';
import { ShoppingCart } from './model/shopping-cart.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  constructor(private db: AngularFireDatabase) { }

  getCart(): Observable<ShoppingCart>  {
    let cartId = this.getOrCreateCartId();
    let shoppingCart : ShoppingCart;
     return this.db.list('/shopping-carts/' + cartId).valueChanges().pipe(map(cart => new ShoppingCart(<any>cart[1])));
  }

  addToCart(product: Product) {
    this.updateItem(product, 1);
    
  }

  removeFromCart(product: Product) {
    this.updateItem(product, -1);
    
  }

  clearCart() {
    let cartId = this.getOrCreateCartId();
    this.db.object('/shopping-carts/'+ cartId + '/items').remove();
  }

  private getItem (cartId: string, productId: string){
    return this.db.object('/shopping-carts/'+ cartId + '/items/' + productId);
  }

  private create() {
    return this.db.list('/shopping-carts').push({ dateCreated: new Date().getTime() });
  }

  private getOrCreateCartId() {
    let cartId = localStorage.getItem('cartId');
    if (cartId) return cartId;

    let result = this.create();
    localStorage.setItem('cartId', result.key!);
    return result.key!;
  }

  private updateItem(product: Product, change: number) {
    let item$ : AngularFireObject<any>;
    let cartId = this.getOrCreateCartId();
    item$ = this.getItem(cartId, product.key!);
    // can also use valueChnages()
    item$.valueChanges().pipe(take(1)).subscribe(item => {
      let quantity = (item?.quantity || 0) + change;
     // console.log('Item si '+ JSON.stringify(item?.payload.val().title)+quantity);
      if(quantity === 0) item$.remove();
      else 
      item$.update({
        title: product.title,
        imageUrl: product.imageUrl,
        price: product.price,
        quantity : quantity  
      });
    });
  }
}
