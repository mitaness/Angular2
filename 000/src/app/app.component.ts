import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  template: `
  <a [routerLink]="['/cad']">Show list</a>
    <router-outlet />
  `,
  styles: []
})
export class AppComponent {
  title = '000';
}
