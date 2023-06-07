import { Component } from '@angular/core';

@Component({
  selector: 'app-with-sidebar-layout',
  template: `
    <app-sidebar></app-sidebar>

    <div class="overflow-auto p-2" fxFlex="100">
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      :host {
        width: 100%;
        height: 100%;
        overflow: hidden;

        display: flex;
      }
    `,
  ],
})
export class WithSidebarLayoutComponent {}
