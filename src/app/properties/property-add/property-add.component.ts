import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {PropertyService} from '../services/properties.service';

@Component({
  selector: 'app-property-add',
  templateUrl: './property-add.component.html',
  styleUrls: ['property-add.component.css'],
})
export class PropertyAddComponent implements OnInit {


  terrainsObject: [
    { name: 'Mountains', selected: false },
    { name: 'Rivers', selected: false },
    { name: 'Streams', selected: false }

    ];


  published = false;

  public addPropertyForm: FormGroup;

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
      //terrains: [this.buildTerrains(), [Validators.required]],
      city: ['', [Validators.required]],
      published: ['', [Validators.required]]
    });
  }

  reset() {
    this.addPropertyForm.reset();
  }


  buildTerrains() {
    const arr = this.terrainsObject.map(terrain => {
      return this.fb.control(terrain.selected);
    });
    return this.fb.array(arr);
  }
}
