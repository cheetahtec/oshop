import { Component, OnDestroy, OnInit } from '@angular/core';
import { AngularFireDatabase } from '@angular/fire/database';
//import { DataTableResource } from 'angular-4-data-table';
import { Observable, of, Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnInit, OnDestroy {

  filteredProducts: Product[] = [];
  products: Product[] = [];
  items?: Product[];
  itemCount?: number;
  subscription?: Subscription;

  //tableResource?: DataTableResource<Product> = undefined;

  constructor(private productService: ProductService) { 
  }

  ngOnDestroy(): void {
    if (this.subscription) this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.getAllProducts();
  }

  getAllProducts() {
    this.subscription = this.productService.getAllProducts().subscribe(products => {
     this.filteredProducts = products;
     this.products = products;
    // this.initialieTable(products);
    });
  }

  reloadItems(params : any) {
   // if(!this.tableResource) return ;
   // this.tableResource?.query(params).then(items => this.items = items);
  }
  private initialieTable(products: Product[]) {
   // this.tableResource = new DataTableResource(products);
   // this.tableResource.query({offset: 0}).then(items => this.items = items);
   // this.tableResource.count().then(count => this.itemCount = count);
  }
  filter(query: string) {
    this.filteredProducts = (query) ? this.products.filter(p => p.title?.toLowerCase().includes(query.toLowerCase())) :
      this.products;
  }

}
