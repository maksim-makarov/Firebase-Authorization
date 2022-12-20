import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthServiceService {
  constructor(private fireAuth: AngularFireAuth, private router: Router) {}

  private isAuth = false;

  signupUser(user: any): Promise<any> {
    return this.fireAuth
      .createUserWithEmailAndPassword(user.signupEmail, user.signupPassword)
      .catch((error) => {
        console.log('Auth Service: signup error', error);
        if (error.code) return { isValid: false, message: error.message };
      });
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.fireAuth
      .signInWithEmailAndPassword(email, password)
      .then(() => {
        console.log('Auth Service: loginUser: success');
        this.isAuth = true;
      })
      .catch((error) => {
        console.log('Auth Service: login error...');
        console.log('error code', error.code);
        console.log('error', error);
        if (error.code) return { isValid: false, message: error.message };
      });
  }

  isLoggedIn() {
    return this.isAuth;
  }
}
