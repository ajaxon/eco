import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AuthRoutingModule } from './auth-routing.module';
import { AuthenticationService } from './services/authentication.service';
import {AuthenticationComponent} from "./authentication.component";
import {SharedModule} from "../shared/shared.module";
import {LoginComponent} from "./loginSignup/login.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    AuthRoutingModule
  ],
  declarations: [AuthenticationComponent, LoginComponent],
  providers: [AuthenticationService]
})
export class AuthModule { }
