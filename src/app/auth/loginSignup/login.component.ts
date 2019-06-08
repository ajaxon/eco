import { Component, OnInit } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/auth";
import {Router} from "@angular/router";
import * as firebaseui from "firebaseui";
import { auth } from 'firebase';
import {AuthenticationService} from "../services/authentication.service";


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {


  ui: firebaseui.auth.AuthUI;

  constructor(private authService: AuthenticationService, private fireAuth: AngularFireAuth, private router: Router) {
  }

  ngOnInit() {

    const uiConfig = {
      signInOptions: [

        auth.GoogleAuthProvider.PROVIDER_ID,
        auth.EmailAuthProvider.PROVIDER_ID,
        auth.FacebookAuthProvider.PROVIDER_ID,
        auth.TwitterAuthProvider.PROVIDER_ID,
        auth.PhoneAuthProvider.PROVIDER_ID,
      ],
      signInFlow: 'popup',
      //signInSuccessUrl: '/',
      credentialHelper: firebaseui.auth.CredentialHelper.NONE,

      callbacks: {
        signInSuccessWithAuthResult: this.onLoginSuccessful.bind(this),
        signInFailure: this.onLoginFailure.bind(this)
      }
    };

    this.ui = firebaseui.auth.AuthUI.getInstance() || new firebaseui.auth.AuthUI(this.fireAuth.auth);
    this.ui.start('#loginBox', uiConfig);
  }


  onLoginSuccessful(authResult	, redirecturl) {

    console.log("result", authResult);

    console.log("auth", authResult.user);
    this.authService.getExtendedToken();

    //this.clickService.timeSync();

    this.authService.updateUserData(authResult);
    //this.notifcation.success("LOGGED IN");

    this.router.navigate(['/']);
    return true;
  }

  onLoginFailure(){
   // this.notifcation.error("LOGIN FAILED");
  }




}
