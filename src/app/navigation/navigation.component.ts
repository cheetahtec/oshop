import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { CartService } from '../cart.service';
import { ShoppingCart } from '../model/shopping-cart.model';
import { AppUser } from '../model/user.model';

@Component({
  selector: 'navigation-bar',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  appUser: AppUser | undefined;
  cart$?: Observable<ShoppingCart>;
  // Make use of asynch pipe so decalre this as observable
  // We use asynch pipe as it destroys the observable once componenet is destoyed
  // Alternatively implement onDestroy hook
  //  user$: Observable <any>;

  firstName: string = '';

  constructor(public authService: AuthService, private cartService: CartService) {


  }
  async ngOnInit() {
    this.authService.getAppUser$().subscribe(appUser => this.appUser = appUser);
    this.cart$ = this.cartService.getCart();
  }

  logout() {
    this.authService.logout();
  }

}
