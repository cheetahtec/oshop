import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AuthService } from './auth.service';
import { UserService } from './user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy {
  subscription: Subscription;
  constructor(private authService: AuthService, router: Router, private userService: UserService) {
    this.subscription = this.authService.user$.subscribe(user => {
      if (!user) return;
      // This shud happen only on regitration
      userService.save(user);
      let returnUrl = localStorage.getItem('returnUrl');
      if (!returnUrl) return;

      localStorage.removeItem('returnUrl');
      router.navigateByUrl(returnUrl);



    });

  }
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

}
