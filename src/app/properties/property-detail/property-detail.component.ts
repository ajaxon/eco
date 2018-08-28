import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PropertyService} from '../services/properties.service';
import {AuthenticationService} from '../../auth/services/authentication.service';
import { Property } from '../../models/property.model';

@Component({
  selector: 'app-property-detail',
  template: `Description: {{ property.description }} - Parcel: {{ property.parcelSize }}
Property Detail

  {{ property.id }}
  {{ property.pledgeCount }}
  {{ property.location }}
  {{ property.totalPledged }}
  {{ property.priceCents | currency }}

  <h3>Rewards</h3>
  <button *ngIf="(isAdmin$ | async)" (click)="addReward(property)" mat-button>Add Reward</button>
  <app-reward *ngFor="let reward of rewards | async" [reward]="reward">
  </app-reward>
<app-create-pledge></app-create-pledge>
  
  `,
  styles: []
})
export class PropertyDetailComponent implements OnInit {

  @Input() property: Property;
  isAdmin$: any;
  rewards: Observable<any []>;


  ngOnInit(): void {
    this.rewards = this.propertyService.getRewards(this.property);
  }


  constructor(private propertyService: PropertyService, private _authService: AuthenticationService) {
    this.isAdmin$ = this._authService.isAdmin$;
  }

  links = [
    {link: 'add', label: 'Add Property'},
    {link: 'test', label: 'Test'}
  ];


}
