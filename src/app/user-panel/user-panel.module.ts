import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserPanelRoutingModule } from './user-panel-routing.module';
import {UserPledgesComponent} from "./user-pledges/user-pledges.component";
import {SharedModule} from "../shared/shared.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    UserPanelRoutingModule
  ],
  declarations: [UserPledgesComponent]
})
export class UserPanelModule { }
