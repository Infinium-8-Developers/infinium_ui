import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryTypeMessagesPipe } from '@parts/pipes/history-type-messages-pipe/history-type-messages.pipe';

@NgModule({
  declarations: [HistoryTypeMessagesPipe],
  exports: [HistoryTypeMessagesPipe],
  providers: [HistoryTypeMessagesPipe],
  imports: [CommonModule],
})
export class HistoryTypeMessagesPipeModule {}
