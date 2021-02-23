import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import * as firebase from 'firebase';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppUser } from './model/user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  user$: Observable<any>;

  constructor(private afAuth: AngularFireAuth, private route: ActivatedRoute, private router: Router, private userService: UserService) {
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    this.afAuth.signInWithRedirect(new firebase.default.auth.GoogleAuthProvider());
  }

  logout() {
    this.afAuth.signOut();
  }

  getAppUser$(): Observable<AppUser> {
    return <Observable<AppUser>>this.user$
      .pipe(switchMap(user => {
        if (user) {
          return this.userService.get(user.uid).valueChanges();
        } else {
          return of(null);
        }

      }))
  }
}
