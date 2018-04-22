import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PropertiesComponent} from "./properties.component";
import {PropertiesListComponent} from "./properties-list/properties-list.component";
import {PropertyDetailComponent} from "./property-detail/property-detail.component";
import {PropertyAddComponent} from "./property-add/property-add.component";


const routes: Routes = [
  {
    path: '',
    component: PropertiesComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full'
      },
      {
        path: 'list',
        component: PropertiesListComponent,
        data: {
          title: 'Todos'
        }
      },
      {
        path: 'properties/:id',
        component: PropertyDetailComponent
      },
      {
        path: 'add',
        component: PropertyAddComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PropertiesRoutingModule { }
