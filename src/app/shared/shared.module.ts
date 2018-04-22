import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatButtonModule} from "@angular/material/button";
import {
  MatCardModule, MatCheckboxModule, MatChipsModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
  MatProgressSpinnerModule,
  MatSelectModule,
  MatSidenavModule, MatSlideToggleModule, MatTabsModule, MatToolbarModule,
  MatTooltipModule
} from "@angular/material";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";

@NgModule({
  imports: [

    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatSlideToggleModule,
    MatButtonModule,
    MatToolbarModule,
    MatSelectModule,
    MatTabsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatCardModule,
    MatSidenavModule,
    MatCheckboxModule,
    MatListModule,
    MatMenuModule,
    MatIconModule,
    MatTooltipModule
  ],
  declarations: [],

  exports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,

    MatSlideToggleModule,
    MatButtonModule,
    MatMenuModule,
    MatTabsModule,
    MatChipsModule,
    MatInputModule,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatCardModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,


  ]
})
export class SharedModule { }
