import {Component, Input, OnInit} from '@angular/core';
import {Property, Reward} from '../models/property.model';
import {Observable} from 'rxjs/Observable';
import {PropertyService} from '../services/properties.service';

@Component({
  selector: 'app-property-detail',
  template: `Description: {{ property.description }} - Parcel: {{ property.parcelSize }}


  {{ property.id }}
  {{ property.pledgeCount }}
  {{ property.location }}

  {{ property.totalPledged }}

  {{ property.priceCents }}

  <h3>Rewards</h3>  <button (click)="addReward(property)" mat-button>Add Reward</button>
  <app-reward *ngFor="let reward of rewards | async" [reward]="reward">
  </app-reward>
  `,
  styles: []
})
export class PropertyDetailComponent implements OnInit {

  @Input() property: Property;

  rewards: Observable<any []>;


  ngOnInit(): void {
    this.rewards = this.propertyService.getRewards(this.property);
  }




  constructor(private propertyService: PropertyService) {
  }

  links = [
    {link: 'add', label: 'Add Property'},
    {link: 'test', label: 'Test'}
  ];


}
