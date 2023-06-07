import { Component } from '@angular/core';

@Component({
  selector: 'app-full-layout',
  template: `
    <div class="overflow-auto p-2" fxFlex="100" fxFlexFill>
      <router-outlet></router-outlet>
    </div>
  `,
  styles: [
    `
      :host {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    `,
  ],
})
export class FullLayoutComponent {}
