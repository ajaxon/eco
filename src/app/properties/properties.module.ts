import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PropertiesRoutingModule} from "./properties-routing.module";
import {PropertiesComponent} from "./properties.component";
import {PropertiesListComponent} from "./properties-list/properties-list.component";
import {PropertyService} from "./services/properties.service";
import {SharedModule} from "../shared/shared.module";
import {PropertyComponent} from "./property.component";
import {PropertyDetailComponent} from "./property-detail/property-detail.component";
import {PropertyAddComponent} from "./property-add/property-add.component";
import {RewardComponent} from "./reward/reward.component";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    PropertiesRoutingModule
  ],
  declarations: [
    PropertiesComponent,
    PropertyComponent,
    PropertyDetailComponent,
    PropertiesListComponent,
    PropertyAddComponent,
    RewardComponent
  ],
  providers: [PropertyService]
})
export class PropertiesModule { }
