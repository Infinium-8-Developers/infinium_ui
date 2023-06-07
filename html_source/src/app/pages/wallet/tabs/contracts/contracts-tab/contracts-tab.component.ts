import { Component } from '@angular/core';

@Component({
  selector: 'app-contracts-tab',
  template: ` <router-outlet></router-outlet> `,
  styles: [
    `
      :host {
        width: 100%;
        height: auto;
      }
    `,
  ],
})
export class ContractsTabComponent {}
