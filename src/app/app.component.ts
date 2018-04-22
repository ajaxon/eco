import { Component } from '@angular/core';
import {NavigationCancel, NavigationEnd, NavigationError, NavigationStart, Router, RouterEvent} from "@angular/router";
import {routerTransition} from "./core/animations/router.transition";

@Component({
  selector: 'app-root',
  template: `
    <app-header></app-header>
    <router-outlet>
      <mat-spinner style="margin:0 auto" *ngIf="loading"></mat-spinner>

    </router-outlet>
  `,
  styles: [],
  animations: [routerTransition]

})
export class AppComponent {


  loading = false;


  constructor(private router: Router) {
    router.events.subscribe((value: RouterEvent) => {
      this.navigationInterceptor(event);
    });
  }

// Shows and hides the loading spinner during RouterEvent changes
  navigationInterceptor(event: Event): void {
    if (event instanceof NavigationStart) {
      this.loading = true;
    }
    if (event instanceof NavigationEnd) {
      // setTimeout(() => { this.loading = false; }, 1000);
      this.loading = false;
    }
    // Set loading state to false in both of the below events to hide the spinner in case a request fails
    if (event instanceof NavigationCancel) {
      this.loading = false;
    }
    if (event instanceof NavigationError) {
      this.loading = false;
    }
  }


}
