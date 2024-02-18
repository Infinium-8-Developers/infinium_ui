import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { DragScrollModule } from 'cdk-drag-scroll';
import { TooltipModule } from '../_helpers/directives/tooltip.module';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { SynchronizationStatusModule } from '../synchronization-status/synchronization-status.module';
import { PipesModule } from '../_helpers/pipes/pipes.module';
import { DisablePriceFetchModule } from '../_shared/directives/disable-price-fetch/disable-price-fetch.module';
import { ConfirmModalModule } from '../_helpers/modals/confirm-modal/confirm-modal.module';
import { DeeplinkModule } from '../deeplink/deeplink.module';
import { StakingSwitchModule } from '../_helpers/directives/staking-switch/staking-switch.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [SidebarComponent],
            imports: [
              CommonModule,
              RouterModule,
              DragDropModule,
              DragScrollModule,
              TooltipModule,
              PipesModule,
              TranslateModule,
              DisablePriceFetchModule,
              ConfirmModalModule,
              SynchronizationStatusModule,
              DeeplinkModule,
              StakingSwitchModule,
              FlexLayoutModule
            ],
  exports: [SidebarComponent]
})
export class SidebarModule { }
