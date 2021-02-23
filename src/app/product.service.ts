import { stringify } from '@angular/compiler/src/util';
import { Injectable } from '@angular/core';
import { AngularFireDatabase, SnapshotAction } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from './model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private db: AngularFireDatabase) { }

  create(product: Product) {
    return this.db.list('/products').push(product);
    
  }

  getAllProducts(){
    return this.db.list('/products').snapshotChanges().pipe(
      map(changes => changes.map(c => ({...c.payload.val() as any, key: c.key}))
      )
    );
      
  }

  getProduct(id: string) {
    return  this.db.object('/products/' + id).snapshotChanges();
  }

  update(productId: string, product: Product) {
    return this.db.object('/products/' + productId).update(product);
  }

  delete(id: string) {
    this.db.object('/products/' + id).remove();
  }
}
