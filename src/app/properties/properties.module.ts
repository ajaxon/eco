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
import { FlexLayoutModule } from '../../../node_modules/@angular/flex-layout';
import { AgmCoreModule } from '../../../node_modules/@agm/core';

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FlexLayoutModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyA6u1glIKvjAX36cBpYMD2L0Ras5Im523E'
    })
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
