


import {Component} from '@angular/core';

@Component({
  selector: 'app-authentication',
  template: `<router-outlet></router-outlet>`,
  styles: []
})
export class AuthenticationComponent {

  links = [
    {link: 'add', label: 'Add Property'},
    {link: 'test', label: 'Test'}
  ];
}
