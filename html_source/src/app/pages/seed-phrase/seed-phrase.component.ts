import { Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { BackendService } from '@api/services/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VariablesService } from '@parts/services/variables.service';
import { ModalService } from '@parts/services/modal.service';
import { FormBuilder, Validators } from '@angular/forms';
import { hasOwnProperty } from '@parts/functions/hasOwnProperty';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { regExpPassword, InfiniumValidators } from '@parts/utils/infinium-validators';
import { WalletsService } from '@parts/services/wallets.service';

@Component({
  selector: 'app-seed-phrase',
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
            <span>{{ 'BREADCRUMBS.SAVE_PHRASE' | translate }}</span>
          </div>
        </div>

        <div class="scrolled-content">
          <div class="wrap-seed-phrase" fxFlex="100" fxLayout="column">
            <form [formGroup]="detailsForm" class="form">
              <div class="form__field">
                <label>{{ 'WALLET_DETAILS.LABEL_NAME' | translate }}</label>
                <input
                  (contextmenu)="variablesService.onContextMenu($event)"
                  [maxLength]="variablesService.maxWalletNameLength"
                  [placeholder]="
                    'PLACEHOLDERS.WALLET_NAME_PLACEHOLDER' | translate
                  "
                  class="form__field--input"
                  formControlName="name"
                  id="wallet-name"
                  readonly
                  type="text"
                />
                <div
                  *ngIf="
                    detailsForm.controls['name'].invalid &&
                    (detailsForm.controls['name'].dirty ||
                      detailsForm.controls['name'].touched)
                  "
                  class="error"
                >
                  <div *ngIf="detailsForm.controls['name'].errors['duplicate']">
                    {{
                      'WALLET_DETAILS.FORM_ERRORS.NAME_DUPLICATE' | translate
                    }}
                  </div>
                  <div
                    *ngIf="
                      detailsForm.get('name').value.length >=
                      variablesService.maxWalletNameLength
                    "
                  >
                    {{ 'WALLET_DETAILS.FORM_ERRORS.MAX_LENGTH' | translate }}
                  </div>
                  <div *ngIf="detailsForm.controls['name'].errors['required']">
                    {{ 'WALLET_DETAILS.FORM_ERRORS.NAME_REQUIRED' | translate }}
                  </div>
                </div>
              </div>

              <div class="form__field">
                <label for="wallet-location">{{
                  'WALLET_DETAILS.LABEL_FILE_LOCATION' | translate
                }}</label>
                <input
                  class="form__field--input"
                  formControlName="path"
                  id="wallet-location"
                  readonly
                  type="text"
                />
              </div>
            </form>

            <ng-container *ngIf="!showSeed; else seedPhraseContent">
              <form
                (ngSubmit)="onSubmitSeed()"
                [formGroup]="seedPhraseForm"
                class="form bg-light-blue-details p-2"
              >
                <div class="form__field">
                  <label for="create-password">{{
                    'WALLET_DETAILS.CREATE_PASSWORD_SECURE' | translate
                  }}</label>
                  <input
                    class="form__field--input"
                    formControlName="password"
                    id="create-password"
                    placeholder="{{
                      'PLACEHOLDERS.PASSWORD_PLACEHOLDER' | translate
                    }}"
                    type="password"
                  />
                </div>

                <div class="form__field">
                  <label for="confirm-password">{{
                    'WALLET_DETAILS.FORM.CONFIRM_PASSWORD' | translate
                  }}</label>
                  <input
                    [class.invalid]="
                      seedPhraseForm.invalid &&
                      seedPhraseForm.get('confirmPassword').value.length > 0
                    "
                    class="form__field--input"
                    formControlName="confirmPassword"
                    id="confirm-password"
                    placeholder="{{
                      'PLACEHOLDERS.PLACEHOLDER_CONFIRM' | translate
                    }}"
                    type="password"
                  />
                  <div
                    *ngIf="
                      seedPhraseForm.invalid &&
                      (seedPhraseForm.controls['confirmPassword'].dirty ||
                        seedPhraseForm.controls['confirmPassword'].touched)
                    "
                    class="error"
                  >
                    <div
                      *ngIf="
                        seedPhraseForm.invalid &&
                        seedPhraseForm.get('confirmPassword').value.length > 0
                      "
                    >
                      {{
                        'WALLET_DETAILS.FORM_ERRORS.PASSWORDS_DONT_MATCH'
                          | translate
                      }}
                    </div>
                  </div>
                </div>

                <button
                  [disabled]="!seedPhraseForm.valid"
                  class="primary w-100 big mb-2"
                  type="submit"
                >
                  <i class="icon check-shield mr-1"></i>
                  {{ 'WALLET_DETAILS.FORM.GENERATE_SECURE_SEED' | translate }}
                </button>

                <p class="text-align-center color-primary">
                  <i class="icon info-circle mr-1"></i>
                  {{
                    'WALLET_DETAILS.FORM.SECURED_SEED_WILL_REQUIRE' | translate
                  }}
                </p>
              </form>
            </ng-container>

            <ng-template #seedPhraseContent>
              <div
                class="seed-phrase bg-light-blue-details p-2 border-radius-0_8-rem"
              >
                <div
                  class="header mb-2"
                  fxLayout="row"
                  fxLayoutAlign="space-between center"
                >
                  <div class="left">
                    <span>{{
                      'WALLET_DETAILS.LABEL_SEED_PHRASE' | translate
                    }}</span>
                  </div>
                  <div class="right">
                    <span
                      *ngIf="
                        seedPhraseForm.controls.password.value.length === 0
                      "
                      class="status color-red"
                      fxLayout="row"
                      fxLayoutAlign="start center"
                    >
                      {{ 'WALLET_DETAILS.SEED_IS_UNSECURED' | translate }}
                      <i class="icon unsecured ml-1"></i>
                    </span>
                    <span
                      *ngIf="seedPhraseForm.controls.password.value.length > 0"
                      class="status color-aqua"
                      fxLayout="row"
                      fxLayoutAlign="start center"
                    >
                      {{ 'WALLET_DETAILS.SEED_IS_SECURED' | translate }}
                      <i class="icon secured ml-1"></i>
                    </span>
                  </div>
                </div>
                <div
                  (contextmenu)="
                    variablesService.onContextMenuOnlyCopy($event, seedPhrase)
                  "
                  class="content mb-1"
                  fxLayout="row wrap"
                >
                  <ng-container
                    *ngFor="
                      let word of seedPhrase.split(' ');
                      let index = index
                    "
                  >
                    <div
                      class="item p-1 mr-1 mb-1 border-radius-0_8-rem"
                      fxLayout="row nowrap"
                      fxLayoutAlign="start center"
                    >
                      <div
                        class="number p-1 mr-1"
                        fxLayout="row"
                        fxLayoutAlign="center center"
                      >
                        {{ index + 1 }}
                      </div>
                      <span class="word">{{ word }}</span>
                    </div>
                  </ng-container>
                </div>
                <div
                  class="footer max-w-50-rem w-100"
                  fxLayout="column"
                  fxLayoutAlign="start center"
                >
                  <div
                    *ngIf="showSeed"
                    class="wrap-buttons w-100 mb-2"
                    fxLayout="row nowrap"
                  >
                    <button
                      (click)="runWallet()"
                      class="primary big w-100 mr-1"
                      type="button"
                    >
                      {{ 'SEED_PHRASE.BUTTON_CREATE_ACCOUNT' | translate }}
                    </button>
                    <button
                      (click)="copySeedPhrase()"
                      class="outline big w-100 ml-1"
                      type="button"
                    >
                      <ng-container *ngIf="!seedPhraseCopied">
                        <i class="icon copy mr-1"></i>
                        {{ 'SEED_PHRASE.BUTTON_COPY' | translate }}
                      </ng-container>
                      <ng-container *ngIf="seedPhraseCopied">
                        <i class="icon check mr-1"></i>
                        {{ 'SEED_PHRASE.BUTTON_COPIED' | translate }}
                      </ng-container>
                    </button>
                  </div>
                  <p
                    *ngIf="seedPhraseForm.controls.password.value.length > 0"
                    class="text-align-center"
                  >
                    <i class="icon info-circle mr-1"></i>
                    <span class="color-primary">{{
                      'WALLET_DETAILS.REMEMBER_YOU_WILL_REQUIRE' | translate
                    }}</span>
                  </p>
                </div>
              </div>
            </ng-template>
          </div>
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
export class SeedPhraseComponent implements OnInit, OnDestroy {
  seedPhrase = '';

  showSeed = false;

  wallet_id: number;

  seedPhraseCopied = false;

  progressWidth = '66%';

  fb = inject(FormBuilder);

  detailsForm = this.fb.group({
    name: this.fb.nonNullable.control('', [
      InfiniumValidators.duplicate(this.variablesService.walletNamesForComparisons),
    ]),
    path: this.fb.nonNullable.control(''),
  });

  seedPhraseForm = this.fb.group(
    {
      password: this.fb.nonNullable.control(
        '',
        Validators.pattern(regExpPassword)
      ),
      confirmPassword: this.fb.nonNullable.control(
        '',
        Validators.pattern(regExpPassword)
      ),
    },
    {
      validators: [InfiniumValidators.formMatch('password', 'confirmPassword')],
    }
  );

  private destroy$ = new Subject<void>();

  constructor(
    public walletsService: WalletsService,
    public variablesService: VariablesService,
    private route: ActivatedRoute,
    private router: Router,
    private backend: BackendService,
    private modalService: ModalService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.showSeed = false;
    this.getWalletId();
    this.setWalletInfoNamePath();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  runWallet(): void {
    let exists = false;
    this.variablesService.wallets.forEach(wallet => {
      if (wallet.address === this.variablesService.opening_wallet.address) {
        exists = true;
      }
    });
    if (!exists) {
      this.backend.runWallet(this.wallet_id, (run_status, run_data) => {
        if (run_status) {
          this.walletsService.addWallet(this.variablesService.opening_wallet);
          if (this.variablesService.appPass) {
            this.backend.storeSecureAppData();
          }
          this.ngZone.run(() => {
            this.variablesService.setCurrentWallet(this.wallet_id);
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
      this.backend.closeWallet(this.wallet_id, () => {
        this.ngZone.run(() => {
          this.router.navigate(['/']);
        });
      });
    }
  }

  copySeedPhrase(): void {
    this.backend.setClipboard(this.seedPhrase, () => {
      this.ngZone.run(() => {
        setTimeout(() => {
          this.seedPhraseCopied = false;
        }, 4000);
        this.seedPhraseCopied = true;
      });
    });
  }

  showSeedPhrase(): void {
    this.showSeed = true;
    this.progressWidth = '100%';
  }

  onSubmitSeed(): void {
    if (this.seedPhraseForm.valid) {
      this.showSeedPhrase();
      const wallet_id = this.wallet_id;
      const seed_password = this.seedPhraseForm.controls.password.value;
      this.backend.getSmartWalletInfo(
        { wallet_id, seed_password },
        (status, data) => {
          if (hasOwnProperty(data, 'seed_phrase')) {
            this.ngZone.run(() => {
              this.seedPhrase = data['seed_phrase'].trim();
            });
          }
        }
      );
    }
  }

  private setWalletInfoNamePath(): void {
    this.detailsForm
      .get('name')
      .setValue(this.variablesService.opening_wallet.name);
    this.detailsForm
      .get('path')
      .setValue(this.variablesService.opening_wallet.path);
  }

  private getWalletId(): void {
    this.route.queryParams.pipe(takeUntil(this.destroy$)).subscribe({
      next: params => {
        if (params.wallet_id) {
          this.wallet_id = params.wallet_id;
        }
      },
    });
  }
}
