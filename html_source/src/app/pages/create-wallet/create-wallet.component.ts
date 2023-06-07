import { Component, inject, NgZone } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { BackendService } from '@api/services/backend.service';
import { VariablesService } from '@parts/services/variables.service';
import { ModalService } from '@parts/services/modal.service';
import { Router } from '@angular/router';
import { Wallet } from '@api/models/wallet.model';
import { TranslateService } from '@ngx-translate/core';
import { regExpPassword, InfiniumValidators } from '@parts/utils/infinium-validators';

@Component({
  selector: 'app-create-wallet',
  template: `<div class="page-container">
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
          <span>{{ 'BREADCRUMBS.CREATE_WALLET' | translate }}</span>
        </div>
      </div>

      <div class="scrolled-content">
        <form [formGroup]="createForm" class="form">
          <div class="form__field">
            <label for="wallet-name">{{
              'CREATE_WALLET.NAME' | translate
            }}</label>
            <input
              (contextmenu)="variablesService.onContextMenu($event)"
              [attr.readonly]="walletSaved ? '' : null"
              [maxlength]="variablesService.maxWalletNameLength + ''"
              [placeholder]="'PLACEHOLDERS.WALLET_NAME_PLACEHOLDER' | translate"
              class="form__field--input"
              formControlName="name"
              id="wallet-name"
              type="text"
            />
            <div
              *ngIf="
                createForm.controls['name'].invalid &&
                (createForm.controls['name'].dirty ||
                  createForm.controls['name'].touched)
              "
              class="error"
            >
              <div *ngIf="createForm.controls['name'].errors['duplicate']">
                {{ 'CREATE_WALLET.FORM_ERRORS.NAME_DUPLICATE' | translate }}
              </div>
              <div *ngIf="createForm.controls['name'].errors['required']">
                {{ 'CREATE_WALLET.FORM_ERRORS.NAME_REQUIRED' | translate }}
              </div>
            </div>
            <div
              *ngIf="
                createForm.get('name').value.length >=
                variablesService.maxWalletNameLength
              "
              class="error"
            >
              {{ 'CREATE_WALLET.FORM_ERRORS.MAX_LENGTH' | translate }}
            </div>
          </div>

          <div class="form__field">
            <label for="wallet-password">{{
              'CREATE_WALLET.PASS' | translate
            }}</label>
            <input
              (contextmenu)="variablesService.onContextMenuPasteSelect($event)"
              [attr.readonly]="walletSaved ? '' : null"
              class="form__field--input"
              formControlName="password"
              id="wallet-password"
              placeholder="{{ 'PLACEHOLDERS.PLACEHOLDER_NEW' | translate }}"
              type="password"
            />
            <div
              *ngIf="
                createForm.controls['password'].dirty &&
                createForm.controls['password'].errors
              "
              class="error"
            >
              <div *ngIf="createForm.controls['password'].errors.pattern">
                {{ 'ERRORS.WRONG_PASSWORD' | translate }}
              </div>
            </div>
          </div>

          <div class="form__field">
            <label for="confirm-wallet-password">{{
              'CREATE_WALLET.CONFIRM' | translate
            }}</label>
            <input
              (contextmenu)="variablesService.onContextMenuPasteSelect($event)"
              [attr.readonly]="walletSaved ? '' : null"
              [class.invalid]="
                createForm.errors &&
                createForm.errors['mismatch'] &&
                createForm.get('confirm').value.length > 0
              "
              class="form__field--input"
              formControlName="confirm"
              id="confirm-wallet-password"
              placeholder="{{ 'PLACEHOLDERS.PLACEHOLDER_CONFIRM' | translate }}"
              type="password"
            />
            <div
              *ngIf="
                createForm.controls['confirm'].dirty &&
                createForm.errors &&
                createForm.errors['mismatch'] &&
                createForm.get('confirm').value.length > 0
              "
              class="error"
            >
              {{ 'CREATE_WALLET.FORM_ERRORS.CONFIRM_NOT_MATCH' | translate }}
            </div>
          </div>

          <button
            *ngIf="walletSaved"
            class="outline big w-100 mb-2"
            disabled
            type="button"
          >
            <i class="icon check-circle mr-1"></i>{{ walletSavedName }}
          </button>

          <button
            (click)="saveWallet()"
            *ngIf="!walletSaved"
            [disabled]="!createForm.valid"
            class="outline big w-100 mb-2"
            type="button"
          >
            {{ 'CREATE_WALLET.BUTTON_SELECT' | translate }}
          </button>

          <button
            (click)="createWallet()"
            [disabled]="!walletSaved"
            class="primary big w-100"
            type="button"
          >
            {{ 'CREATE_WALLET.BUTTON_CREATE' | translate }}
          </button>
        </form>
      </div>
    </div>
  </div> `,
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
export class CreateWalletComponent {
  fb = inject(FormBuilder);

  createForm = this.fb.group(
    {
      name: this.fb.nonNullable.control('', [
        Validators.required,
        InfiniumValidators.duplicate(
          this.variablesService.walletNamesForComparisons
        ),
      ]),
      password: this.fb.nonNullable.control(
        '',
        Validators.pattern(regExpPassword)
      ),
      confirm: this.fb.nonNullable.control(''),
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

  constructor(
    public variablesService: VariablesService,
    private router: Router,
    private backend: BackendService,
    private modalService: ModalService,
    private ngZone: NgZone,
    private translate: TranslateService
  ) {}

  async createWallet(): Promise<void> {
    return await this.ngZone.run(async () => {
      this.progressWidth = '100%';
      await this.router.navigate(['/seed-phrase'], {
        queryParams: { wallet_id: this.wallet.id },
      });
    });
  }

  saveWallet(): void {
    if (
      this.createForm.valid &&
      this.createForm.get('name').value.length <=
        this.variablesService.maxWalletNameLength
    ) {
      this.backend.saveFileDialog(
        this.translate.instant('CREATE_WALLET.TITLE_SAVE'),
        '*',
        this.variablesService.settings.default_path,
        (file_status, file_data) => {
          if (file_status) {
            this.variablesService.settings.default_path = file_data.path.substr(
              0,
              file_data.path.lastIndexOf('/')
            );
            this.walletSavedName = file_data.path.substr(
              file_data.path.lastIndexOf('/') + 1,
              file_data.path.length - 1
            );
            this.backend.generateWallet(
              file_data.path,
              this.createForm.get('password').value,
              (generate_status, generate_data, errorCode) => {
                if (generate_status) {
                  this.wallet.id = generate_data.wallet_id;
                  this.variablesService.opening_wallet = new Wallet(
                    generate_data.wallet_id,
                    this.createForm.get('name').value,
                    this.createForm.get('password').value,
                    generate_data['wi'].path,
                    generate_data['wi'].address,
                    generate_data['wi'].balance,
                    generate_data['wi'].unlocked_balance,
                    generate_data['wi'].mined_total,
                    generate_data['wi'].tracking_hey
                  );
                  this.variablesService.opening_wallet.alias =
                    this.backend.getWalletAlias(generate_data['wi'].address);
                  this.variablesService.opening_wallet.total_history_item = 0;
                  this.variablesService.opening_wallet.pages = new Array(
                    1
                  ).fill(1);
                  this.variablesService.opening_wallet.totalPages = 1;
                  this.variablesService.opening_wallet.currentPage = 1;
                  this.ngZone.run(() => {
                    this.walletSaved = true;
                    this.progressWidth = '33%';
                  });
                } else {
                  if (errorCode && errorCode === 'ALREADY_EXISTS') {
                    this.modalService.prepareModal(
                      'error',
                      'CREATE_WALLET.ERROR_CANNOT_SAVE_TOP'
                    );
                  } else {
                    this.modalService.prepareModal(
                      'error',
                      'CREATE_WALLET.ERROR_CANNOT_SAVE_SYSTEM'
                    );
                  }
                }
              }
            );
          }
        }
      );
    }
  }
}
