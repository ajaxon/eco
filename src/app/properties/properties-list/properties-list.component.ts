import { Component, OnInit } from '@angular/core';
import {PropertyService} from '../services/properties.service';
import {Property} from '../models/property.model';

@Component({
  selector: 'app-properties-list',
  template: `
    <mat-chip-list>
      <mat-chip>Active</mat-chip>
      <mat-chip>Expired</mat-chip>
      <mat-chip>Paid</mat-chip>
    </mat-chip-list>

      <div class="layout" *ngFor="let property of this.propertyService.properties$ | async">
        <app-property (click)="selectProperty(property)" [property]="property"></app-property>
      </div>

  `,
  styles: []
})
export class PropertiesListComponent implements OnInit {

  selectedProperty: Property;

  constructor(public propertyService: PropertyService) { }

  ngOnInit() {
  }

  selectProperty(property: Property) {
    this.selectedProperty = property;
  }


}
