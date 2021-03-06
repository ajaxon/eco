import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {HttpClientModule} from "@angular/common/http";
import {AuthenticationService} from "../auth/services/authentication.service";
import {PledgeCardComponent} from "../pledges/pledge-card/pledge-card.component";
import { SharedModule } from '../shared/shared.module';
import { FileService } from '../file-service.service';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [AuthenticationService, FileService]
})
export class CoreModule { }
