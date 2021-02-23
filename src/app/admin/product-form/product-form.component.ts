import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { take } from 'rxjs/operators';
import { CategoryService } from 'src/app/category.service';
import { Product } from 'src/app/model/product.model';
import { ProductService } from 'src/app/product.service';

@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent implements OnInit {

  product: Product;
  public categories$: Observable<any>;
  id: any;


  constructor(private categoryService: CategoryService, private productService: ProductService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.categories$ = of(null);
    this.id = undefined;
    this.product = { title: '', price: NaN, imageUrl: '', category: '' };
  }

  ngOnInit(): void {
    this.id = this.activatedRoute.snapshot.paramMap.get('id');
    if (this.id) {
      this.productService.getProduct(this.id).pipe(take(1)).subscribe(p => {
        Object.assign(this.product, p.payload.val());
      });
    }
    this.categories$ = this.categoryService.getCategories();
  }

  save(product: any) {
    Object.assign(this.product, product);
    if (!this.id) this.productService.create(this.product);
    else {
      this.productService.update(this.id, this.product);
    }
    this.router.navigate(['admin/products']);
  }

  delete() {
    if (confirm('Are you sure you want to delete the product')) {
      this.productService.delete(this.id);
      this.router.navigate(['admin/products']);
    }
  }

  /* update() {
     const key = this.product.key;  
    // this.product.key = undefined;
    console.log('Product data to update is '+ JSON.stringify(this.product));
     this.productService.update(key,this.product);
     this.router.navigate(['admin/products']);
   }*/
}