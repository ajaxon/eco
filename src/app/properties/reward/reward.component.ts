import {Component, Input} from '@angular/core';
import {PropertyService} from '../services/properties.service';
import { Reward } from '../../models/property.model';

@Component({
  selector: 'app-reward',
  template: `
    {{ reward.id }}
    {{ reward.pledgeCount }}/{{ reward.maxPledges }}
  `,
  styles: []
})
export class RewardComponent {
  @Input() reward: Reward;

  constructor(private _propertyService: PropertyService) {
  }


  delete() {

    this._propertyService.deleteReward(this.reward);
  }


}
