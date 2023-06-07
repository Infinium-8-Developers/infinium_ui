import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContractStatusMessagesPipe } from '@parts/pipes/contract-status-messages-pipe/contract-status-messages.pipe';

@NgModule({
  declarations: [ContractStatusMessagesPipe],
  exports: [ContractStatusMessagesPipe],
  providers: [ContractStatusMessagesPipe],
  imports: [CommonModule],
})
export class ContractStatusMessagesPipeModule {}
