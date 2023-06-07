import {
  Component,
  HostBinding,
  Input,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { VariablesService } from '../../services/variables.service';
import { Wallet } from '@api/models/wallet.model';
import { BackendService } from '@api/services/backend.service';
import { TranslateService } from '@ngx-translate/core';
import { ModalService } from '../../services/modal.service';
import { hasOwnProperty } from '../../functions/hasOwnProperty';
import { WalletsService } from '@parts/services/wallets.service';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-open-wallet-modal',
  template: `
    <div
      class="modal p-2 border-radius-0_8-rem bg-light-blue max-w-34-rem max-h-100 w-100 scrolled-content"
    >
      <div class="wrapper w-100">
        <h3 class="mb-2">{{ 'OPEN_WALLET.MODAL.TITLE' | translate }}</h3>

        <div class="word-break-break-all mb-2">{{ wallet.name }}</div>
        <div class="word-break-break-all mb-2">{{ wallet.path }}</div>

        <form (ngSubmit)="openWallet()" class="form" fxLayout="column">
          <div *ngIf="!wallet.notFound" class="form__field">
            <label for="password">{{
              'OPEN_WALLET.MODAL.LABEL' | translate
            }}</label>
            <input
              [(ngModel)]="wallet.pass"
              [class.invalid]="isWrongPassword$ | async"
              (contextmenu)="variablesService.onContextMenuPasteSelect($event)"
              (focusin)="isWrongPassword$.next(false)"
              class="form__field--input"
              id="password"
              name="password"
              type="password"
            />
            <div *ngIf="wallet.notFound" class="error">
              {{ 'OPEN_WALLET.MODAL.NOT_FOUND' | translate }}
            </div>
            <div *ngIf="isWrongPassword$ | async" class="error">
              {{ 'ERRORS.WRONG_PASSWORD' | translate }}
            </div>
          </div>

          <div fxLayout="row nowrap" fxLayoutGap="1rem">
            <button
              [disabled]="wallet.notFound || isWrongPassword$ | async"
              class="primary big w-100"
              type="submit"
            >
              {{ 'OPEN_WALLET.MODAL.OPEN' | translate }}
            </button>
            <button
              (click)="skipWallet()"
              class="outline big w-100"
              type="button"
            >
              {{ 'OPEN_WALLET.MODAL.SKIP' | translate }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [],
})
export class OpenWalletModalComponent implements OnInit, OnDestroy {
  @HostBinding('class.modal-overlay') modalOverlay = true;

  @Input() wallets;

  isWrongPassword$ = new BehaviorSubject<boolean>(false);

  wallet = {
    name: '',
    path: '',
    pass: '',
    notFound: false,
    emptyPass: false,
  };

  constructor(
    public variablesService: VariablesService,
    public walletsService: WalletsService,
    private backend: BackendService,
    private translate: TranslateService,
    private modalService: ModalService,
    private ngZone: NgZone,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'no-scroll');
    if (this.wallets.length) {
      this.wallet = this.wallets[0];
      this.wallet.pass = '';
    }
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  openWallet(): void {
    if (this.wallets.length === 0) {
      return;
    }
    this.backend.openWallet(
      this.wallet.path,
      this.wallet.pass,
      this.variablesService.count,
      false,
      (open_status, open_data, open_error) => {
        if (open_error === 'WRONG_PASSWORD') {
          this.ngZone.run(() => {
            this.isWrongPassword$.next(true);
          });
        }
        if (open_error && open_error === 'FILE_NOT_FOUND') {
          this.ngZone.run(() => {
            this.wallet.notFound = true;
          });
          let error_translate = this.translate.instant(
            'OPEN_WALLET.FILE_NOT_FOUND1'
          );
          error_translate += ':<br>' + this.wallet.path;
          error_translate += this.translate.instant(
            'OPEN_WALLET.FILE_NOT_FOUND2'
          );
          this.modalService.prepareModal('error', error_translate);
        } else {
          if (open_status || open_error === 'FILE_RESTORED') {
            let exists = false;
            this.variablesService.wallets.forEach(wallet => {
              if (wallet.address === open_data['wi'].address) {
                exists = true;
              }
            });

            if (exists) {
              this.modalService.prepareModal(
                'error',
                'OPEN_WALLET.WITH_ADDRESS_ALREADY_OPEN'
              );
              this.backend.closeWallet(open_data.wallet_id);
            } else {
              const new_wallet = new Wallet(
                open_data.wallet_id,
                this.wallet.name,
                this.wallet.pass,
                open_data['wi'].path,
                open_data['wi'].address,
                open_data['wi'].balance,
                open_data['wi'].unlocked_balance,
                open_data['wi'].mined_total,
                open_data['wi'].tracking_hey
              );
              new_wallet.alias = this.backend.getWalletAlias(
                new_wallet.address
              );
              new_wallet.is_auditable = open_data['wi'].is_auditable;
              new_wallet.is_watch_only = open_data['wi'].is_watch_only;
              new_wallet.currentPage = 1;
              new_wallet.exclude_mining_txs = false;
              if (
                open_data.recent_history &&
                open_data.recent_history.history
              ) {
                new_wallet.total_history_item =
                  open_data.recent_history.total_history_items;
                new_wallet.totalPages = Math.ceil(
                  open_data.recent_history.total_history_items /
                    this.variablesService.count
                );
                new_wallet.totalPages > this.variablesService.maxPages
                  ? (new_wallet.pages = new Array(5)
                      .fill(1)
                      .map((value, index) => value + index))
                  : (new_wallet.pages = new Array(new_wallet.totalPages)
                      .fill(1)
                      .map((value, index) => value + index));
                new_wallet.prepareHistory(open_data.recent_history.history);
              } else {
                new_wallet.total_history_item = 0;
                new_wallet.pages = new Array(1).fill(1);
                new_wallet.totalPages = 1;
              }
              this.backend.getContracts(
                open_data.wallet_id,
                (contracts_status, contracts_data) => {
                  if (
                    contracts_status &&
                    hasOwnProperty(contracts_data, 'contracts')
                  ) {
                    this.ngZone.run(() => {
                      new_wallet.prepareContractsAfterOpen(
                        contracts_data.contracts,
                        this.variablesService.exp_med_ts,
                        this.variablesService.height_app,
                        this.variablesService.settings.viewedContracts,
                        this.variablesService.settings.notViewedContracts
                      );
                    });
                  }
                }
              );
              this.walletsService.addWallet(new_wallet);
              this.backend.runWallet(open_data.wallet_id);
              this.skipWallet();
              this.isWrongPassword$.next(false);
            }
          }
        }
      }
    );
  }

  skipWallet(): void {
    this.ngZone.run(() => {
      if (this.wallets.length) {
        this.wallets.splice(0, 1);
        this.ngOnInit();
      }
    });
  }
}
