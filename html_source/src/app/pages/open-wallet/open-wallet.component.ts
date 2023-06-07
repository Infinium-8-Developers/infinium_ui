import { Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Validators, NonNullableFormBuilder } from '@angular/forms';
import { BackendService } from '@api/services/backend.service';
import { VariablesService } from '@parts/services/variables.service';
import { ModalService } from '@parts/services/modal.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Wallet } from '@api/models/wallet.model';
import { TranslateService } from '@ngx-translate/core';
import { hasOwnProperty } from '@parts/functions/hasOwnProperty';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { regExpPassword, InfiniumValidators } from '@parts/utils/infinium-validators';
import { WalletsService } from '@parts/services/wallets.service';
import { notFileInfiniumWallet, wrongPassword } from '@parts/utils/infinium-errors';

@Component({
  selector: 'app-open-wallet',
  template: `
    <div class="page-container">
      <div class="toolbar mb-2">
        <div class="left">
          <button appBackButton class="btn-icon circle big mr-2" type="button">
            <i class="icon dropdown-arrow-left"></i>
          </button>
          <h1>{{ 'BREADCRUMBS.OPEN_WALLET' | translate }}</h1>
        </div>
        <div class="right"></div>
      </div>

      <div class="page-content">
        <div class="breadcrumbs mb-2">
          <div class="breadcrumb">
            <a [routerLink]="['/add-wallet']">{{
              'BREADCRUMBS.ADD_WALLET' | translate
            }}</a>
          </div>
          <div class="breadcrumb">
            <span>{{ 'BREADCRUMBS.OPEN_WALLET' | translate }}</span>
          </div>
        </div>

        <div class="scrolled-content">
          <form [formGroup]="openWalletForm" class="form">
            <div class="form__field">
              <label for="wallet-name">
                {{ 'OPEN_WALLET.NAME' | translate }}
                <span class="color-red">*</span>
              </label>
              <input
                (contextmenu)="variablesService.onContextMenu($event)"
                [maxLength]="variablesService.maxWalletNameLength"
                [placeholder]="
                  'PLACEHOLDERS.WALLET_NAME_PLACEHOLDER' | translate
                "
                class="form__field--input"
                formControlName="name"
                id="wallet-name"
                type="text"
              />
              <div
                *ngIf="
                  openWalletForm.controls.name.invalid &&
                  (openWalletForm.controls.name.dirty ||
                    openWalletForm.controls.name.touched)
                "
                class="error"
              >
                <div *ngIf="openWalletForm.controls.name.errors['duplicate']">
                  {{ 'OPEN_WALLET.FORM_ERRORS.NAME_DUPLICATE' | translate }}
                </div>
                <div *ngIf="openWalletForm.controls.name.errors['required']">
                  {{ 'OPEN_WALLET.FORM_ERRORS.NAME_REQUIRED' | translate }}
                </div>
                <div *ngIf="openWalletForm.controls.name.errors['maxLength']">
                  {{ 'OPEN_WALLET.FORM_ERRORS.MAX_LENGTH' | translate }}
                </div>
              </div>
            </div>

            <div class="form__field">
              <label for="wallet-password">{{
                'OPEN_WALLET.PASS' | translate
              }}</label>
              <input
                (contextmenu)="
                  variablesService.onContextMenuPasteSelect($event)
                "
                class="form__field--input"
                formControlName="password"
                id="wallet-password"
                placeholder="{{ 'PLACEHOLDERS.PASS_PLACEHOLDER' | translate }}"
                type="password"
              />
              <div
                *ngIf="
                  openWalletForm.controls.password.invalid &&
                  (openWalletForm.controls.password.dirty ||
                    openWalletForm.controls.password.touched)
                "
                class="error"
              >
                <div
                  *ngIf="
                    openWalletForm.controls.password.hasError('wrongPassword')
                  "
                >
                  {{
                    openWalletForm.controls.password.errors['wrongPassword']
                      .errorText
                  }}
                </div>
              </div>
            </div>

            <button
              (click)="openWallet()"
              [disabled]="openWalletForm.invalid"
              class="primary big max-w-19-rem w-100"
              type="button"
            >
              {{ 'OPEN_WALLET.BUTTON' | translate }}
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class OpenWalletComponent implements OnInit, OnDestroy {
  fb = inject(NonNullableFormBuilder);

  openWalletForm = this.fb.group({
    name: this.fb.control('', [
      Validators.required,
      Validators.maxLength(this.variablesService.maxWalletNameLength),
      InfiniumValidators.duplicate(this.variablesService.walletNamesForComparisons),
    ]),
    password: this.fb.control('', [Validators.pattern(regExpPassword)]),
    filePath: this.fb.control('', Validators.required),
  });

  private destroy$ = new Subject<void>();

  constructor(
    public walletsService: WalletsService,
    public variablesService: VariablesService,
    private route: ActivatedRoute,
    private router: Router,
    private backend: BackendService,
    private modalService: ModalService,
    private ngZone: NgZone,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe({
      next: params => {
        if (!params.path) {
          return;
        }

        this.openWalletForm.controls.filePath.patchValue(params.path);

        let filename = '';
        if (params.path.lastIndexOf('.') === -1) {
          filename = params.path.substr(params.path.lastIndexOf('/') + 1);
        } else {
          filename = params.path.substr(
            params.path.lastIndexOf('/') + 1,
            params.path.lastIndexOf('.') - 1 - params.path.lastIndexOf('/')
          );
        }
        if (filename.length > 25) {
          filename = filename.slice(0, 25);
        }
        this.openWalletForm.controls.name.patchValue(filename);
        this.openWalletForm.controls.name.markAsTouched();
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  openWallet(): void {
    if (this.openWalletForm.valid) {
      const { filePath, password, name } = this.openWalletForm.getRawValue();
      const { count: txs_to_return } = this.variablesService;
      this.backend.openWallet(
        filePath,
        password,
        txs_to_return,
        false,
        (
          openStatus,
          openData,
          errorCode:
            | 'WRONG_PASSWORD'
            | 'FILE_NOT_FOUND'
            | 'INVALID_FILE'
            | 'ALREADY_EXISTS'
            | string
        ) => {
          console.log('openData', openData);
          if (errorCode === 'WRONG_PASSWORD') {
            this.ngZone.run(() => {
              this.openWalletForm.controls.password.setErrors({
                wrongPassword,
              });
            });
            return;
          }

          let errorText = errorCode;

          if (errorCode === 'FILE_NOT_FOUND') {
            errorText = this.translate.instant('OPEN_WALLET.FILE_NOT_FOUND1');
            errorText += ':<br>' + filePath;
            errorText += this.translate.instant('OPEN_WALLET.FILE_NOT_FOUND2');
          }

          if (errorCode === 'INVALID_FILE') {
            errorText = this.translate.instant(notFileInfiniumWallet.errorText);
          }

          if (['INVALID_FILE', 'FILE_NOT_FOUND'].includes(errorCode)) {
            this.modalService.prepareModal('error', errorText);
            return;
          }

          if (openStatus || errorCode === 'FILE_RESTORED') {
            let exists = false;
            this.variablesService.wallets.forEach(wallet => {
              if (wallet.address === openData['wi'].address) {
                exists = true;
              }
            });

            if (exists) {
              this.modalService.prepareModal(
                'error',
                'OPEN_WALLET.WITH_ADDRESS_ALREADY_OPEN'
              );
              this.backend.closeWallet(openData.wallet_id, () => {
                this.ngZone.run(() => {
                  this.router.navigate(['/']);
                });
              });
            } else {
              const new_wallet = new Wallet(
                openData.wallet_id,
                name,
                password,
                openData['wi'].path,
                openData['wi'].address,
                openData['wi'].balance,
                openData['wi'].unlocked_balance,
                openData['wi'].mined_total,
                openData['wi'].tracking_hey
              );
              new_wallet.alias = this.backend.getWalletAlias(
                new_wallet.address
              );
              new_wallet.currentPage = 1;
              new_wallet.open_from_exist = true;
              new_wallet.exclude_mining_txs = false;
              new_wallet.is_auditable = openData['wi'].is_auditable;
              new_wallet.is_watch_only = openData['wi'].is_watch_only;
              if (openData.recent_history && openData.recent_history.history) {
                new_wallet.total_history_item =
                  openData.recent_history.total_history_items;
                new_wallet.totalPages = Math.ceil(
                  openData.recent_history.total_history_items /
                    this.variablesService.count
                );
                new_wallet.totalPages > this.variablesService.maxPages
                  ? (new_wallet.pages = new Array(5)
                      .fill(1)
                      .map((value, index) => value + index))
                  : (new_wallet.pages = new Array(new_wallet.totalPages)
                      .fill(1)
                      .map((value, index) => value + index));
                new_wallet.prepareHistory(openData.recent_history.history);
              } else {
                new_wallet.total_history_item = 0;
                new_wallet.pages = new Array(1).fill(1);
                new_wallet.totalPages = 1;
              }
              this.backend.getContracts(
                openData.wallet_id,
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
              this.backend.runWallet(
                openData.wallet_id,
                (run_status, run_data) => {
                  if (run_status) {
                    if (this.variablesService.appPass) {
                      this.backend.storeSecureAppData();
                    }
                    this.ngZone.run(() => {
                      this.variablesService.setCurrentWallet(
                        openData.wallet_id
                      );
                      this.router.navigate(['/wallet/']);
                    });
                  } else {
                    console.log(run_data['error_code']);
                  }
                }
              );
            }
          }
        }
      );
    }
  }
}
