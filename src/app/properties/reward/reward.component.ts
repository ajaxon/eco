import {Component, Input} from "@angular/core";
import {Property, Reward} from "../models/property.model";
import {PropertyService} from "../services/properties.service";

@Component({
  selector: 'app-reward',
  template: `
    <mat-card>
    {{reward.id}}
    {{reward.pledgeCount}}/{{reward.maxPledges}}
    </mat-card>
  `,
  styles: []
})
export class RewardComponent {


  @Input() reward: Reward;


  constructor(){
  }
  links = [
    {link: 'add', label: 'Add Property'},
    {link: 'test', label: 'Test'}
  ]



}
