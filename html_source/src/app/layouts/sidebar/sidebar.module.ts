import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SidebarComponent } from './sidebar.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TranslateModule } from '@ngx-translate/core';
import { RouterModule } from '@angular/router';
import { DisablePriceFetchModule, TooltipModule } from '@parts/directives';
import { ConfirmModalModule } from '@parts/modals/confirm-modal/confirm-modal.module';
import { DeeplinkModule } from '../../pages/deeplink/deeplink.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { IntToMoneyPipeModule } from '@parts/pipes';
import { StakingSwitchComponent } from '@parts/components/staking-switch.component';
import { SynchronizationStatusComponent } from '@parts/components/synchronization-status.component';
import { WalletCardComponent } from '@parts/components/wallet-card.component';

@NgModule({
  declarations: [SidebarComponent],
  imports: [
    CommonModule,
    RouterModule,
    DragDropModule,
    TooltipModule,
    TranslateModule,
    DisablePriceFetchModule,
    ConfirmModalModule,
    SynchronizationStatusComponent,
    DeeplinkModule,
    StakingSwitchComponent,
    FlexLayoutModule,
    IntToMoneyPipeModule,
    WalletCardComponent,
  ],
  exports: [SidebarComponent],
})
export class SidebarModule {}
