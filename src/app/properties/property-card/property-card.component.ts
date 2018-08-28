import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { PropertyService } from '../services/properties.service';
import { PledgeService } from '../../core/services/pledge.service';
import { Property } from '../../models/property.model';
import { Pledge } from '../../models/pledge.model';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent implements OnInit {
  ngOnInit(): void {
    //throw new Error("Method not implemented.");
  }

  showDetails = false;
  isAdmin$: any;

  @Input() property: Property;

  constructor(private _authService: AuthenticationService, private _propertyService: PropertyService, private _pledgeService: PledgeService){
    this.isAdmin$ = this._authService.isAdmin$;
  }
  show() {
    this.showDetails = !this.showDetails;
  }

  deleteProperty(property: Property) {
    this._propertyService.deleteProperty(property);
  }


  pledge(amount: number) {
    const pledge = new Pledge();
    pledge.amountCents = amount;
    pledge.property_id = this.property.id;

    this._pledgeService.addPledge(pledge);
  }

}
