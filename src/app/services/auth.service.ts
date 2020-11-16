import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(public afAuth: AngularFireAuth) {}

  createUser(email: string, password: string): Promise<unknown> {
    return new Promise<any>((resolve, reject) => {
      this.afAuth
        .createUserWithEmailAndPassword(email, password)
        .then(() => resolve())
        .catch((error: any) => {
          return reject(error);
        });
    });
  }

  signinUser(email: string, password: string): Promise<unknown> {
    return new Promise((resolve, reject) => {
      this.afAuth
        .signInWithEmailAndPassword(email, password)
        .then(() => resolve())
        .catch((error: any) => reject(error));
    });
  }

  signout(): void {
    this.afAuth.signOut();
  }
}
