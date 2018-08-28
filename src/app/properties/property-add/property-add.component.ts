import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PropertyService} from '../services/properties.service';

@Component({
  selector: 'app-property-add',
  template: `



    <div class="container">

      <form [formGroup]='addPropertyForm' (ngSubmit)="add()" class="example-container" novalidate>
        <input formControlName="title" placeholder="Title" required dividerColor="accent">


        <input type="text" formControlName="description" placeholder="Description">

        <input type="text" formControlName="city" placeholder="City">

        <input type="number" formControlName="parcelSize" placeholder="Parcel Size">
        <input type="number" formControlName="priceCents" placeholder="Price in Cents">

        
        <input type="checkbox" formControlName="published" placeholder="Published">
        <button [disabled]="addPropertyForm.pristine" type="submit">Add</button>

        <button [disabled]="addPropertyForm.pristine" (click)="reset()">Reset</button>


      </form>
    </div>

  `,
  styleUrls: ['property-add.component.css'],
})
export class PropertyAddComponent implements OnInit {


  terrainsObject: [
    { name: 'Mountains', selected: false },
    { name: 'Rivers', selected: false },
    { name: 'Streams', selected: false }

    ];


  published = false;

  addPropertyForm: FormGroup;

  constructor(private fb: FormBuilder, private propertyService: PropertyService) {
  }

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
      terrains: [this.buildTerrains(), [Validators.required]],
      city: ['', [Validators.required]],
      published: ['', [Validators.required]]
    });
  }

  reset() {
    this.addPropertyForm.reset();
  }


  get title() {
    return this.addPropertyForm.get('title');
  }

  get description() {
    return this.addPropertyForm.get('description');
  }


  buildTerrains() {
    const arr = this.terrainsObject.map(terrain => {
      return this.fb.control(terrain.selected);
    });
    return this.fb.array(arr);
  }
}
