import {Component, OnInit} from '@angular/core';
import {PropertyService} from '../services/properties.service';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-properties-list',
  template: `


 <ng-container *ngFor="let property of this.propertyService.properties$ | async">


    <app-property-card [property]=property></app-property-card>
</ng-container>
  

  `,
  styles: []
})
export class PropertiesListComponent implements OnInit {

  selectedProperty: Property;

  constructor(public propertyService: PropertyService) {
  }

  ngOnInit() {
  }

  selectProperty(property: Property) {
    this.selectedProperty = property;
  }


}
