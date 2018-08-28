import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PledgeCardComponent} from "../pledges/pledge-card/pledge-card.component";
import { MatButtonModule, MatCardModule, MatGridListModule, MatProgressBarModule, MatChipsModule } from '../../../node_modules/@angular/material';
import { PropertiesModule } from '../properties/properties.module';
import { RouterModule } from '../../../node_modules/@angular/router';


@NgModule({
  imports: [

    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatProgressBarModule,
    RouterModule,
    MatChipsModule


  ],
  declarations: [PledgeCardComponent],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PledgeCardComponent,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatProgressBarModule,
    RouterModule,
    MatChipsModule
    


  ]
})
export class SharedModule { }
