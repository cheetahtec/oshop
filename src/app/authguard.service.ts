import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { AuthService } from './auth.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Authguard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) : 
        Observable<boolean|UrlTree>|Promise<boolean|UrlTree>|boolean|UrlTree{
          
    return this.authService.user$.pipe(map(user => {
      if (user)
        return true;

      this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      return false;
    }));
  }


}
