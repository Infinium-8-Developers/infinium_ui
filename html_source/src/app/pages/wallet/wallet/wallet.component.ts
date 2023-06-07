import {
  Component,
  HostListener,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VariablesService } from '@parts/services/variables.service';
import { BackendService, Commands } from '@api/services/backend.service';
import { TranslateService } from '@ngx-translate/core';
import { IntToMoneyPipe } from '@parts/pipes/int-to-money-pipe/int-to-money.pipe';
import { Subject } from 'rxjs';
import { StateKeys, Store, Sync } from '@store/store';
import { distinctUntilChanged, filter, takeUntil } from 'rxjs/operators';
import { hasOwnProperty } from '@parts/functions/hasOwnProperty';
import { Dialog, DialogConfig } from '@angular/cdk/dialog';
import {
  ConfirmModalComponent,
  ConfirmModalData,
} from '@parts/modals/confirm-modal/confirm-modal.component';
import { ExportHistoryModalComponent } from './modals/export-history-modal/export-history-modal.component';
import { AddCustomTokenComponent } from './modals/add-custom-token/add-custom-token.component';
import { Asset } from '@api/models/assets.model';
import { AssetDetailsComponent } from '@parts/modals/asset-details/asset-details.component';
import { WalletsService } from '@parts/services/wallets.service';

@Component({
  selector: 'app-wallet',
  template: `
    <div
      class="header mb-2"
      fxFlex="0 0 auto"
      fxLayout="row nowrap"
      fxLayoutAlign="space-between start"
      fxLayoutGap="1rem"
    >
      <div class="left overflow-hidden">
        <div
          class="wallet-wrapper"
          fxLayout="column"
          fxLayoutAlign="start start"
        >
          <div class="title" fxLayout="row nowrap" fxLayoutAlign="start center">
            <h1 class="text-ellipsis mr-1">
              {{ variablesService.currentWallet.address | infiniumShortString }}
            </h1>

            <app-copy-button
              [delay]="150"
              [placement]="'bottom'"
              [timeout]="0"
              [tooltipClass]="'table-tooltip'"
              [tooltip]="variablesService.currentWallet.address"
              [value]="variablesService.currentWallet.address"
              class="mr-1"
            >
            </app-copy-button>

            <div
              *ngIf="!variablesService.currentWallet.is_auditable"
              class="controls"
              fxFlex="0 0 auto"
              fxLayout="row"
              fxLayoutAlign="start center"
            >
              <ng-container
                *ngIf="
                  !variablesService.currentWallet.alias.hasOwnProperty(
                    'name'
                  ) &&
                  variablesService.currentWallet.loaded &&
                  variablesService.daemon_state === 2 &&
                  variablesService.currentWallet.alias_available
                "
              >
                <button
                  [routerLink]="['/assign-alias']"
                  class="px-1 py-0_5 bg-light-gray"
                >
                  {{ 'WALLET.REGISTER_ALIAS' | translate }}
                </button>
              </ng-container>

              <ng-container
                *ngIf="
                  variablesService.currentWallet.alias.hasOwnProperty('name') &&
                  variablesService.currentWallet.loaded &&
                  variablesService.daemon_state === 2
                "
              >
                <div
                  [class.available]="
                    variablesService.currentWallet.alias | isAvailableAliasName
                  "
                  class="alias mr-1"
                >
                  {{ variablesService.currentWallet.alias.name }}
                </div>

                <ng-container
                  *ngIf="variablesService.currentWallet.alias_available"
                >
                  <button
                    [delay]="500"
                    [routerLink]="['/edit-alias']"
                    [timeDelay]="500"
                    class="btn-icon circle small mr-1"
                    placement="bottom-right"
                    tooltip="{{ 'WALLET.TOOLTIPS.EDIT_ALIAS' | translate }}"
                    tooltipClass="table-tooltip account-tooltip"
                  >
                    <i class="icon edit-square"></i>
                  </button>

                  <button
                    [delay]="500"
                    [routerLink]="['/transfer-alias']"
                    [timeDelay]="500"
                    class="btn-icon circle small"
                    placement="right"
                    tooltip="{{ 'WALLET.TOOLTIPS.TRANSFER_ALIAS' | translate }}"
                    tooltipClass="table-tooltip account-tooltip"
                  >
                    <i class="icon arrow-up-square"></i>
                  </button>
                </ng-container>
              </ng-container>
            </div>
          </div>
        </div>
      </div>
      <div class="right">
        <div class="dropdown">
          <button
            (click)="$event.stopPropagation(); toggleMenuDropdown()"
            #trigger="cdkOverlayOrigin"
            cdkOverlayOrigin
            [disabled]="
              settingsButtonDisabled && !variablesService.currentWallet.loaded
            "
            class="btn-icon circle big"
            data-target="wallet-dropdown-button"
          >
            <i class="icon dots"></i>
          </button>
        </div>
      </div>
    </div>

    <ng-template
      (backdropClick)="$event.stopPropagation(); toggleMenuDropdown()"
      [cdkConnectedOverlayBackdropClass]="'opacity-0'"
      [cdkConnectedOverlayHasBackdrop]="true"
      [cdkConnectedOverlayOrigin]="trigger"
      [cdkConnectedOverlayOpen]="openDropdown"
      [cdkConnectedOverlayPositions]="[
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: 40
        }
      ]"
      cdkConnectedOverlay
    >
      <div (click)="toggleMenuDropdown()" class="content-bottom-right py-0_5">
        <ul class="list">
          <li class="item">
            <button
              [delay]="500"
              [disabled]="!variablesService.currentWallet.loaded"
              [routerLink]="['/details']"
              [timeDelay]="500"
              class="w-100 px-2 py-1"
              placement="left"
              routerLinkActive="active"
              tooltip="{{ 'WALLET.TOOLTIPS.SETTINGS' | translate }}"
              tooltipClass="table-tooltip account-tooltip"
              type="button"
            >
              <i class="icon settings mr-1"></i>
              <span>{{ 'WALLET_DETAILS.WALLET_OPTIONS' | translate }}</span>
            </button>
          </li>
          <li class="item">
            <button
              (click)="addCustomToken()"
              [delay]="500"
              [disabled]="false"
              [timeDelay]="500"
              class="w-100 px-2 py-1"
              placement="left"
              tooltip="{{ 'WALLET.TOOLTIPS.ADD_CUSTOM_TOKEN' | translate }}"
              tooltipClass="table-tooltip account-tooltip"
              type="button"
            >
              <i class="icon add mr-1"></i>
              <span>{{ 'WALLET_DETAILS.ADD_CUSTOM_TOKEN' | translate }}</span>
            </button>
          </li>
          <li class="item">
            <button
              (click)="exportHistory()"
              [delay]="500"
              [disabled]="variablesService.currentWallet.history.length <= 0"
              [timeDelay]="500"
              class="w-100 px-2 py-1"
              placement="left"
              tooltip="{{ 'EXPORT_HISTORY.TOOLTIP' | translate }}"
              tooltipClass="table-tooltip account-tooltip"
              type="button"
            >
              <i class="icon export mr-1"></i>
              <span>{{ 'EXPORT_HISTORY.EXPORT_BUTTON' | translate }}</span>
            </button>
          </li>
          <ng-container *ngIf="walletSyncVisible">
            <li class="item">
              <button
                (click)="
                  resyncCurrentWallet(variablesService.currentWallet.wallet_id)
                "
                [delay]="500"
                [disabled]="!variablesService.currentWallet.loaded"
                [timeDelay]="500"
                class="w-100 px-2 py-1"
                placement="left"
                tooltip="{{ 'WALLET_DETAILS.RESYNC_WALLET' | translate }}"
                tooltipClass="table-tooltip account-tooltip"
                type="button"
              >
                <i class="icon update mr-1"></i
                ><span>{{
                  'WALLET_DETAILS.RESYNC_WALLET_BUTTON' | translate
                }}</span>
              </button>
            </li>
          </ng-container>
          <li class="item">
            <button
              (click)="beforeClose(variablesService.currentWallet.wallet_id)"
              [delay]="500"
              [timeDelay]="500"
              class="w-100 px-2 py-1"
              placement="left"
              tooltip="{{ 'WALLET.TOOLTIPS.CLOSE' | translate }}"
              tooltipClass="table-tooltip account-tooltip"
              type="button"
            >
              <i class="icon close-square mr-1"></i
              ><span>{{ 'WALLET_DETAILS.BUTTON_REMOVE' | translate }}</span>
            </button>
          </li>
        </ul>
      </div>
    </ng-template>

    <div class="tabs">
      <div class="tabs-header">
        <ng-container *ngFor="let tab of tabs; let index = index">
          <button
            [disabled]="tab.disabled"
            [ngClass]="{
              hide:
                (tab.link === '/send' || tab.link === '/contracts') &&
                variablesService.currentWallet.is_watch_only &&
                variablesService.currentWallet.is_auditable
            }"
            [routerLink]="['/wallet' + tab.link]"
            class="tab-header"
            routerLinkActive="active"
          >
            <i [ngClass]="tab.icon" class="icon mr-1"></i>
            <span>{{ tab.title | translate }}</span>
            <span *ngIf="tab.indicator" class="indicator">{{
              variablesService.currentWallet.new_contracts
            }}</span>
          </button>
        </ng-container>
      </div>
      <div class="tabs-content">
        <router-outlet></router-outlet>
      </div>
    </div>
  `,
  styles: [],
})
export class WalletComponent implements OnInit, OnDestroy {
  settingsButtonInterval;

  settingsButtonDisabled = true;

  walletLoaded = false;

  openDropdown: boolean;

  walletSyncVisible = false;

  tabs = [
    {
      title: 'WALLET.TABS.ASSETS',
      icon: 'balance-icon',
      link: '/assets',
      disabled: false,
    },
    {
      title: 'WALLET.TABS.HISTORY',
      icon: 'time-circle',
      link: '/history',
      disabled: false,
    },
    {
      title: 'WALLET.TABS.SEND',
      icon: 'arrow-up-square',
      link: '/send',
      disabled: true,
    },
    {
      title: 'WALLET.TABS.RECEIVE',
      icon: 'arrow-down-square',
      link: '/receive',
      disabled: false,
    },
    {
      title: 'WALLET.TABS.STAKING',
      icon: 'staking',
      link: '/staking',
      indicator: false,
      disabled: true,
    },
  ];

  private destroy$ = new Subject<void>();

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private backend: BackendService,
    public variablesService: VariablesService,
    private ngZone: NgZone,
    private translate: TranslateService,
    private intToMoneyPipe: IntToMoneyPipe,
    private store: Store,
    private dialog: Dialog,
    private walletsService: WalletsService
  ) {
    if (
      !this.variablesService.currentWallet &&
      this.variablesService.wallets.length > 0
    ) {
      this.variablesService.setCurrentWallet(0);
    }
    this.walletLoaded = this.variablesService.currentWallet.loaded;
  }

  @HostListener('document:keydown.shift', ['$event.key'])
  onKeyPressed(): void {
    if (!this.openDropdown) {
      this.walletSyncVisible = true;
    }
  }

  @HostListener('document:keyup.shift', ['$event.key'])
  onKeyUpPressed(): void {
    if (!this.openDropdown) {
      this.walletSyncVisible = false;
    }
  }

  ngOnInit(): void {
    this.settingsButtonInterval = setInterval(() => {
      // tslint:disable-next-line:triple-equals
      if (this.variablesService.daemon_state == 2 || this.walletLoaded) {
        this.settingsButtonDisabled = false;
        clearInterval(this.settingsButtonInterval);
      }
    }, 1000);
    this.store
      .select(StateKeys.sync)
      .pipe(filter(Boolean), distinctUntilChanged(), takeUntil(this.destroy$))
      .subscribe({
        next: (value: any) => {
          const data = value.filter(
            (item: Sync) =>
              item.wallet_id === this.variablesService.currentWallet.wallet_id
          )[0];
          if (data && !data.sync) {
            let in_progress;
            const values = this.store.state.sync;
            if (values && values.length > 0) {
              in_progress = values.filter(item => item.sync);
              this.variablesService.sync_started = !!(
                in_progress && in_progress.length
              );
              if (!in_progress) {
                this.variablesService.sync_started = false;
              }
            } else {
              this.variablesService.sync_started = false;
            }
          }
        },
      });
    if (hasOwnProperty(this.variablesService.currentWallet.alias, 'name')) {
      this.variablesService.currentWallet.wakeAlias = false;
    }
    this.variablesService.getAliasChangedEvent
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          if (
            hasOwnProperty(this.variablesService.currentWallet.alias, 'name')
          ) {
            this.variablesService.currentWallet.wakeAlias = false;
          }
        },
      });
    this.updateWalletStatus();
    this.variablesService.getWalletChangedEvent
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.setTabsDisabled(!this.variablesService.currentWallet.balances);
        },
      });
  }

  toggleMenuDropdown(): void {
    if (!this.openDropdown) {
      this.openDropdown = true;
    } else {
      this.openDropdown = false;
      this.walletSyncVisible = false;
    }
  }

  resyncCurrentWallet(id): void {
    this.backend.resyncWallet(id);
  }

  beforeClose(wallet_id): void {
    const dialogConfig: DialogConfig<ConfirmModalData> = {
      data: {
        title: 'WALLET.CONFIRM.MESSAGE',
        message: 'WALLET.CONFIRM.TITLE',
      },
    };

    this.dialog
      .open<boolean>(ConfirmModalComponent, dialogConfig)
      .closed.pipe(takeUntil(this.destroy$))
      .subscribe({
        next: confirmed => confirmed && this.closeWallet(wallet_id),
      });
  }

  addCustomToken(): void {
    this.dialog
      .open<Asset | undefined>(AddCustomTokenComponent)
      .closed.pipe(
        filter(response_data => Boolean(response_data)),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: asset => {
          const dialogConfig: DialogConfig = {
            data: {
              asset,
              title: 'You added new asset',
            },
          };
          this.ngZone.run(() => {
            this.dialog.open(AssetDetailsComponent, dialogConfig);
          });
        },
      });
  }

  exportHistory(): void {
    this.dialog.open(ExportHistoryModalComponent);
  }

  closeWallet(wallet_id): void {
    this.walletsService.closeWallet(wallet_id);
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  updateWalletStatus(): void {
    this.backend.eventSubscribe(Commands.wallet_sync_progress, data => {
      const wallet_id = data.wallet_id;
      if (wallet_id === this.variablesService.currentWallet.wallet_id) {
        this.ngZone.run(() => {
          this.walletLoaded = false;
        });
      }
    });
    this.backend.eventSubscribe(Commands.update_wallet_status, data => {
      const wallet_state = data.wallet_state;
      const wallet_id = data.wallet_id;
      this.ngZone.run(() => {
        if (
          wallet_state === 2 &&
          wallet_id === this.variablesService.currentWallet.wallet_id
        ) {
          this.walletLoaded =
            this.variablesService.getWallet(
              this.variablesService.currentWallet.wallet_id
            )?.loaded || false;
          if (this.walletLoaded) {
            this.setTabsDisabled(!this.variablesService.currentWallet.balances);
          }
        } else {
          this.walletLoaded = false;
        }
      });
    });
  }

  setTabsDisabled(disabled: boolean): void {
    this.tabs[2].disabled = disabled;
    this.tabs[4].disabled = disabled;
  }
}
