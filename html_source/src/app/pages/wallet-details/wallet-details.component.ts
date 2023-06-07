import { Component, inject, NgZone } from '@angular/core';
import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { BackendService } from '@api/services/backend.service';
import { VariablesService } from '@parts/services/variables.service';
import { Router } from '@angular/router';
import { hasOwnProperty } from '@parts/functions/hasOwnProperty';
import { regExpPassword, InfiniumValidators } from '@parts/utils/infinium-validators';

@Component({
  selector: 'app-wallet-details',
  template: `
    <div class="page-container">
      <div class="toolbar mb-2">
        <div class="left">
          <button appBackButton class="btn-icon circle big mr-2" type="button">
            <i class="icon dropdown-arrow-left"></i>
          </button>
          <h1>{{ 'BREADCRUMBS.WALLET_DETAILS' | translate }}</h1>
        </div>
        <div class="right"></div>
      </div>

      <div class="page-content">
        <div class="breadcrumbs mb-2">
          <div class="breadcrumb">
            <a [routerLink]="['/wallet/history']">{{
              variablesService.currentWallet.name
            }}</a>
          </div>
          <div class="breadcrumb">
            <span>{{ 'BREADCRUMBS.WALLET_DETAILS' | translate }}</span>
          </div>
        </div>

        <div class="scrolled-content">
          <div fxFlexFill fxLayout="column" fxLayoutAlign="start stretch">
            <form
              (ngSubmit)="beforeSubmitDetails()"
              [formGroup]="detailsForm"
              class="form"
            >
              <div class="form__field">
                <label for="wallet-name">{{
                  'WALLET_DETAILS.LABEL_NAME' | translate
                }}</label>
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
                    detailsForm.controls.name.invalid &&
                    (detailsForm.controls.name.dirty ||
                      detailsForm.controls.name.touched)
                  "
                  class="error"
                >
                  <div *ngIf="detailsForm.controls.name.errors['duplicate']">
                    {{
                      'WALLET_DETAILS.FORM_ERRORS.NAME_DUPLICATE' | translate
                    }}
                  </div>
                  <div
                    *ngIf="
                      detailsForm.controls.name.value.length >=
                      variablesService.maxWalletNameLength
                    "
                  >
                    {{ 'WALLET_DETAILS.FORM_ERRORS.MAX_LENGTH' | translate }}
                  </div>
                  <div *ngIf="detailsForm.controls.name.hasError('required')">
                    {{ 'WALLET_DETAILS.FORM_ERRORS.NAME_REQUIRED' | translate }}
                  </div>
                </div>
              </div>
              <div
                fxLayout="row nowrap"
                fxLayoutAlign="start center"
                fxLayoutGap="1rem"
              >
                <button
                  [disabled]="detailsForm.invalid"
                  class="primary big max-w-19-rem w-100 mb-1"
                  type="submit"
                >
                  {{ 'SETTINGS.MASTER_PASSWORD.BUTTON' | translate }}
                </button>
                <p *ngIf="ifSaved" class="color-aqua">Saved!</p>
              </div>
              <div class="form__field">
                <label for="wallet-location">{{
                  'WALLET_DETAILS.LABEL_FILE_LOCATION' | translate
                }}</label>
                <input
                  (contextmenu)="
                    variablesService.onContextMenuOnlyCopy(
                      $event,
                      detailsForm.controls.path.value
                    )
                  "
                  class="form__field--input cursor-default"
                  formControlName="path"
                  id="wallet-location"
                  readonly
                  type="text"
                />
              </div>
            </form>

            <ng-container
              *ngIf="
                !variablesService.currentWallet?.is_auditable &&
                !variablesService.currentWallet?.is_watch_only
              "
            >
              <ng-container *ngIf="!showSeed; else seedPhraseContent">
                <form
                  (ngSubmit)="beforeSubmitPasswordSeedPhrase()"
                  [formGroup]="passwordSeedPhraseForm"
                  class="form bg-light-blue-details p-2"
                  fxFlex="0 0 auto"
                  fxLayout="column"
                  fxLayoutAlign="start center"
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
                        passwordSeedPhraseForm.invalid &&
                        passwordSeedPhraseForm.get('confirmPassword').value
                          .length > 0
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
                        passwordSeedPhraseForm.invalid &&
                        (passwordSeedPhraseForm.controls['confirmPassword']
                          .dirty ||
                          passwordSeedPhraseForm.controls['confirmPassword']
                            .touched)
                      "
                      class="error"
                    >
                      <div
                        *ngIf="
                          passwordSeedPhraseForm.invalid &&
                          passwordSeedPhraseForm.get('confirmPassword').value
                            .length > 0
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
                    [disabled]="!passwordSeedPhraseForm.valid"
                    class="primary big w-100 mb-2"
                    type="submit"
                  >
                    <i class="icon check-shield mr-1"></i>
                    {{ 'WALLET_DETAILS.FORM.GENERATE_SECURE_SEED' | translate }}
                  </button>

                  <p
                    class="color-primary"
                    fxLayout="row"
                    fxLayoutAlign="center center"
                  >
                    <i class="icon info-circle mr-1"></i>
                    {{
                      'WALLET_DETAILS.FORM.SECURED_SEED_WILL_REQUIRE'
                        | translate
                    }}
                  </p>
                </form>
              </ng-container>

              <ng-template #seedPhraseContent>
                <div
                  class="seed-phrase bg-light-blue-details p-2 border-radius-0_8-rem"
                  fxFlex="0 0 auto"
                  fxLayout="column"
                >
                  <div
                    class="header mb-2"
                    fxFlex="0 0 auto"
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
                          passwordSeedPhraseForm.controls.password.value
                            .length === 0
                        "
                        class="status color-red"
                        fxLayout="row"
                        fxLayoutAlign="start center"
                      >
                        {{ 'WALLET_DETAILS.SEED_IS_UNSECURED' | translate }}
                        <i class="icon unsecured ml-1"></i>
                      </span>
                      <span
                        *ngIf="
                          passwordSeedPhraseForm.controls.password.value
                            .length > 0
                        "
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
                        <span class="word" fxLayout="row">{{ word }}</span>
                      </div>
                    </ng-container>
                  </div>
                  <div class="footer max-w-50-rem w-100" fxLayout="column">
                    <button
                      (click)="copySeedPhrase()"
                      class="outline big w-100 mb-2"
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
                    <p
                      *ngIf="
                        passwordSeedPhraseForm.controls.password.value.length >
                        0
                      "
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
            </ng-container>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class WalletDetailsComponent {
  seedPhrase = '';

  showSeed = false;

  seedPhraseCopied = false;

  ifSaved = false;

  fb = inject(NonNullableFormBuilder);

  detailsForm = this.fb.group({
    name: this.fb.control('', [
      Validators.required,
      InfiniumValidators.duplicate(this.variablesService.walletNamesForComparisons),
    ]),
    path: this.fb.control(''),
  });

  passwordSeedPhraseForm = this.fb.group(
    {
      password: this.fb.control('', Validators.pattern(regExpPassword)),
      confirmPassword: this.fb.control('', Validators.pattern(regExpPassword)),
    },
    {
      validators: [InfiniumValidators.formMatch('password', 'confirmPassword')],
    }
  );

  constructor(
    public variablesService: VariablesService,
    private router: Router,
    private backend: BackendService,
    private ngZone: NgZone
  ) {
    const { currentWallet } = this.variablesService;
    const { name, path } = currentWallet;
    this.detailsForm.patchValue(
      {
        name,
        path,
      },
      {
        emitEvent: false,
      }
    );
  }

  beforeSubmitPasswordSeedPhrase(): void {
    if (this.passwordSeedPhraseForm.invalid) {
      this.passwordSeedPhraseForm.updateValueAndValidity();
      this.passwordSeedPhraseForm.markAllAsTouched();
      return;
    }

    this.submitPasswordSeedPhrase();
  }

  submitPasswordSeedPhrase(): void {
    const { wallet_id } = this.variablesService.currentWallet;
    const { password: seed_password } =
      this.passwordSeedPhraseForm.getRawValue();
    this.backend.getSmartWalletInfo(
      { wallet_id, seed_password },
      (status, data) => {
        if (hasOwnProperty(data, 'seed_phrase')) {
          this.ngZone.run(() => {
            this.showSeed = true;
            this.seedPhrase = data['seed_phrase'].trim();
          });
        }
      }
    );
  }

  beforeSubmitDetails(): void {
    if (this.detailsForm.invalid) {
      this.detailsForm.updateValueAndValidity();
      this.detailsForm.markAllAsTouched();
      return;
    }

    this.submitDetails();
  }

  submitDetails(): void {
    const getRawValue = this.detailsForm.getRawValue();
    const { name } = getRawValue;
    this.variablesService.currentWallet.name = name;
    this.detailsForm.reset(getRawValue);
    this.refreshDetailsFormValidators();
    this.ifSaved = true;
    setTimeout(() => {
      this.ifSaved = false;
    }, 3000);
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

  private refreshDetailsFormValidators(): void {
    const walletNamesForComparisons =
      this.variablesService.walletNamesForComparisons;
    const validatorsForName = [
      Validators.required,
      InfiniumValidators.duplicate(walletNamesForComparisons),
    ];
    this.detailsForm.controls.name.clearValidators();
    this.detailsForm.controls.name.setValidators(validatorsForName);
    this.detailsForm.controls.name.updateValueAndValidity();
  }
}
