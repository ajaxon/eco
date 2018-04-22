import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PropertyService} from '../services/properties.service';
import {Property} from '../models/property.model';

@Component({
  selector: 'app-property-add',
  template: `
    <mat-card class="card">





    <form [formGroup]='addPropertyForm'  (ngSubmit)="add()" class="example-container" novalidate>
      <mat-form-field class="example-full-width">
        <input matInput formControlName="title"  placeholder="Title" required dividerColor="accent">
        <mat-error *ngIf="title.invalid">Invalid Title</mat-error>

      </mat-form-field>

      <mat-form-field>
        <input type="text" matInput formControlName="description" placeholder="Description">
        <mat-error *ngIf="description.invalid">Invalid Description</mat-error>
        <mat-hint align="end">Must be 8 or more characters</mat-hint>
      </mat-form-field>
      <mat-form-field>
        <input type="number" matInput formControlName="parcelSize" placeholder="Parcel Size">
        <mat-error *ngIf="description.invalid">Invalid Size</mat-error>
        <mat-hint align="end">Must be numeric</mat-hint>
      </mat-form-field>

      <mat-form-field>
        <input type="number" matInput formControlName="priceCents" placeholder="Price in Cents">
        <mat-error *ngIf="description.invalid">Invalid Price</mat-error>
        <mat-hint align="end"></mat-hint>
      </mat-form-field>

      <mat-checkbox
        class="example-margin">
        I'm a checkbox
      </mat-checkbox>

      <mat-slide-toggle formControlName="published"
        class="example-margin"
        [checked]="published">

        Published
      </mat-slide-toggle>

      <button mat-raised-button [disabled]="addPropertyForm.pristine" type="submit">Add</button>

      <button mat-raised-button [disabled]="addPropertyForm.pristine" (click)="reset()">Reset</button>


    </form>


    </mat-card>
  `,
  styleUrls: ['property-add.component.css'],
})
export class PropertyAddComponent implements OnInit {

  terrains = ['Mountains', 'Rivers', 'Streams'];
  published = false;



  addPropertyForm: FormGroup;

  constructor(private fb: FormBuilder, private propertyService: PropertyService) { }

  ngOnInit() {
    this.createForm();
  }

  add() {
    console.log('Property submit ', this.addPropertyForm.value);
    this.propertyService.addProperty(this.addPropertyForm.getRawValue());
  }

  createForm() {
    this.addPropertyForm = this.fb.group({
      title: ['', [Validators.required]],
      description: ['', [Validators.required, Validators.minLength(8)]],
      parcelSize: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      priceCents: ['', [Validators.required, Validators.pattern('^[0-9]+$')]],
      terrains: ['', [Validators.required]],
      published: ['', [Validators.required]]
    });
  }

  reset() {
    this.addPropertyForm.reset();
  }


  get title(){
    return this.addPropertyForm.get('title');
  }

  get description(){
    return this.addPropertyForm.get('description');
  }

}
