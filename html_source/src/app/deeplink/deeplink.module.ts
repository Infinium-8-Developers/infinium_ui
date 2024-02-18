import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeeplinkModalModule } from '../deeplink-modal/deeplink-modal.module';
import { SyncModalModule } from '../_helpers/modals/sync-modal/sync-modal.module';
import { DeeplinkComponent } from './deeplink.component';

@NgModule({
  declarations: [DeeplinkComponent],
  imports: [
    CommonModule,
    DeeplinkModalModule,
    SyncModalModule
  ],
  exports: [DeeplinkComponent, DeeplinkModalModule, SyncModalModule],
  entryComponents: [DeeplinkComponent]
})
export class DeeplinkModule { }
