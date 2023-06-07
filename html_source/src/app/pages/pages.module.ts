import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthModule } from './auth/auth.module';
import { WalletModule } from './wallet/wallet.module';
import { PagesRoutingModule } from './pages-routing.module';
import { LoginComponent } from './auth/login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { AddWalletComponent } from './add-wallet/add-wallet.component';
import { CreateWalletComponent } from './create-wallet/create-wallet.component';
import { OpenWalletComponent } from './open-wallet/open-wallet.component';
import { RestoreWalletComponent } from './restore-wallet/restore-wallet.component';
import { SeedPhraseComponent } from './seed-phrase/seed-phrase.component';
import { AssignAliasComponent } from './assign-alias/assign-alias.component';
import { EditAliasComponent } from './edit-alias/edit-alias.component';
import { PurchaseComponent } from './wallet/tabs/contracts/purchase/purchase.component';
import { ModalContainerComponent } from '@parts/modals/modal-container/modal-container.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { DisablePriceFetchModule, DefaultImgModule } from '@parts/directives';
import { TooltipModule } from '@parts/directives/tooltip/tooltip.module';
import { ConfirmModalModule } from '@parts/modals/confirm-modal/confirm-modal.module';
import { DeeplinkModule } from './deeplink/deeplink.module';
import { FullLayoutModule } from '../layouts/full-layout/full-layout.module';
import { WithSidebarLayoutModule } from '../layouts/with-sidebar-layout/with-sidebar-layout.module';
import { OverlayModule } from '@angular/cdk/overlay';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { TransferAliasComponent } from './transfer-alias/transfer-alias.component';
import {
  ContractStatusMessagesPipeModule,
  ContractTimeLeftPipeModule,
  HistoryTypeMessagesPipeModule,
  IntToMoneyPipeModule,
  IsAvailableAliasNamePipeModule,
  MoneyToIntPipeModule,
  SafeHtmlPipeModule,
  ShortStringPipeModule,
} from '@parts/pipes';
import { InputValidateModule } from '@parts/directives/input-validate';
import { InputDisableSelectionModule } from '@parts/directives/input-disable-selection';
import { BackButtonModule } from '@parts/directives/back-button/back-button.module';
import { UiKitComponent } from './ui-kit/ui-kit.component';
import { CheckboxComponent } from '@parts/components/checkbox.component';
import { CopyButtonComponent } from '@parts/components/copy-button.component';
import { StakingSwitchComponent } from '@parts/components/staking-switch.component';
import { SwitchComponent } from '@parts/components/switch.component';
import { SynchronizationStatusComponent } from '@parts/components/synchronization-status.component';
import { LoaderComponent } from '@parts/components/loader.component';

@NgModule({
  declarations: [
    LoginComponent,
    SettingsComponent,
    AddWalletComponent,
    CreateWalletComponent,
    OpenWalletComponent,
    RestoreWalletComponent,
    SeedPhraseComponent,
    AssignAliasComponent,
    EditAliasComponent,
    TransferAliasComponent,
    PurchaseComponent,
    ModalContainerComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PagesRoutingModule,
    AuthModule,
    WalletModule,
    NgSelectModule,
    TranslateModule.forChild(),
    FlexLayoutModule,
    DisablePriceFetchModule,
    TooltipModule,
    ConfirmModalModule,
    DeeplinkModule,
    FullLayoutModule,
    WithSidebarLayoutModule,
    OverlayModule,
    DefaultImgModule,
    ContractStatusMessagesPipeModule,
    ContractTimeLeftPipeModule,
    HistoryTypeMessagesPipeModule,
    IntToMoneyPipeModule,
    IsAvailableAliasNamePipeModule,
    MoneyToIntPipeModule,
    SafeHtmlPipeModule,
    ShortStringPipeModule,
    InputValidateModule,
    InputDisableSelectionModule,
    BackButtonModule,

    // Standalone components
    UiKitComponent,
    CheckboxComponent,
    CopyButtonComponent,
    StakingSwitchComponent,
    SwitchComponent,
    SynchronizationStatusComponent,
    LoaderComponent,
  ],
})
export class PagesModule {}
