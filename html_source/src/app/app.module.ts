import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SettingsComponent } from './settings/settings.component';
import { AddWalletComponent } from './add-wallet/add-wallet.component';
import { CreateWalletComponent } from './create-wallet/create-wallet.component';
import { OpenWalletComponent } from './open-wallet/open-wallet.component';
import { OpenWalletModalComponent } from './open-wallet-modal/open-wallet-modal.component';
import { RestoreWalletComponent } from './restore-wallet/restore-wallet.component';
import { SeedPhraseComponent } from './seed-phrase/seed-phrase.component';
import { WalletDetailsComponent } from './wallet-details/wallet-details.component';
import { AssignAliasComponent } from './assign-alias/assign-alias.component';
import { EditAliasComponent } from './edit-alias/edit-alias.component';
import { TransferAliasComponent } from './transfer-alias/transfer-alias.component';
import { WalletComponent } from './wallet/wallet.component';
import { SendComponent } from './send/send.component';
import { ReceiveComponent } from './receive/receive.component';
import { HistoryComponent } from './history/history.component';
import { ContractsComponent } from './contracts/contracts.component';
import { PurchaseComponent } from './purchase/purchase.component';
import { StakingComponent } from './staking/staking.component';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BackendService } from './_helpers/services/backend.service';
import { ModalService } from './_helpers/services/modal.service';
import { PaginationStore } from './_helpers/services/pagination.store';
import { Store } from 'store';
import { InputValidateDirective } from './_helpers/directives/input-validate/input-validate.directive';
import { ModalContainerComponent } from './_helpers/modals/modal-container/modal-container.component';
import { TransactionDetailsComponent } from './_helpers/directives/transaction-details/transaction-details.component';
import { ContextMenuModule } from 'ngx-contextmenu';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting.src';
import { InputDisableSelectionDirective } from './_helpers/directives/input-disable-selection/input-disable-selection.directive';
import { SendModalComponent } from './send-modal/send-modal.component';
import { ContactsComponent } from './contacts/contacts.component';
import { AddContactsComponent } from './add-contacts/add-contacts.component';
import { ContactSendComponent } from './contact-send/contact-send.component';
import { ExportImportComponent } from './export-import/export-import.component';
import { PapaParseModule } from 'ngx-papaparse';
import { ExportHistoryModalComponent } from './_helpers/modals/export-history-modal/export-history-modal.component';
import { ContractsTabComponent } from './contracts/contracts-tab/contracts-tab.component';
import { SendDetailsModalComponent } from './send-details-modal/send-details-modal.component';
import { DisablePriceFetchModule } from './_shared/directives/disable-price-fetch/disable-price-fetch.module';
import { SharedModule } from './_shared/shared.module';
import { SynchronizationStatusModule } from './synchronization-status/synchronization-status.module';
import { TooltipModule } from './_helpers/directives/tooltip.module';
import { WithSidebarLayoutModule } from './layouts/with-sidebar-layout/with-sidebar-layout.module';
import { FullLayoutModule } from './layouts/full-layout/full-layout.module';
import { PipesModule } from './_helpers/pipes/pipes.module';
import { ConfirmModalModule } from './_helpers/modals/confirm-modal/confirm-modal.module';
import { DeeplinkModule } from './deeplink/deeplink.module';
import { StakingSwitchModule } from './_helpers/directives/staking-switch/staking-switch.module';
import { FlexLayoutModule } from '@angular/flex-layout';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

export function highchartsFactory() {
  highcharts.setOptions({
                          time: {
                            useUTC: false
                          }
                        });

  return [exporting];
}

@NgModule({
            declarations: [
              AppComponent,
              LoginComponent,
              SettingsComponent,
              AddWalletComponent,
              CreateWalletComponent,
              OpenWalletComponent,
              OpenWalletModalComponent,
              RestoreWalletComponent,
              SeedPhraseComponent,
              WalletDetailsComponent,
              AssignAliasComponent,
              EditAliasComponent,
              TransferAliasComponent,
              WalletComponent,
              SendComponent,
              ReceiveComponent,
              HistoryComponent,
              ContractsComponent,
              PurchaseComponent,
              StakingComponent,
              InputValidateDirective,
              ModalContainerComponent,
              TransactionDetailsComponent,
              InputDisableSelectionDirective,
              SendModalComponent,
              ContactsComponent,
              AddContactsComponent,
              ContactSendComponent,
              ExportImportComponent,
              ExportHistoryModalComponent,
              ContractsTabComponent,
              SendDetailsModalComponent,
            ],
            imports: [
              BrowserModule,
              AppRoutingModule,
              HttpClientModule,
              TranslateModule.forRoot({
                                        loader: {
                                          provide: TranslateLoader,
                                          useFactory: HttpLoaderFactory,
                                          deps: [HttpClient]
                                        }
                                      }),
              FormsModule,
              ReactiveFormsModule,
              NgSelectModule,
              ChartModule,
              FlexLayoutModule,
              PapaParseModule,
              DisablePriceFetchModule,
              TooltipModule,
              ConfirmModalModule,
              PipesModule,
              DeeplinkModule,
              StakingSwitchModule,
              FullLayoutModule,
              WithSidebarLayoutModule,
              SynchronizationStatusModule,
              SharedModule,
              ContextMenuModule.forRoot(),
            ],
            providers: [
              Store,
              BackendService,
              ModalService,
              PaginationStore,
              { provide: HIGHCHARTS_MODULES, useFactory: highchartsFactory }
            ],
            entryComponents: [
              ModalContainerComponent,
              SendModalComponent,
              ExportHistoryModalComponent,
            ],
            bootstrap: [AppComponent]
          })
export class AppModule {
}
