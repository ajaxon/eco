import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {PledgeCardComponent} from "../pledges/pledge-card/pledge-card.component";
import { MatButtonModule, MatCardModule, MatGridListModule, MatProgressBarModule, MatChipsModule, MatFormFieldModule, MatSelectModule, MatOptionModule, MatInputModule, MatStepperModule, MatCheckboxModule, MatDividerModule, MatIconModule, MatExpansionModule, MatDialogModule } from '../../../node_modules/@angular/material';
import { PropertiesModule } from '../properties/properties.module';
import { RouterModule } from '../../../node_modules/@angular/router';
import { UploadsModule } from '../uploads/uploads.module';


@NgModule({
  imports: [

    CommonModule,
    UploadsModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatProgressBarModule,
    RouterModule,
    MatChipsModule,
    MatFormFieldModule,
    MatSelectModule,
    MatOptionModule,
    MatInputModule,
    MatStepperModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    MatExpansionModule,
    MatDialogModule

  ],
  declarations: [PledgeCardComponent],

  exports: [
    CommonModule,
    UploadsModule,
    FormsModule,
    ReactiveFormsModule,
    PledgeCardComponent,
    MatButtonModule,
    MatCardModule,
    MatGridListModule,
    MatProgressBarModule,
    RouterModule,
    MatChipsModule,
    MatFormFieldModule,
    MatOptionModule,
    MatSelectModule,
    MatInputModule,
    MatStepperModule,
    MatCheckboxModule,
    MatDividerModule,
    MatIconModule,
    MatExpansionModule,
    MatDialogModule
  ]
})
export class SharedModule { }
