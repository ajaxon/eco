import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PropertiesListComponent } from './properties/properties-list/properties-list.component';
import { PropertyDetailComponent } from './properties/property-detail/property-detail.component';
import { UserPledgesComponent } from './user-panel/user-pledges/user-pledges.component';
import { PropertyAddComponent } from './properties/property-add/property-add.component';

const routes: Routes = [

  {path: '', component: PropertiesListComponent},
  {path: 'properties/add', component: PropertyAddComponent},
  {path: 'properties/:id', component: PropertyDetailComponent},
  {path: 'user', component: UserPledgesComponent},
  {path: 'login', loadChildren: 'app/auth/auth.module#AuthModule' },

  {path: 'account', loadChildren: 'app/user-panel/user-panel.module#UserPanelModule'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
