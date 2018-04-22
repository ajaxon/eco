


import {Component, Input} from '@angular/core';
import {Property} from './models/property.model';
import {PropertyService} from './services/properties.service';

@Component({
  selector: 'app-property',
  template: `<mat-card>
    <mat-card-header>
      <mat-card-title>{{ property.title }}</mat-card-title>
    </mat-card-header>
    <mat-card-content>
      <app-property-detail *ngIf="this.showDetails" [property]="property"></app-property-detail>
    </mat-card-content>



    <mat-card-actions>
      <button mat-button>LIKE</button>
      <button mat-button (click)="show()">PROPERTY DETAILS</button>
      <button mat-button>SHARE</button>
      <button mat-button>PLEDGE</button>
      <button (click)="deleteProperty(property)" mat-button>DELETE</button>
    </mat-card-actions>
  </mat-card>`,
  styles: []
})
export class PropertyComponent {

  showDetails = false;

  @Input() property: Property;

  constructor(private _propertyService: PropertyService){

  }
  show() {
    this.showDetails = !this.showDetails;
  }

  deleteProperty(property: Property){
    this._propertyService.deleteProperty(property);
  }


}
