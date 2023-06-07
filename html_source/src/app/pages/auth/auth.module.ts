import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthRoutingModule } from './auth-routing.module';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NoWalletComponent } from './no-wallet/no-wallet.component';
import { SynchronizationStatusComponent } from '@parts/components/synchronization-status.component';

@NgModule({
  declarations: [NoWalletComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    TranslateModule,
    FlexLayoutModule,
    SynchronizationStatusComponent,
  ],
})
export class AuthModule {}
