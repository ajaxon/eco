import { Component, OnInit } from '@angular/core';
import {PledgeService} from "../../core/services/pledge.service";
import {Observable} from "rxjs/Rx";
import { Pledge } from '../../models/pledge.model';

@Component({
  selector: 'app-user-pledges',
  templateUrl: './user-pledges.component.html',
  styleUrls: ['./user-pledges.component.scss']
})
export class UserPledgesComponent implements OnInit {

  pledges$: Observable<Pledge[]>;

  constructor(private _pledgeService: PledgeService) { }

  ngOnInit() {
    this.pledges$ = this._pledgeService.getUserPledges();
  }

}
