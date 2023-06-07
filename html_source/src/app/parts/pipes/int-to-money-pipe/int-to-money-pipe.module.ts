import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntToMoneyPipe } from '@parts/pipes/int-to-money-pipe/int-to-money.pipe';

@NgModule({
  declarations: [IntToMoneyPipe],
  exports: [IntToMoneyPipe],
  providers: [IntToMoneyPipe],
  imports: [CommonModule],
})
export class IntToMoneyPipeModule {}
