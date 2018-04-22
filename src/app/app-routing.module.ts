import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [

  {path: 'auth', loadChildren: 'app/auth/auth.module#AuthModule' },
  {path: 'properties', loadChildren: 'app/properties/properties.module#PropertiesModule' }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
