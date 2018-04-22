import { Component, OnInit } from '@angular/core';
import {AuthenticationService} from '../auth/services/authentication.service';

@Component({
  selector: 'app-header',
  template: `
    <mat-toolbar color="primary">

      <button mat-raised-button
              mat-tooltip="Back to Home"
              tooltip-position="below"
              color="accent">
        <mat-icon  routerLink="/">home</mat-icon>
      </button>

      <span *ngIf="(authService.user | async)">
     <button mat-raised-button
             color="accent"
             (click)="this.authService.logout()">Logout</button>
  </span>

      <button  *ngIf="!(authService.user | async)"
               mat-raised-button
               routerLink="/auth"
               color = "accent">Login</button>


      <span class="example-fill-remaining-space"></span>
      <a routerLink="/properties">Properties</a>

    </mat-toolbar>


    <mat-sidenav-container class="example-container">
      <mat-sidenav #sidenav
                   mode="side"
                   opened="true"
                   class="example-sidenav">
        Jolly good!
      </mat-sidenav>

      <div class="example-sidenav-content">
        <button type="button" mat-button (click)="sidenav.open()">
          Open sidenav
        </button>
        <button type="button" mat-button (click)="sidenav.close()">
          Close sidenav
        </button>
      </div>

    </mat-sidenav-container>
  `,
  styles: []
})
export class HeaderComponent implements OnInit {

  constructor(public authService: AuthenticationService) { }

  ngOnInit() {
  }

}
