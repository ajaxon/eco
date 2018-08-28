


import {Component} from '@angular/core';
import {AuthenticationService} from "../auth/services/authentication.service";
import {PledgeService} from "../core/services/pledge.service";

@Component({
  selector: 'app-properties',
  template: `
    <div class="container">
    <router-outlet></router-outlet>
    <button *ngIf="(authService.isAdmin$ | async)"
            color="accent"
            routerLink="add">Add Property</button>

    </div>
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
