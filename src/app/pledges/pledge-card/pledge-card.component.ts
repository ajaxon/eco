import {Component, Input, OnInit} from '@angular/core';
import {PledgeService} from "../../core/services/pledge.service";
import { Pledge } from '../../models/pledge.model';

@Component({
  selector: 'app-pledge-card',
  templateUrl: './pledge-card.component.html',
  styleUrls: ['./pledge-card.component.scss']
})
export class PledgeCardComponent implements OnInit {

  @Input() pledge: Pledge;

  constructor (private _pledgeService : PledgeService) {}

  ngOnInit() {
  }

  cancelPledge(pledge: Pledge) {
    console.log("Pledge ", pledge);
    this._pledgeService.deletePledge(pledge);
  }

}
