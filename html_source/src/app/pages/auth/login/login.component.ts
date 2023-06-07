import { Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Validators, ValidationErrors, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '@api/services/backend.service';
import { VariablesService } from '@parts/services/variables.service';
import { ModalService } from '@parts/services/modal.service';
import { Wallet } from '@api/models/wallet.model';
import { hasOwnProperty } from '@parts/functions/hasOwnProperty';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { regExpPassword, InfiniumValidators } from '@parts/utils/infinium-validators';
import { WalletsService } from '@parts/services/wallets.service';

@Component({
  selector: 'app-login',
  template: `
    <div class="auth" fxFlexFill fxLayout="row" fxLayoutAlign="center center">
      <div
        class="card max-w-42-rem max-h-100 w-100 p-2 border-radius-0_8-rem bg-light-blue overflow-x-hidden"
      >
        <div
          class="logo border-radius-0_8-rem overflow-hidden mb-3"
          fxLayout="row"
          fxLayoutAlign="center center"
        >
          <img alt="infinium-logo" src="assets/icons/blue/infinium-logo.svg" />
        </div>

        <form
          (ngSubmit)="onSubmitCreatePass()"
          *ngIf="type === 'reg'"
          [formGroup]="regForm"
          class="form bg-light-blue-details"
        >
          <div
            class="form__field--wrapper pt-2 pl-2 pr-2 pb-1 mb-2 bg-light-blue-details border-radius-0_8-rem overflow-hidden"
          >
            <div class="form__field mb-2">
              <label for="master-pass">{{
                'LOGIN.SETUP_MASTER_PASS' | translate
              }}</label>
              <input
                (contextmenu)="
                  variablesService.onContextMenuPasteSelect($event)
                "
                class="form__field--input"
                formControlName="password"
                id="master-pass"
                placeholder="{{
                  'PLACEHOLDERS.MASTER_PASS_PLACEHOLDER' | translate
                }}"
                type="password"
              />
              <div
                *ngIf="
                  regForm.controls['password'].dirty &&
                  regForm.controls['password'].errors
                "
                class="error"
              >
                <div *ngIf="regForm.controls['password'].errors.pattern">
                  {{ 'ERRORS.WRONG_PASSWORD' | translate }}
                </div>
              </div>
            </div>

            <div class="form__field">
              <label for="confirm-pass">{{
                'LOGIN.SETUP_CONFIRM_PASS' | translate
              }}</label>
              <input
                (contextmenu)="
                  variablesService.onContextMenuPasteSelect($event)
                "
                class="form__field--input"
                formControlName="confirmation"
                id="confirm-pass"
                placeholder="{{
                  'PLACEHOLDERS.PLACEHOLDER_CONFIRM' | translate
                }}"
                type="password"
              />
              <div
                *ngIf="
                  regForm.controls['password'].dirty &&
                  regForm.controls['confirmation'].dirty &&
                  regForm.errors
                "
                class="error"
              >
                <div *ngIf="regForm.errors['mismatch']">
                  {{ 'LOGIN.FORM_ERRORS.MISMATCH' | translate }}
                </div>
              </div>
            </div>
          </div>

          <button
            [disabled]="
              !regForm.controls['password'].value.length ||
              !regForm.controls['confirmation'].value.length ||
              (regForm.errors && regForm.errors['mismatch']) ||
              regForm.controls['password'].errors
            "
            class="primary big w-100 mb-1"
            type="submit"
          >
            {{ 'LOGIN.BUTTON_NEXT' | translate }}
          </button>

          <button
            (click)="onSkipCreatePass()"
            [disabled]="
              regForm.controls['password'].value.length ||
              regForm.controls['confirmation'].value.length
            "
            class="primary big w-100"
            type="button"
          >
            {{ 'LOGIN.BUTTON_SKIP' | translate }}
          </button>
        </form>

        <form
          (ngSubmit)="onSubmitAuthPass()"
          *ngIf="type !== 'reg'"
          [formGroup]="authForm"
          class="form"
        >
          <div
            class="form__field--wrapper pt-2 pl-2 pr-2 pb-1 mb-2 bg-light-blue-details border-radius-0_8-rem overflow-hidden"
          >
            <div class="form__field">
              <label for="master-pass-login">{{
                'LOGIN.MASTER_PASS' | translate
              }}</label>
              <input
                (contextmenu)="
                  variablesService.onContextMenuPasteSelect($event)
                "
                [placeholder]="
                  'PLACEHOLDERS.MASTER_PASS_PLACEHOLDER' | translate
                "
                autofocus
                class="form__field--input"
                formControlName="password"
                id="master-pass-login"
                type="password"
              />
              <div
                *ngIf="
                  authForm.controls['password'].invalid &&
                  (authForm.controls['password'].dirty ||
                    authForm.controls['password'].touched)
                "
                class="error"
              >
                <div
                  *ngIf="
                    authForm.controls['password'].hasError('wrong_password')
                  "
                >
                  {{ 'LOGIN.FORM_ERRORS.INVALID_PASS' | translate }}
                </div>
              </div>
            </div>
          </div>
          <button class="primary big w-100 mb-1" type="submit">
            {{ 'LOGIN.BUTTON_NEXT' | translate }}
          </button>

          <button
            (click)="dropSecureAppData()"
            class="outline big w-100"
            type="button"
          >
            {{ 'LOGIN.BUTTON_RESET' | translate }}
          </button>
        </form>
      </div>

      <app-synchronization-status
        class="max-w-19-rem"
      ></app-synchronization-status>
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
export class LoginComponent implements OnInit, OnDestroy {
  fb = inject(FormBuilder);

  regForm = this.fb.group(
    {
      password: this.fb.nonNullable.control(
        '',
        Validators.pattern(regExpPassword)
      ),
      confirmation: this.fb.nonNullable.control(''),
    },
    {
      validators: [InfiniumValidators.formMatch('password', 'confirmation')],
    }
  );

  authForm = this.fb.group({
    password: this.fb.nonNullable.control(''),
  });

  type = 'reg';

  private destroy$ = new Subject<void>();

  constructor(
    public variablesService: VariablesService,
    public walletsService: WalletsService,
    private route: ActivatedRoute,
    private router: Router,
    private backend: BackendService,
    private modalService: ModalService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe({
      next: params => {
        if (params.type) {
          this.type = params.type;
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  onSubmitCreatePass(): void {
    if (this.regForm.valid) {
      this.variablesService.appPass = this.regForm.get('password').value; // the pass what was written in input of login form by user

      this.backend.setMasterPassword(
        { pass: this.variablesService.appPass },
        (status, data) => {
          if (status) {
            this.backend.storeSecureAppData({
              pass: this.variablesService.appPass,
            });
            this.variablesService.appLogin = true;
            this.variablesService.dataIsLoaded = true;
            if (this.variablesService.settings.appLockTime) {
              this.variablesService.startCountdown();
            }
            this.ngZone.run(() => {
              this.router.navigate(['/']);
            });
          } else {
            console.log(data['error_code']);
          }
        }
      );
    }
  }

  onSkipCreatePass(): void {
    this.variablesService.appPass = '';
    this.ngZone.run(() => {
      this.variablesService.appLogin = true;
      this.router.navigate(['/']);
    });
  }

  dropSecureAppData(): void {
    this.backend.dropSecureAppData(() => {
      this.onSkipCreatePass();
    });
    this.variablesService.wallets = [];
    this.variablesService.contacts = [];
  }

  onSubmitAuthPass(): void {
    if (this.authForm.valid) {
      this.variablesService.appPass = this.authForm.get('password').value;
      if (this.variablesService.dataIsLoaded) {
        this.backend.checkMasterPassword(
          { pass: this.variablesService.appPass },
          status => {
            if (status) {
              this.variablesService.appLogin = true;
              if (this.variablesService.settings.appLockTime) {
                this.variablesService.startCountdown();
              }
              this.ngZone.run(() => {
                this.router.navigate(['/'], {
                  queryParams: { prevUrl: 'login' },
                });
              });
            } else {
              this.ngZone.run(() => {
                this.setAuthPassError({ wrong_password: true });
              });
            }
          }
        );
      } else {
        this.getData(this.variablesService.appPass);
      }
    }
  }

  getData(appPass): void {
    this.backend.getSecureAppData({ pass: appPass }, (status, data) => {
      if (!data.error_code) {
        this.setAuthPassError(null);
        this.variablesService.appLogin = true;
        this.variablesService.dataIsLoaded = true;
        if (this.variablesService.settings.appLockTime) {
          this.variablesService.startCountdown();
        }
        this.variablesService.appPass = appPass;
        const isEmptyObject =
          Object.keys(data).length === 0 && data.constructor === Object;

        if (this.variablesService.wallets.length > 0) {
          this.ngZone.run(() => {
            this.router.navigate(['/wallet/']);
          });
          return;
        }
        if (hasOwnProperty(data, 'contracts')) {
          if (Object.keys(data['contacts']).length !== 0) {
            data['contacts'].map(contact => {
              this.variablesService.contacts.push(contact);
            });
          }
        }
        if (hasOwnProperty(data, 'wallets')) {
          if (Object.keys(data['wallets']).length !== 0) {
            this.getWalletData(data['wallets']);
          } else {
            this.ngZone.run(() => {
              this.router.navigate(['/']);
            });
          }
        }
        if (
          !hasOwnProperty(data, 'wallets') &&
          !hasOwnProperty(data, 'contracts')
        ) {
          if (data.length !== 0 && !isEmptyObject) {
            this.getWalletData(data);
          } else {
            this.ngZone.run(() => {
              this.router.navigate(['/']);
            });
          }
        }
      }

      if (data.error_code === 'WRONG_PASSWORD') {
        this.ngZone.run(() => {
          this.setAuthPassError({ wrong_password: true });
        });
      }
    });
  }

  getWalletData(walletData): void {
    let openWallets = 0;
    let runWallets = 0;
    walletData.forEach((wallet, wallet_index) => {
      this.backend.openWallet(
        wallet.path,
        wallet.pass,
        this.variablesService.count,
        true,
        (open_status, open_data, open_error) => {
          if (open_status || open_error === 'FILE_RESTORED') {
            openWallets++;
            this.ngZone.run(() => {
              const new_wallet = new Wallet(
                open_data.wallet_id,
                wallet.name,
                wallet.pass,
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
              if (wallet.staking) {
                new_wallet.staking = true;
                this.backend.startPosMining(new_wallet.wallet_id);
              } else {
                new_wallet.staking = false;
              }
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
              if (this.variablesService.wallets.length === 1) {
                this.router.navigate(['/wallet/']);
              }
            });
            this.backend.runWallet(open_data.wallet_id, run_status => {
              if (run_status) {
                runWallets++;
              } else {
                if (
                  wallet_index === walletData.length - 1 &&
                  runWallets === 0
                ) {
                  this.ngZone.run(() => {
                    this.router.navigate(['/']);
                  });
                }
              }
            });
          } else {
            if (wallet_index === walletData.length - 1 && openWallets === 0) {
              this.ngZone.run(() => {
                this.router.navigate(['/']);
              });
            }
          }
        }
      );
    });
  }

  private setAuthPassError(errors: ValidationErrors | null): void {
    this.authForm.controls['password'].setErrors(errors);
  }
}
