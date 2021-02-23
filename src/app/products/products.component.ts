import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { CartService } from '../cart.service';
import { Product } from '../model/product.model';
import { ShoppingCart } from '../model/shopping-cart.model';
import { ProductService } from '../product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit, OnDestroy {

  products$?: Observable<Product[]>;
  products?: Product[];
  filteredProducts?: Product[];
  category?: string;
  cart?: ShoppingCart;
  subcribe?: Subscription;

  constructor(private productService: ProductService, private route: ActivatedRoute, private cartService: CartService) {


  }
  ngOnDestroy(): void {
    if (this.subcribe) this.subcribe.unsubscribe();

  }

  ngOnInit(): void {
    this.subcribe = this.cartService.getCart().subscribe(cart => { this.cart = cart });
    this.populateProducts();

  }

  private populateProducts() {
    this.productService.getAllProducts().pipe(switchMap(products => {
      this.products = products;
      return this.route.queryParamMap;
    })).subscribe(params => {
      this.category = params.get('category') || '';
      this.applyFilter();
    });
  }

  private applyFilter() {
    this.filteredProducts = this.category ? this.products?.filter(product => product.category === this.category) :
      this.products;
  }

}
