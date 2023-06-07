import { Component } from '@angular/core';
import { SwitchComponent } from '@parts/components/switch.component';

@Component({
  selector: 'app-switches',
  template: `
    <h3 class="mb-1">Switch default</h3>
    <app-switch class="mb-1"></app-switch>

    <h3 class="mb-1">value = true</h3>
    <app-switch [value]="true" class="mb-1"></app-switch>

    <h3 class="mb-1">value = true, disabled = true</h3>
    <app-switch [disabled]="true" [value]="true" class="mb-1"></app-switch>
  `,
  styles: [],
  standalone: true,
  imports: [SwitchComponent],
})
export class SwitchesComponent {}
