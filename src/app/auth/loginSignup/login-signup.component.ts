


import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthenticationService} from '../services/authentication.service';

@Component({
  selector: 'app-login-signup',
  templateUrl: './login-signup.component.html',
  styles: []
})
export class LoginSignupComponent {

  links = [
    {link: 'add', label: 'Add Property'},
    {link: 'test', label: 'Test'}
  ];


  loginForm: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthenticationService) {
    this.createForm();
  }


  googleLogin() {
    this.authService.googleLogin();
  }

  facebookLogin() {
    this.authService.facebookLogin();
  }

  login() {
    this.authService.login(this.email.value, this.password.value);
  }

  signup() {
    this.authService.signup(this.email.value, this.password.value);
  }

  createForm(){
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }


  get email(){
    return this.loginForm.get('email');
  }

  get password(){
    return this.loginForm.get('password');
  }
}
