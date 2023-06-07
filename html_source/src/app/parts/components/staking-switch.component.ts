import { Component, EventEmitter, Input, Output } from '@angular/core';
import { BackendService } from '@api/services/backend.service';
import { VariablesService } from '../services/variables.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-staking-switch',
  template: `
    <div
      (click)="toggleStaking(); $event.stopPropagation()"
      [class.off]="!staking"
      [class.on]="staking"
      class="switch"
    >
      <span class="circle"></span>
    </div>
  `,
  styles: [],
  standalone: true,
  imports: [CommonModule],
})
export class StakingSwitchComponent {
  @Input() wallet_id: number;

  @Input() staking: boolean;

  @Output() stakingChange = new EventEmitter<boolean>();

  constructor(
    private backendService: BackendService,
    private variablesService: VariablesService
  ) {}

  toggleStaking(): void {
    const wallet = this.variablesService.getWallet(this.wallet_id);
    if (wallet && wallet.loaded) {
      this.stakingChange.emit(!this.staking);
      if (!this.staking) {
        this.backendService.startPosMining(this.wallet_id);
      } else {
        this.backendService.stopPosMining(this.wallet_id);
      }
    }
  }
}
