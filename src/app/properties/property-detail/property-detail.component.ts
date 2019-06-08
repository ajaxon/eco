import {Component, Input, OnInit} from '@angular/core';
import {Observable} from 'rxjs';
import {PropertyService} from '../services/properties.service';
import {AuthenticationService} from '../../auth/services/authentication.service';
import { Property } from '../../models/property.model';
import {PledgeService} from "../../core/services/pledge.service";

@Component({
  selector: 'app-property-detail',
  templateUrl: 'property-detail.component.html',
  styles: []
})
export class PropertyDetailComponent implements OnInit {

  @Input() property: Property;
  isAdmin$: any;
  rewards: Observable<any []>;
  pledges: any;


  ngOnInit(): void {
    //this.rewards = this.propertyService.getRewards(this.property);
    this.pledges = this.pledgeService.getAllPledgesToProperty(this.property);
  }


  constructor(private propertyService: PropertyService, private pledgeService: PledgeService, private _authService: AuthenticationService) {
    this.isAdmin$ = this._authService.isAdmin$;
  }

  links = [
    {link: 'add', label: 'Add Property'},
    {link: 'test', label: 'Test'}
  ];

  test() {

  }

}
