import { Component, Input, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoryService } from 'src/app/category.service';

@Component({
  selector: 'product-filter',
  templateUrl: './product-filter.component.html',
  styleUrls: ['./product-filter.component.css']
})
export class ProductFilterComponent implements OnInit {

  @Input('category') category: any;
  categories$?: Observable<any>;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categories$ = this.categoryService.getCategories();

  }

}
