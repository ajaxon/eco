import { Component, OnInit, Input } from '@angular/core';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { PropertyService } from '../services/properties.service';
import { PledgeService } from '../../core/services/pledge.service';
import { Property } from '../../models/property.model';
import { Pledge } from '../../models/pledge.model';
import {FileService } from '../../file-service.service';
import { MatDialog, MatDialogConfig } from '../../../../node_modules/@angular/material';
import { CreatePledgeComponent } from '../../pledges/create-pledge/create-pledge.component';

@Component({
  selector: 'app-property-card',
  templateUrl: './property-card.component.html',
  styleUrls: ['./property-card.component.scss']
})
export class PropertyCardComponent implements OnInit {
  
  showDetails = false;
  pledgeForm = false;
  showMap = false;
  isAdmin$: any;
  images = [];

  @Input() property: Property;

  ngOnInit(): void {
    console.log(this.property);
    for(let path of this.property.photos){
      this._fileService.getFile(path).subscribe((url)=>{
        this.images.push(url);
      })
    }
  
    //throw new Error("Method not implemented.");
  }

  constructor(public dialog: MatDialog, private _fileService: FileService , private _authService: AuthenticationService, private _propertyService: PropertyService, private _pledgeService: PledgeService){
    this.isAdmin$ = this._authService.isAdmin$;
   
     
    
  }
  show() {
    this.showDetails = !this.showDetails;
  }

  showMapBox() {
    console.log("Show map clicked");
    this.showMap = !this.showMap;
  }

  showPledgeForm() {
    //this.pledgeForm = !this.pledgeForm;
    this.pledgeDialogue();
  }

  pledgeDialogue() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.minWidth = 350;
    dialogConfig.hasBackdrop = true;
    dialogConfig.minHeight = 400;
    dialogConfig.data = {property_id: this.property.id};
  
    const dialogRef = this.dialog.open(CreatePledgeComponent, dialogConfig
    );

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  

  deleteProperty(property: Property) {
    this._propertyService.deleteProperty(property);
  }

  get pledgedPercentage() {
    if (!this.property.pledges ) {
      return 0;
    }
    return ((this.property.pledges.total / this.property.priceCents ) * 100);
  }

  get pledgedPercent(){
    if (!this.property.pledges ) {
      return 0;
    }
    return ((this.property.pledges.total / this.property.priceCents ) );
  }


  pledge(amount: number) {
    const pledge = new Pledge();
    pledge.amountCents = amount;
    pledge.property_id = this.property.id;

    this._pledgeService.addPledge(pledge);
  }
}

