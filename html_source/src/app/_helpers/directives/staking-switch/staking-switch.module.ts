import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StakingSwitchComponent } from './staking-switch.component';

@NgModule({
  declarations: [StakingSwitchComponent],
  imports: [
    CommonModule
  ],
  exports: [StakingSwitchComponent]
})
export class StakingSwitchModule { }
