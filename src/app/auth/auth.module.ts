import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthenticationService } from './services/authentication.service';
import {AuthenticationComponent} from "./authentication.component";
import {LoginSignupComponent} from "./loginSignup/login-signup.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [AuthenticationComponent, LoginSignupComponent],
  providers: [AuthenticationService]
})
export class AuthModule { }
