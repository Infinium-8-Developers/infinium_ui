import { Component, Input } from '@angular/core';
import { BackendService } from '@api/services/backend.service';
import { VariablesService } from '../services/variables.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-copy-button',
  template: `
    <button (click)="copy()" [classList]="'btn-icon circle' + ' ' + size">
      <i
        [class.check]="copyAnimation"
        [class.copy]="!copyAnimation"
        class="icon small"
      ></i>
    </button>
  `,
  styles: [],
  standalone: true,
  imports: [CommonModule],
})
export class CopyButtonComponent {
  @Input() value: string;

  @Input() size: 'small' | 'big' = 'small';

  copyAnimation = false;

  copyAnimationTimeout;

  constructor(
    private backend: BackendService,
    public variablesService: VariablesService
  ) {}

  copy(): void {
    this.backend.setClipboard(this.value || '');
    this.copyAnimation = true;
    this.copyAnimationTimeout = window.setTimeout(() => {
      this.copyAnimation = false;
      clearTimeout(this.copyAnimationTimeout);
    }, 2000);
  }
}
