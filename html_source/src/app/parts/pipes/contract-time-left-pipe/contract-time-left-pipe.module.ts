import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractTimeLeftPipe } from '@parts/pipes/contract-time-left-pipe/contract-time-left.pipe';

@NgModule({
  declarations: [ContractTimeLeftPipe],
  exports: [ContractTimeLeftPipe],
  providers: [ContractTimeLeftPipe],
  imports: [CommonModule],
})
export class ContractTimeLeftPipeModule {}
