import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireObject } from '@angular/fire/database';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AppUser } from './model/user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private db: AngularFireDatabase) { }

  save(user: firebase.default.User) {
    this.db.object('/users/' + user.uid).update ({
      name: user.displayName,
      email: user.email
    });
  }

  get(id: string): AngularFireObject<AppUser>{
    return this.db.object('/users/' + id);
  }
}
