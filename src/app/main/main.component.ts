import { Component, OnInit } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthServiceService } from '../services/auth-service.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css'],
})
export class MainComponent implements OnInit {
  constructor(private authService: AuthServiceService, private router: Router) {
    (this.signupErrorMessage = ''), (this.loginErrorMessage = '');
  }

  signupForm!: FormGroup;
  loginForm!: FormGroup;
  signupErrorMessage: string;
  loginErrorMessage: string;

  ngOnInit(): void {
    this.signupForm = new FormGroup({
      signupEmail: new FormControl('', [Validators.required, Validators.email]),
      signupPassword: new FormControl('', Validators.required),
    });
    this.loginForm = new FormGroup({
      loginEmail: new FormControl('', [Validators.required, Validators.email]),
      loginPassword: new FormControl('', Validators.required),
    });
  }

  signup() {
    if (this.signupForm.invalid) return;
    this.authService
      .signupUser(this.signupForm.value)
      .then((result) => {
        if (result.operationType == 'signIn') this.router.navigate(['signup']);
        else if (result.isValid == false)
          this.signupErrorMessage = result.message;
      })
      .catch(() => {});
  }

  login() {
    if (this.loginForm.invalid) return;

    this.authService
      .loginUser(
        this.loginForm.value.loginEmail,
        this.loginForm.value.loginPassword
      )
      .then((result) => {
        if (result == null) {
          console.log('logging in...');
          this.router.navigate(['login']);
        } else if (result.isValid == false) {
          console.log('login error', result);
          this.loginErrorMessage = result.message;
        }
      });
  }
}
