import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeeplinkModalModule } from './modals/deeplink-modal/deeplink-modal.module';
import { DeeplinkComponent } from './deeplink.component';
import { SyncModalModule } from './modals/sync-modal/sync-modal.module';

@NgModule({
  declarations: [DeeplinkComponent],
  imports: [CommonModule, DeeplinkModalModule, SyncModalModule],
  exports: [DeeplinkComponent, DeeplinkModalModule, SyncModalModule],
})
export class DeeplinkModule {}
