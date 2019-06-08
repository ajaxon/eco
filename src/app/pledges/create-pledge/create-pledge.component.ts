import { Component, OnInit, Input, ChangeDetectorRef, ViewChild, ElementRef, AfterViewInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { PledgeService } from '../../core/services/pledge.service';
import { Pledge } from '../../models/pledge.model';
import { Property } from '../../models/property.model';
import { AuthenticationService } from '../../auth/services/authentication.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '../../../../node_modules/@angular/material';

export interface DialogData {
  property_id: string;
}
@Component({
  selector: 'app-create-pledge',
  templateUrl: './create-pledge.component.html',
  styleUrls: ['./create-pledge.component.scss']
})
export class CreatePledgeComponent implements AfterViewInit, OnInit {

  @ViewChild('cardInfo') cardInfo: ElementRef;
  
  pledgeForm: FormGroup;
  billingForm: FormGroup;
  error: string;
  card: any;
  cardHandler = this.onChange.bind(this);
  @Input() property: Property;

  constructor(private cd: ChangeDetectorRef, 
    public dialogRef: MatDialogRef<CreatePledgeComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder, private pledgeService: PledgeService, private authService: AuthenticationService) {

      console.log(data);
  }

  ngOnInit() {

    this.pledgeForm = this.fb.group({
      amountCents: ['', Validators.required]
    });


    this.billingForm = this.fb.group({
      street: ['', Validators.required]
    });
  }


  ngAfterViewInit() {
   
  }


  private onChange({ error }) {
    if (error) {
      this.error = error.message;
    } else {
      this.error = null;
    }
    this.cd.detectChanges();
  }

  public createPledge() {

    this.authService.user.subscribe( user => {
      if (user) {

        let pledge = new Pledge();
        pledge = this.pledgeForm.getRawValue();
        pledge.amountCents *= 100;
        pledge.property_id = this.property.id;
        pledge.user_id = user.uid;
        console.log("Pledge ", pledge);
        this.pledgeService.addPledge(pledge);


      } else {
        console.log("User not logged in");
      }
    });

  }


  isLinear(): boolean {
    return true;
  }


}
