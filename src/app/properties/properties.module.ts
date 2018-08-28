import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {PropertiesListComponent} from "./properties-list/properties-list.component";
import {PropertyService} from "./services/properties.service";
import {SharedModule} from "../shared/shared.module";
import {PropertyDetailComponent} from "./property-detail/property-detail.component";
import {PropertyAddComponent} from "./property-add/property-add.component";
import {RewardComponent} from "./reward/reward.component";
import { PropertyCardComponent } from './property-card/property-card.component';
import { CreatePledgeComponent } from '../pledges/create-pledge/create-pledge.component';

@NgModule({
  imports: [
    CommonModule,
    SharedModule
  ],
  declarations: [
    PropertyCardComponent,
    PropertyDetailComponent,
    PropertiesListComponent,
    PropertyAddComponent,
    RewardComponent,
    CreatePledgeComponent
  ],
  providers: [PropertyService],
  exports: [PropertyCardComponent]
})
export class PropertiesModule { }
