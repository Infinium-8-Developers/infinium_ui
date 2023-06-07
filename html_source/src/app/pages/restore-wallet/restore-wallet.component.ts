import { Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '@api/services/backend.service';
import { VariablesService } from '@parts/services/variables.service';
import { ModalService } from '@parts/services/modal.service';
import { Wallet } from '@api/models/wallet.model';
import { TranslateService } from '@ngx-translate/core';
import { pairwise, startWith, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { hasOwnProperty } from '@parts/functions/hasOwnProperty';
import { regExpPassword, InfiniumValidators } from '@parts/utils/infinium-validators';
import { WalletsService } from '@parts/services/wallets.service';

@Component({
  selector: 'app-restore-wallet',
  template: `
    <div class="page-container">
      <div class="toolbar mb-2">
        <div class="left">
          <button appBackButton class="btn-icon circle big mr-2" type="button">
            <i class="icon dropdown-arrow-left"></i>
          </button>
          <h1>{{ 'BREADCRUMBS.ADD_WALLET' | translate }}</h1>
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
            <span>{{ 'BREADCRUMBS.RESTORE_WALLET' | translate }}</span>
          </div>
        </div>

        <div class="scrolled-content">
          <form [formGroup]="restoreForm" class="form">
            <div class="form__field">
              <label for="wallet-name">{{
                'RESTORE_WALLET.LABEL_NAME' | translate
              }}</label>
              <input
                (contextmenu)="variablesService.onContextMenu($event)"
                [attr.readonly]="walletSaved ? '' : null"
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
                  restoreForm.controls['name'].invalid &&
                  (restoreForm.controls['name'].dirty ||
                    restoreForm.controls['name'].touched)
                "
                class="error"
              >
                <div *ngIf="restoreForm.controls['name'].errors['duplicate']">
                  {{ 'RESTORE_WALLET.FORM_ERRORS.NAME_DUPLICATE' | translate }}
                </div>
                <div
                  *ngIf="
                    restoreForm.get('name').value.length >=
                    variablesService.maxWalletNameLength
                  "
                >
                  {{ 'RESTORE_WALLET.FORM_ERRORS.MAX_LENGTH' | translate }}
                </div>
                <div
                  *ngIf="
                    restoreForm.get('name').value.length >=
                    variablesService.maxWalletNameLength
                  "
                >
                  {{ 'RESTORE_WALLET.FORM_ERRORS.MAX_LENGTH' | translate }}
                </div>
                <div *ngIf="restoreForm.controls['name'].errors['required']">
                  {{ 'RESTORE_WALLET.FORM_ERRORS.NAME_REQUIRED' | translate }}
                </div>
              </div>
            </div>

            <div class="form__field">
              <label for="wallet-password">{{
                'RESTORE_WALLET.PASS' | translate
              }}</label>
              <input
                (contextmenu)="
                  variablesService.onContextMenuPasteSelect($event)
                "
                [attr.readonly]="walletSaved ? '' : null"
                class="form__field--input"
                formControlName="password"
                id="wallet-password"
                placeholder="{{
                  'PLACEHOLDERS.WALET_PASSWORD_PLACEHOLDER' | translate
                }}"
                type="password"
              />
              <div
                *ngIf="
                  restoreForm.controls['password'].dirty &&
                  restoreForm.controls['password'].errors
                "
                class="error"
              >
                <div *ngIf="restoreForm.controls['password'].errors.pattern">
                  {{ 'ERRORS.WRONG_PASSWORD' | translate }}
                </div>
              </div>
            </div>

            <div class="form__field">
              <label for="confirm-wallet-password">{{
                'RESTORE_WALLET.CONFIRM' | translate
              }}</label>
              <input
                (contextmenu)="
                  variablesService.onContextMenuPasteSelect($event)
                "
                [attr.readonly]="walletSaved ? '' : null"
                [class.invalid]="
                  restoreForm.controls['password'].dirty &&
                  restoreForm.controls['confirm'].dirty &&
                  restoreForm.errors &&
                  restoreForm.get('confirm').value.length > 0
                "
                class="form__field--input"
                formControlName="confirm"
                id="confirm-wallet-password"
                placeholder="{{
                  'PLACEHOLDERS.CONFIRM_WALET_PASSWORD_PLACEHOLDER' | translate
                }}"
                type="password"
              />
              <div
                *ngIf="
                  restoreForm.controls['password'].dirty &&
                  restoreForm.controls['confirm'].dirty &&
                  restoreForm.errors &&
                  restoreForm.get('confirm').value.length > 0
                "
                class="error"
              >
                <div *ngIf="restoreForm.errors['mismatch']">
                  {{
                    'RESTORE_WALLET.FORM_ERRORS.CONFIRM_NOT_MATCH' | translate
                  }}
                </div>
              </div>
            </div>
            <div class="form__field">
              <label for="phrase-key">{{
                'RESTORE_WALLET.LABEL_PHRASE_KEY' | translate
              }}</label>
              <input
                (contextmenu)="variablesService.onContextMenu($event)"
                [attr.readonly]="walletSaved ? '' : null"
                [placeholder]="
                  'PLACEHOLDERS.SEED_PHRASE_PLACEHOLDER' | translate
                "
                class="form__field--input"
                formControlName="key"
                id="phrase-key"
                type="text"
              />
              <div
                *ngIf="
                  restoreForm.controls['key'].invalid &&
                  (restoreForm.controls['key'].dirty ||
                    restoreForm.controls['key'].touched)
                "
                class="error"
              >
                <div *ngIf="restoreForm.controls['key'].errors['required']">
                  {{ 'RESTORE_WALLET.FORM_ERRORS.KEY_REQUIRED' | translate }}
                </div>
              </div>
              <div
                *ngIf="
                  (restoreForm.controls['key'].dirty ||
                    restoreForm.controls['key'].touched) &&
                  !this.seedPhraseInfo?.syntax_correct
                "
                class="error"
              >
                {{ 'Seed phrase not valid' | translate }}
              </div>
            </div>
            <div
              *ngIf="
                this.seedPhraseInfo?.syntax_correct &&
                this.seedPhraseInfo?.require_password
              "
              class="form__field"
            >
              <label for="seed-password">{{
                'RESTORE_WALLET.SEED_PASSWORD' | translate
              }}</label>
              <input
                class="form__field--input"
                formControlName="seedPassword"
                id="seed-password"
                placeholder="{{
                  'PLACEHOLDERS.SEED_PHRASE_PLACEHOLDER' | translate
                }}"
                type="password"
              />
              <div
                *ngIf="
                  (restoreForm.controls['seedPassword'].dirty ||
                    restoreForm.controls['seedPassword'].touched) &&
                  !this.seedPhraseInfo?.hash_sum_matched
                "
                class="error"
              >
                <span>{{
                  'RESTORE_WALLET.FORM_ERRORS.INCORRECT_PASSWORD' | translate
                }}</span>
              </div>
              <div
                *ngIf="this.seedPhraseInfo?.hash_sum_matched"
                class="success"
              >
                <span>{{ 'RESTORE_WALLET.OK' | translate }}</span>
              </div>
            </div>

            <button
              *ngIf="walletSaved"
              class="outline big w-100 mb-2"
              disabled
              type="button"
            >
              <i class="icon"></i>
              {{ walletSavedName }}
            </button>
            <button
              (click)="saveWallet()"
              *ngIf="!walletSaved"
              [disabled]="
                restoreForm.invalid ||
                ((!this.seedPhraseInfo?.syntax_correct ||
                  !this.seedPhraseInfo?.require_password ||
                  !this.seedPhraseInfo?.hash_sum_matched) &&
                  (!this.seedPhraseInfo?.syntax_correct ||
                    this.seedPhraseInfo?.require_password))
              "
              class="outline big w-100 mb-2"
              type="button"
            >
              {{ 'RESTORE_WALLET.BUTTON_SELECT' | translate }}
            </button>
            <button
              (click)="createWallet()"
              [disabled]="!walletSaved"
              class="primary big w-100 mb-2"
              type="button"
            >
              {{ 'RESTORE_WALLET.BUTTON_CREATE' | translate }}
            </button>
          </form>
        </div>
      </div>
    </div>
  `,
  styles: [
    `
      :host {
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    `,
  ],
})
export class RestoreWalletComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);

  restoreForm = this.fb.group(
    {
      name: this.fb.nonNullable.control('', [
        Validators.required,
        InfiniumValidators.duplicate(
          this.variablesService.walletNamesForComparisons
        ),
      ]),
      key: this.fb.nonNullable.control('', Validators.required),
      password: this.fb.nonNullable.control(
        '',
        Validators.pattern(regExpPassword)
      ),
      confirm: this.fb.nonNullable.control(
        '',
        Validators.pattern(regExpPassword)
      ),
      seedPassword: this.fb.nonNullable.control(
        '',
        Validators.pattern(regExpPassword)
      ),
    },
    {
      validators: [InfiniumValidators.formMatch('password', 'confirm')],
    }
  );

  wallet = {
    id: '',
  };

  walletSaved = false;

  walletSavedName = '';

  progressWidth = '9rem';

  seedPhraseInfo = null;

  private destroy$ = new Subject<void>();

  constructor(
    public walletsService: WalletsService,
    public variablesService: VariablesService,
    private router: Router,
    private backend: BackendService,
    private modalService: ModalService,
    private ngZone: NgZone,
    private translate: TranslateService
  ) {}

  ngOnInit(): void {
    this.checkValidSeedPhrasePassword();
    this.changeDetectionSeedPhrasePassword();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  changeDetectionSeedPhrasePassword(): void {
    this.restoreForm.controls.seedPassword.valueChanges
      .pipe(startWith(null), pairwise(), takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.checkValidSeedPhrasePassword();
        },
      });
    this.restoreForm.controls.key.valueChanges
      .pipe(startWith(null), pairwise(), takeUntil(this.destroy$))
      .subscribe({
        next: () => {
          this.checkValidSeedPhrasePassword();
        },
      });
  }

  checkValidSeedPhrasePassword(): void {
    const seed_password = this.restoreForm.controls.seedPassword.value;
    const seed_phrase = this.restoreForm.controls.key.value;
    this.backend.getSeedPhraseInfo(
      { seed_phrase, seed_password },
      (status, data) => {
        this.ngZone.run(() => {
          this.seedPhraseInfo = data;
        });
      }
    );
  }

  createWallet(): void {
    this.ngZone.run(() => {
      this.progressWidth = '100%';
      this.runWallet();
    });
  }

  saveWallet(): void {
    if (
      this.restoreForm.valid &&
      this.restoreForm.get('name').value.length <=
        this.variablesService.maxWalletNameLength
    ) {
      this.backend.isValidRestoreWalletText(
        {
          seed_phrase: this.restoreForm.get('key').value,
          seed_password: this.restoreForm.get('seedPassword').value,
        },
        (valid_status, valid_data) => {
          if (valid_data !== 'TRUE') {
            this.ngZone.run(() => {
              this.restoreForm.get('key').setErrors({ key_not_valid: true });
            });
          } else {
            this.backend.saveFileDialog(
              this.translate.instant('RESTORE_WALLET.CHOOSE_PATH'),
              '*',
              this.variablesService.settings.default_path,
              (save_status, save_data) => {
                if (save_status) {
                  this.variablesService.settings.default_path =
                    save_data.path.substr(0, save_data.path.lastIndexOf('/'));
                  this.walletSavedName = save_data.path.substr(
                    save_data.path.lastIndexOf('/') + 1,
                    save_data.path.length - 1
                  );
                  this.backend.restoreWallet(
                    save_data.path,
                    this.restoreForm.get('password').value,
                    this.restoreForm.get('key').value,
                    this.restoreForm.get('seedPassword').value,
                    (restore_status, restore_data) => {
                      if (restore_status) {
                        this.wallet.id = restore_data.wallet_id;
                        this.variablesService.opening_wallet = new Wallet(
                          restore_data.wallet_id,
                          this.restoreForm.get('name').value,
                          this.restoreForm.get('password').value,
                          restore_data['wi'].path,
                          restore_data['wi'].address,
                          restore_data['wi'].balance,
                          restore_data['wi'].unlocked_balance,
                          restore_data['wi'].mined_total,
                          restore_data['wi'].tracking_hey
                        );
                        this.variablesService.opening_wallet.is_auditable =
                          restore_data['wi'].is_auditable;
                        this.variablesService.opening_wallet.is_watch_only =
                          restore_data['wi'].is_watch_only;
                        this.variablesService.opening_wallet.currentPage = 1;
                        this.variablesService.opening_wallet.alias =
                          this.backend.getWalletAlias(
                            this.variablesService.opening_wallet.address
                          );
                        this.variablesService.opening_wallet.pages = new Array(
                          1
                        ).fill(1);
                        this.variablesService.opening_wallet.totalPages = 1;
                        this.variablesService.opening_wallet.currentPage = 1;
                        this.variablesService.opening_wallet.total_history_item = 0;
                        this.variablesService.opening_wallet.restore = true;
                        if (
                          restore_data.recent_history &&
                          restore_data.recent_history.history
                        ) {
                          this.variablesService.opening_wallet.totalPages =
                            Math.ceil(
                              restore_data.recent_history.total_history_items /
                                this.variablesService.count
                            );
                          this.variablesService.opening_wallet.totalPages >
                          this.variablesService.maxPages
                            ? (this.variablesService.opening_wallet.pages =
                                new Array(5)
                                  .fill(1)
                                  .map((value, index) => value + index))
                            : (this.variablesService.opening_wallet.pages =
                                new Array(
                                  this.variablesService.opening_wallet.totalPages
                                )
                                  .fill(1)
                                  .map((value, index) => value + index));
                          this.variablesService.opening_wallet.prepareHistory(
                            restore_data.recent_history.history
                          );
                        }
                        this.backend.getContracts(
                          this.variablesService.opening_wallet.wallet_id,
                          (contracts_status, contracts_data) => {
                            if (
                              contracts_status &&
                              hasOwnProperty(contracts_data, 'contracts')
                            ) {
                              this.ngZone.run(() => {
                                this.variablesService.opening_wallet.prepareContractsAfterOpen(
                                  contracts_data.contracts,
                                  this.variablesService.exp_med_ts,
                                  this.variablesService.height_app,
                                  this.variablesService.settings
                                    .viewedContracts,
                                  this.variablesService.settings
                                    .notViewedContracts
                                );
                              });
                            }
                          }
                        );
                        this.ngZone.run(() => {
                          this.walletSaved = true;
                          this.progressWidth = '50%';
                        });
                      } else {
                        this.modalService.prepareModal(
                          'error',
                          'RESTORE_WALLET.NOT_CORRECT_FILE_OR_PASSWORD'
                        );
                      }
                    }
                  );
                }
              }
            );
          }
        }
      );
    }
  }

  runWallet(): void {
    // add flag when wallet was restored form seed
    this.variablesService.after_sync_request[this.wallet.id] = true;
    let exists = false;
    this.variablesService.wallets.forEach(wallet => {
      if (wallet.address === this.variablesService.opening_wallet.address) {
        exists = true;
      }
    });
    if (!exists) {
      this.backend.runWallet(this.wallet.id, (run_status, run_data) => {
        if (run_status) {
          this.walletsService.addWallet(this.variablesService.opening_wallet);
          if (this.variablesService.appPass) {
            this.backend.storeSecureAppData();
          }
          this.ngZone.run(() => {
            this.variablesService.setCurrentWallet(this.wallet.id);
            this.router.navigate(['/wallet/']);
          });
        } else {
          console.log(run_data['error_code']);
        }
      });
    } else {
      this.variablesService.opening_wallet = null;
      this.modalService.prepareModal(
        'error',
        'OPEN_WALLET.WITH_ADDRESS_ALREADY_OPEN'
      );
      this.backend.closeWallet(this.wallet.id, () => {
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        });
      });
    }
  }
}
