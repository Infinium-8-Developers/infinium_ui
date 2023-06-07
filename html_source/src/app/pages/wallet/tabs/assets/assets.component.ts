import { Component, OnDestroy, OnInit } from '@angular/core';
import { VariablesService } from '@parts/services/variables.service';
import { Subject } from 'rxjs';
import { Asset, ParamsRemoveCustomAssetId } from '@api/models/assets.model';
import { Store } from '@store/store';
import { PaginatePipeArgs } from 'ngx-pagination';
import { takeUntil } from 'rxjs/operators';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { AssetDetailsComponent } from '@parts/modals/asset-details/asset-details.component';
import { Dialog, DialogConfig } from '@angular/cdk/dialog';
import { BackendService } from '@api/services/backend.service';
import {
  ConfirmModalComponent,
  ConfirmModalData,
} from '@parts/modals/confirm-modal/confirm-modal.component';
import { WalletsService } from '@parts/services/wallets.service';
import { BigNumber } from 'bignumber.js';
import { LOCKED_BALANCE_HELP_PAGE } from '@parts/data/constants';
import { IntToMoneyPipe } from '@parts/pipes';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-assets',
  template: `
    <div fxFlexFill fxLayout="column">
      <div
        class="scrolled-content"
        [class.mb-2]="isShowPagination"
        fxFlex="1 1 auto"
      >
        <table class="assets-table">
          <thead>
            <tr>
              <th>
                <div class="bg title">
                  {{ 'ASSETS.TABLE.LABELS.NAME' | translate }}
                </div>
              </th>
              <th>
                <div class="bg title">
                  {{ 'ASSETS.TABLE.LABELS.BALANCE' | translate }}
                </div>
              </th>
              <th>
                <div class="bg title">
                  {{ 'ASSETS.TABLE.LABELS.VALUE' | translate }}
                </div>
              </th>
              <th>
                <div class="bg title">
                  {{ 'ASSETS.TABLE.LABELS.PRICE' | translate }}
                </div>
              </th>
              <th>
                <div class="bg title">&nbsp;</div>
              </th>
            </tr>
            <div class="row-divider"></div>
          </thead>
          <tbody>
            <ng-container
              *ngIf="variablesService.currentWallet.balances$ | async as assets"
            >
              <ng-container
                *ngFor="
                  let asset of assets | paginate : paginatePipeArgs;
                  trackBy: trackByAssets
                "
              >
                <tr
                  [delay]="500"
                  [placement]="'bottom'"
                  [timeDelay]="1000"
                  [tooltipClass]="'balance-tooltip'"
                  [tooltip]="getBalanceTooltip(asset)"
                >
                  <td>
                    <div
                      class="text-ellipsis"
                      fxLayout="row"
                      fxLayoutAlign="start center"
                      fxLayoutGap="2rem"
                    >
                      <div class="token-logo mr-1">
                        <img
                          [src]="
                            (asset | getWhiteAssetInfo | async)?.logo ||
                            defaultImgSrc
                          "
                          [alt]="asset.asset_info.ticker"
                          defaultImgAlt="default"
                          [defaultImgSrc]="defaultImgSrc"
                          appDefaultImg
                        />
                      </div>
                      <b class="text-ellipsis">{{
                        asset.asset_info.full_name
                      }}</b>
                    </div>
                  </td>
                  <td>
                    <div class="text-ellipsis">
                      <b>
                        {{ asset.total | intToMoney }}
                        {{ asset.asset_info.ticker }}
                      </b>
                    </div>
                  </td>
                  <ng-container
                    *ngIf="
                      (asset | getWhiteAssetInfo | async)?.price_url
                        | getPriceByUrl
                        | async as price;
                      else templateNotLoadPrice
                    "
                  >
                    <td>
                      <div class="text-ellipsis">
                        <b>{{
                          (asset.total | intToMoney) * price.usd
                            | currency : 'USD'
                        }}</b>
                      </div>
                    </td>
                    <td>
                      <div class="text-ellipsis">
                        <b class="mr-0_5">{{ price.usd | currency : 'USD' }}</b>
                        <span
                          [class.color-aqua]="price.usd_24h_change > 0"
                          [class.color-red]="price.usd_24h_change < 0"
                          >{{ price.usd_24h_change | number : '1.2-2' }}%</span
                        >
                      </div>
                    </td>
                  </ng-container>
                  <ng-template #templateNotLoadPrice>
                    <td></td>
                    <td></td>
                  </ng-template>
                  <td>
                    <div
                      class="text-ellipsis"
                      fxLayout="row"
                      fxLayoutAlign="end center"
                    >
                      <button
                        #trigger="cdkOverlayOrigin"
                        (click)="
                          $event.stopPropagation();
                          toggleDropDownMenu(trigger, asset)
                        "
                        [disabled]="false"
                        cdkOverlayOrigin
                        class="btn-icon circle small ml-auto"
                        type="button"
                      >
                        <i class="icon dots rotate-90"></i>
                      </button>
                    </div>
                  </td>
                </tr>
                <tr class="row-divider"></tr>
              </ng-container>
            </ng-container>
          </tbody>
        </table>
      </div>

      <pagination-template
        *ngIf="isShowPagination"
        #p="paginationApi"
        [id]="paginationId"
        class="ngx-pagination custom-pagination"
        (pageChange)="currentPage = $event"
      >
        <button
          (click)="p.previous()"
          [disabled]="p.isFirstPage()"
          class="pagination-previous btn-icon circle small mr-0_5"
        >
          <i class="icon arrow-left-stroke"></i>
        </button>

        <div
          *ngFor="let page of p.pages; trackBy: trackByPages"
          [class.current]="p.getCurrent() === page.value"
          class="mr-0_5"
        >
          <a
            (click)="p.setCurrent(page.value)"
            *ngIf="p.getCurrent() !== page.value"
          >
            <span>{{ page.label }}</span>
          </a>
          <div *ngIf="p.getCurrent() === page.value">
            <span>{{ page.label }}</span>
          </div>
        </div>

        <button
          (click)="p.next()"
          [disabled]="p.isLastPage()"
          class="pagination-next btn-icon circle small"
        >
          <i class="icon arrow-right-stroke"></i>
        </button>
      </pagination-template>
    </div>

    <ng-template
      (backdropClick)="$event.stopPropagation(); isOpenDropDownMenu = false"
      [cdkConnectedOverlayBackdropClass]="'opacity-0'"
      [cdkConnectedOverlayHasBackdrop]="true"
      [cdkConnectedOverlayOrigin]="triggerOrigin"
      [cdkConnectedOverlayOpen]="isOpenDropDownMenu"
      [cdkConnectedOverlayPositions]="[
        {
          originX: 'end',
          originY: 'top',
          overlayX: 'end',
          overlayY: 'top',
          offsetY: 30
        }
      ]"
      cdkConnectedOverlay
    >
      <ul (click)="isOpenDropDownMenu = false" class="list">
        <li class="item">
          <button
            class="w-100 px-2 py-1"
            type="button"
            (click)="assetDetails()"
          >
            <i class="icon info-icon mr-1"></i>
            <span>{{ 'ASSETS.DROP_DOWN_MENU.ASSET_DETAILS' | translate }}</span>
          </button>
        </li>

        <ng-container *ngIf="!(currentAsset | hasInAssetsWhitelist | async)">
          <li class="item">
            <button
              class="w-100 px-2 py-1"
              type="button"
              (click)="beforeRemoveAsset()"
            >
              <i class="icon delete mr-1"></i>
              <span>{{
                'ASSETS.DROP_DOWN_MENU.REMOVE_ASSET' | translate
              }}</span>
            </button>
          </li>
        </ng-container>
      </ul>
    </ng-template>
  `,
  styles: [
    `
      :host {
        width: 100%;
        height: auto;
      }
    `,
  ],
})
export class AssetsComponent implements OnInit, OnDestroy {
  currentPage = 1;

  itemsPerPage = 10;

  paginationId = 'pagination-assets-id';

  get paginatePipeArgs(): PaginatePipeArgs {
    return {
      id: this.paginationId,
      itemsPerPage: this.itemsPerPage,
      currentPage: this.currentPage,
    };
  }

  get isShowPagination(): boolean {
    const { currentWallet } = this.variablesService;
    if (currentWallet) {
      const { balances } = currentWallet;
      return (balances?.length || 0) > this.itemsPerPage;
    }
    return false;
  }

  triggerOrigin!: CdkOverlayOrigin;

  currentAsset!: Asset;

  isOpenDropDownMenu = false;

  defaultImgSrc = 'assets/icons/currency-icons/custom_token.svg';

  private destroy$ = new Subject<void>();

  constructor(
    public variablesService: VariablesService,
    private backendService: BackendService,
    private walletsService: WalletsService,
    private store: Store,
    private dialog: Dialog,
    private intToMoneyPipe: IntToMoneyPipe,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.listenChangeWallet();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  toggleDropDownMenu(trigger: CdkOverlayOrigin, asset: Asset): void {
    this.isOpenDropDownMenu = !this.isOpenDropDownMenu;
    this.triggerOrigin = trigger;
    this.currentAsset = asset;
  }

  trackByAssets(
    index: number,
    { asset_info: { asset_id } }: Asset
  ): number | string {
    return asset_id || index;
  }

  trackByPages(index: number): number | string {
    return index;
  }

  assetDetails(): void {
    const dialogConfig: DialogConfig = {
      data: {
        asset: this.currentAsset,
      },
    };
    this.dialog.open(AssetDetailsComponent, dialogConfig);
  }

  beforeRemoveAsset(): void {
    if (!this.currentAsset) {
      return;
    }
    const {
      asset_info: { full_name },
    } = this.currentAsset;
    const dialogConfig: DialogConfig<ConfirmModalData> = {
      data: {
        title: `Do you want delete "${full_name}"`,
      },
    };

    this.dialog
      .open<boolean>(ConfirmModalComponent, dialogConfig)
      .closed.pipe(takeUntil(this.destroy$))
      .subscribe({
        next: confirmed => confirmed && this.removeAsset(),
      });
  }

  removeAsset(): void {
    const { wallet_id } = this.variablesService.currentWallet;
    const {
      asset_info: { asset_id },
    } = this.currentAsset;
    const params: ParamsRemoveCustomAssetId = {
      wallet_id,
      asset_id,
    };
    this.backendService.removeCustomAssetId(params, () => {
      this.walletsService.updateWalletInfo(wallet_id);
      this.currentAsset = undefined;
    });
  }

  getBalanceTooltip(balance: Asset): HTMLDivElement {
    const tooltip = document.createElement('div');
    const scrollWrapper = document.createElement('div');
    if (!balance) {
      return null;
    }

    scrollWrapper.classList.add('balance-scroll-list');
    [balance].forEach(({ unlocked, total, asset_info: { ticker } }: Asset) => {
      const available = document.createElement('span');
      available.setAttribute('class', 'available');
      available.innerHTML = this.translate.instant('WALLET.AVAILABLE_BALANCE', {
        available: this.intToMoneyPipe.transform(unlocked),
        currency: ticker || '---',
      });
      scrollWrapper.appendChild(available);
      const locked = document.createElement('span');
      locked.setAttribute('class', 'locked');
      locked.innerHTML = this.translate.instant('WALLET.LOCKED_BALANCE', {
        locked: this.intToMoneyPipe.transform(
          new BigNumber(total).minus(unlocked)
        ),
        currency: ticker || '---',
      });
      scrollWrapper.appendChild(locked);
    });
    tooltip.appendChild(scrollWrapper);
    const link = document.createElement('span');
    link.setAttribute('class', 'link');
    link.innerHTML = this.translate.instant('WALLET.LOCKED_BALANCE_LINK');
    link.addEventListener('click', () => {
      this.backendService.openUrlInBrowser(LOCKED_BALANCE_HELP_PAGE);
    });
    tooltip.appendChild(link);
    return tooltip;
  }

  private listenChangeWallet(): void {
    this.variablesService.getWalletChangedEvent
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.currentPage = 0;
        },
      });
  }
}
