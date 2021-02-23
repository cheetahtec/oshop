import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AppComponent } from './app.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NavigationComponent } from './navigation/navigation.component';
import { HomeComponent } from './home/home.component';
import { ProductsComponent } from './products/products.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './check-out/check-out.component';
import { OrderSuccessComponent } from './order-success/order-success.component';
import { MyOrdersComponent } from './my-orders/my-orders.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { LoginComponent } from './login/login.component';
import { environment } from 'src/environments/environment';
import { AuthService } from './auth.service';
import { Authguard } from './authguard.service';
import { UserService } from './user.service';
import { AdminAuthGuard } from './admin-auth-guard.service';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { CategoryService } from './category.service';
import { FormsModule } from '@angular/forms';
import { ProductService } from './product.service';
import { CustomFormsModule } from 'ng2-validation';
import { ProductFilterComponent } from './products/product-filter/product-filter.component';
import { ProductCardComponent } from './product-card/product-card.component';
import { CartService } from './cart.service';
import { ProductQuantityComponent } from './product-quantity/product-quantity.component';
import { OrderService } from './order.service';
import { ShoppingCartSummaryComponent } from './shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './shipping-form/shipping-form.component';
//import { DataTableModule} from 'angular-4-data-table';


@NgModule({
  declarations: [
    AppComponent,
    NavigationComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    LoginComponent,
    ProductFormComponent,
    ProductFilterComponent,
    ProductCardComponent,
    ProductQuantityComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    CustomFormsModule,
    //DataTableModule,
    RouterModule.forRoot([
      { path: '', component: ProductsComponent },
      { path: 'shopping-cart', component: ShoppingCartComponent },
      { path: 'products', component: ProductsComponent },
      { path: 'login', component: LoginComponent },

      { path: 'check-out', component: CheckOutComponent, canActivate: [Authguard] },
      { path: 'my/orders', component: MyOrdersComponent, canActivate: [Authguard] },
      { path: 'order-success/:id', component: OrderSuccessComponent, canActivate: [Authguard] },
      
      { path: 'admin/product/new', component: ProductFormComponent, canActivate: [Authguard, AdminAuthGuard] },
      { path: 'admin/product/edit/:id', component: ProductFormComponent, canActivate: [Authguard, AdminAuthGuard] },
      { path: 'admin/products', component: AdminProductsComponent, canActivate: [Authguard, AdminAuthGuard] },    
      { path: 'admin/orders', component: AdminOrdersComponent, canActivate: [Authguard, AdminAuthGuard] },
      
      

    ])
  ],
  providers: [AuthService, UserService,AdminAuthGuard, CategoryService, ProductService, CartService, OrderService],
  bootstrap: [AppComponent]
})
export class AppModule { }
