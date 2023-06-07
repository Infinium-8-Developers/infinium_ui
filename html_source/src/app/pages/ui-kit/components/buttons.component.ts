import { Component } from '@angular/core';

@Component({
  selector: 'app-buttons',
  template: `
    <h3 class="mb-1">Primary</h3>
    <button class="m-1 primary small">Add Wallet</button>
    <button class="m-1 primary big">Add / Save</button>
    <button class="m-1 primary big" disabled>Add / Save</button>

    <h3 class="mb-1">Outline</h3>
    <button class="m-1 outline small">
      <i class="icon plus mr-1"></i>Add Wallet
    </button>
    <button class="m-1 outline big">Add / Save</button>
    <button class="m-1 outline big" disabled>Add / Save</button>

    <h3 class="mb-1">Circle</h3>
    <button class="m-1 btn-icon circle small mr-2">
      <i class="icon dropdown-arrow-left"></i>
    </button>
    <button class="m-1 btn-icon circle big mr-2">
      <i class="icon dropdown-arrow-left"></i>
    </button>
    <button class="m-1 btn-icon circle big mr-2" disabled>
      <i class="icon dropdown-arrow-left"></i>
    </button>
  `,
  styles: [],
  standalone: true,
})
export class ButtonsComponent {}
