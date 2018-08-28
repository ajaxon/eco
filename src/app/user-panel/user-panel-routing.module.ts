import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UserPledgesComponent} from "./user-pledges/user-pledges.component";

const routes: Routes = [
  {
    path: '',
    component: UserPledgesComponent
  }


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserPanelRoutingModule { }
