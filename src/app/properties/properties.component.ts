


import {Component} from '@angular/core';
import {AuthenticationService} from "../auth/services/authentication.service";
import {PledgeService} from "../services/pledge.service";

@Component({
  selector: 'app-properties',
  template: `

  
    <button *ngIf="(authService.user | async)" mat-raised-button
            color="accent"
            routerLink="add">Add Property</button>
    
    <router-outlet></router-outlet>
  `,
  styles: []
})
export class PropertiesComponent {


  constructor(public authService: AuthenticationService, public pledges: PledgeService) { }
  links = [
    {link: 'add', label: 'Add Property'},
    {link: 'test', label: 'Test'}
  ];
}
