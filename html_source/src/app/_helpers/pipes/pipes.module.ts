import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IntToMoneyPipe } from './int-to-money.pipe';
import { SafeHTMLPipe } from './safe-html.pipe';
import { MoneyToIntPipe } from './money-to-int.pipe';
import { HistoryTypeMessagesPipe } from './history-type-messages.pipe';
import { ContractTimeLeftPipe } from './contract-time-left.pipe';
import { ContractStatusMessagesPipe } from './contract-status-messages.pipe';

@NgModule({
            declarations: [IntToMoneyPipe, SafeHTMLPipe, MoneyToIntPipe, HistoryTypeMessagesPipe, ContractTimeLeftPipe, ContractStatusMessagesPipe],
            imports: [
              CommonModule
            ],
            exports: [IntToMoneyPipe, SafeHTMLPipe, MoneyToIntPipe, HistoryTypeMessagesPipe, ContractTimeLeftPipe, ContractStatusMessagesPipe],
            providers: [IntToMoneyPipe, SafeHTMLPipe, MoneyToIntPipe, HistoryTypeMessagesPipe, ContractTimeLeftPipe, ContractStatusMessagesPipe]
          })
export class PipesModule {
}
