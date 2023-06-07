import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoneyToIntPipe } from '@parts/pipes/money-to-int-pipe/money-to-int.pipe';

@NgModule({
  declarations: [MoneyToIntPipe],
  exports: [MoneyToIntPipe],
  providers: [MoneyToIntPipe],
  imports: [CommonModule],
})
export class MoneyToIntPipeModule {}
