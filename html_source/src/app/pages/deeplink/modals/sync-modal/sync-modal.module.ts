import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SyncModalComponent } from './sync-modal.component';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [SyncModalComponent],
  imports: [CommonModule, FlexLayoutModule],
  exports: [SyncModalComponent],
})
export class SyncModalModule {}
