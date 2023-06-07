import { Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormControl, NonNullableFormBuilder, ValidationErrors, Validators } from '@angular/forms';
import { BackendService } from '@api/services/backend.service';
import { VariablesService } from '@parts/services/variables.service';
import { ModalService } from '@parts/services/modal.service';
import { BigNumber } from 'bignumber.js';
import { MIXIN } from '@parts/data/constants';
import { HttpClient } from '@angular/common/http';
import { MoneyToIntPipe } from '@parts/pipes/money-to-int-pipe/money-to-int.pipe';
import { debounceTime, delay, filter, retry, take, takeUntil, tap } from 'rxjs/operators';
import { BehaviorSubject, of, Subject } from 'rxjs';
import { Asset } from '@api/models/assets.model';
import { regExpAliasName } from '@parts/utils/infinium-validators';
import { IntToMoneyPipe } from '@parts/pipes';
import { insuficcientFunds } from '@parts/utils/infinium-errors';
import { Aliases } from '@api/models/alias.model';
import { DeeplinkParams, defaultSendMoneyParams } from '@api/models/wallet.model';
import { WrapInfo } from '@api/models/wrap-info';
import { WrapInfoService } from '@api/services/wrap-info.service';
import { SendMoneyParams } from '@api/models/send-money.model';
import { ControlsOf } from '@parts/utils/controls-of';
import { infiniumAssetInfo } from '@parts/data/assets';

@Component({
  selector: 'app-send',
  template: `
    <div
      class="container scrolled-content"
      fxFlex="1 1 auto"
    >
      <form
        *ngIf="!(loading$ | async)"
        (ngSubmit)="showDialog()"
        [formGroup]="sendMoneyParamsForm"
        class="form"
        fxFlex="0 1 50rem"
        fxLayout="column"
        fxLayoutAlign="start stretch"
      >
        <div class="form__field--row">
          <div class="form__field form__field-dropdown">
            <label for="send-address">
              {{ 'SEND.ADDRESS' | translate }}
              <span class="color-red">*</span>
            </label>
            <input
              (contextmenu)="variablesService.onContextMenu($event)"
              (focusout)="isVisibleDropdownAliases$.next(false)"
              (input)="inputListenAddressField($event)"
              (paste)="pasteListenAddressField($event)"
              [placeholder]="'PLACEHOLDERS.ADRESS_PLACEHOLDER' | translate"
              class="form__field--input"
              formControlName="address"
              id="send-address"
              type="text"
              lowerCase
              [lowerCaseDisabled]="lowerCaseDisabled$ | async"
            />

            <div
              *ngIf="isVisibleDropdownAliasesObservable$ | async"
              class="dropdown py-0_5 border-radius-0_8-rem bg-light-blue-details"
              [ngStyle]="{
                'z-index': 1
              }"
            >
              <ng-container *ngIf="aliases$ | async as aliases">
                <ng-container *ngIf="aliases.length; else notFoundAliases">
                  <div
                    *ngFor="let alias of aliases"
                    (click)="sendMoneyParamsForm.controls.address.patchValue(alias.name)"
                    class="item"
                  >
                    <div
                      [class.available]="alias.name.length >= 2 && alias.name.length <= 6"
                      [class.pl-1]="alias.name.length > 6"
                      class="alias"
                    >
                      <div class="text-ellipsis">{{ alias.name }}</div>
                    </div>
                  </div>
                </ng-container>
                <ng-template #notFoundAliases>
                  <div class="item pl-1">Not found aliases</div>
                </ng-template>
              </ng-container>
            </div>

            <div
              *ngIf="
                sendMoneyParamsForm.controls.address.invalid &&
                (sendMoneyParamsForm.controls.address.dirty || sendMoneyParamsForm.controls.address.touched)
              "
              class="error"
            >
              <div *ngIf="sendMoneyParamsForm.controls.address.errors['address_not_valid']">
                {{ 'SEND.FORM_ERRORS.ADDRESS_NOT_VALID' | translate }}
              </div>
              <div *ngIf="sendMoneyParamsForm.controls.address.errors['alias_not_found']">
                {{ 'SEND.FORM_ERRORS.ALIAS_NOT_FOUND' | translate }}
              </div>
              <div *ngIf="sendMoneyParamsForm.controls.address.errors['alias_not_valid']">
                {{ 'SEND.FORM_ERRORS.ALIAS_NOT_VALID' | translate }}
              </div>
              <div *ngIf="sendMoneyParamsForm.controls.address.hasError('required')">
                {{ 'SEND.FORM_ERRORS.ADDRESS_REQUIRED' | translate }}
              </div>
            </div>

            <div
              *ngIf="aliasAddress"
              class="info text-ellipsis"
            >
              <span>{{ aliasAddress | infiniumShortString }}</span>
            </div>
          </div>

          <div class="form__field">
            <label for="send-amount">
              {{ 'SEND.AMOUNT' | translate }}
              <span class="color-red">*</span>
            </label>
            <input
              (contextmenu)="variablesService.onContextMenu($event)"
              [placeholder]="'PLACEHOLDERS.AMOUNT_PLACEHOLDER' | translate"
              appInputValidate="money"
              class="form__field--input"
              formControlName="amount"
              id="send-amount"
              type="text"
            />
            <div
              *ngIf="
                sendMoneyParamsForm.controls.amount.invalid &&
                (sendMoneyParamsForm.controls.amount.dirty || sendMoneyParamsForm.controls.amount.touched)
              "
              class="error"
            >
              <div *ngIf="sendMoneyParamsForm.controls.amount.errors['zero']">
                {{ 'SEND.FORM_ERRORS.AMOUNT_ZERO' | translate }}
              </div>
              <div *ngIf="sendMoneyParamsForm.controls.amount.errors['great_than_unwraped_coins']">
                {{ 'SEND.FORM_ERRORS.GREAT_THAN_UNWRAPPED_COINS' | translate }}
              </div>
              <div *ngIf="sendMoneyParamsForm.controls.amount.errors['less_than_infinium_needed']">
                {{ 'SEND.FORM_ERRORS.LESS_THAN_INF_NEEDED' | translate }}
              </div>
              <div *ngIf="sendMoneyParamsForm.controls.amount.errors['wrap_info_null']">
                {{ 'SEND.FORM_ERRORS.WRAP_INFO_NULL' | translate }}
              </div>
              <div *ngIf="sendMoneyParamsForm.controls.amount.hasError('required')">
                {{ 'SEND.FORM_ERRORS.AMOUNT_REQUIRED' | translate }}
              </div>
              <div *ngIf="sendMoneyParamsForm.controls.amount.hasError('insuficcientFunds')">
                {{ sendMoneyParamsForm.controls.amount.errors['insuficcientFunds'].errorText | translate }}
              </div>
              <div *ngIf="sendMoneyParamsForm.controls.amount.hasError('min')">
                {{ 'SEND.FORM_ERRORS.MUST_BE_GREATER_THAN_ZERO' | translate }}
              </div>
            </div>
          </div>
        </div>

        <div class="form__field">
          <label for="send-comment">{{ 'SEND.COMMENT' | translate }}</label>
          <input
            (contextmenu)="variablesService.onContextMenu($event)"
            [maxLength]="variablesService.maxCommentLength"
            class="form__field--input"
            formControlName="comment"
            id="send-comment"
            placeholder="{{ 'PLACEHOLDERS.COMMENT_PLACEHOLDER' | translate }}"
            type="text"
          />
          <div
            *ngIf="
              sendMoneyParamsForm.controls.comment.invalid &&
              (sendMoneyParamsForm.controls.comment.dirty || sendMoneyParamsForm.controls.comment.touched)
            "
            class="error"
          >
            <div *ngIf="sendMoneyParamsForm.controls.comment.hasError('maxLength')">
              {{ 'SEND.FORM_ERRORS.MAX_LENGTH' | translate }}
            </div>
          </div>
        </div>

        <div
          *ngIf="isWrapShown && wrapInfo && !(loading$ | async)"
          class="wrap mt-2 mb-2 p-2"
        >
          <div class="title">
            {{ 'SEND.WRAP.TITLE' | translate }}
            <i class="icon info-circle"></i>
          </div>
          <div class="text-wrap">
            {{ 'SEND.WRAP.MAIN_TEXT' | translate }}
          </div>
          <div class="title">{{ 'SEND.WRAP.ESTIMATE' | translate }}</div>
          <table class="text-wrap">
            <tr>
              <td>{{ 'SEND.WRAP.WILL_RECEIVE' | translate }}</td>
              <td *ngIf="!sendMoneyParamsForm.controls.amount.errors">
                {{ getReceivedValue() | intToMoney }}
                {{ 'SEND.WRAP.wINFINIUM' | translate }}
              </td>
              <td *ngIf="sendMoneyParamsForm.controls.amount.errors">-</td>
            </tr>
            <tr>
              <td>{{ 'SEND.WRAP.FEE' | translate }}</td>
              <td>
                {{ wrapInfo?.tx_cost?.infinium_needed_for_erc20 | intToMoney : 3 }}
                {{ 'SEND.WRAP.INFINIUM' | translate }}
                ({{ '$' + wrapInfo.tx_cost?.usd_needed_for_erc20 }})
              </td>
            </tr>
          </table>
        </div>

        <div class="form__field">
          <label>
            {{ 'SEND.ASSET' | translate }}
            <span class="color-red">*</span>
          </label>
          <ng-select
            [clearable]="false"
            [items]="variablesService.currentWallet.balances$ | async"
            [searchable]="false"
            (change)="sendMoneyParamsForm.controls.amount.updateValueAndValidity()"
            formControlName="asset_id"
            class="custom-select with-circle"
            [bindValue]="'asset_info.asset_id'"
          >
            <ng-template
              ng-option-tmp
              ng-label-tmp
              let-asset="item"
            >
              <img
                height="15"
                width="15"
                [src]="(asset && (asset | getWhiteAssetInfo | async)?.logo) || 'assets/icons/currency-icons/custom_token.svg'"
                [alt]="asset?.asset_info.ticker"
                defaultImgAlt="default"
                [defaultImgSrc]="'assets/icons/currency-icons/custom_token.svg'"
                appDefaultImg
              />
              {{ asset?.asset_info.full_name || '---' }}
            </ng-template>
          </ng-select>
          <div
            *ngIf="
              sendMoneyParamsForm.controls.asset_id.invalid &&
              (sendMoneyParamsForm.controls.asset_id.dirty || sendMoneyParamsForm.controls.asset_id.touched)
            "
            class="error"
          >
            <div *ngIf="sendMoneyParamsForm.controls.asset_id.hasError('required')">
              {{ 'ERRORS.REQUIRED' | translate }}
            </div>
          </div>
        </div>

        <div class="details mb-2">
          <button
            (click)="additionalOptions = !additionalOptions"
            [class.border-radius-all]="!additionalOptions"
            class="header"
            type="button"
          >
            <span>{{ 'SEND.DETAILS' | translate }}</span>
            <i
              [class.dropdown-arrow-down]="!additionalOptions"
              [class.dropdown-arrow-up]="additionalOptions"
              class="icon ml-1"
            ></i>
          </button>

          <div
            *ngIf="additionalOptions"
            class="content"
          >
            <div class="form__field--row">
              <div class="form__field">
                <label for="send-mixin">
                  {{ 'SEND.MIXIN' | translate }}
                  <span class="color-red">*</span>
                </label>
                <input
                  (contextmenu)="variablesService.onContextMenu($event)"
                  [placeholder]="'PLACEHOLDERS.AMOUNT_PLACEHOLDER' | translate"
                  appInputValidate="integer"
                  class="form__field--input"
                  formControlName="mixin"
                  id="send-mixin"
                  type="text"
                  maxlength="3"
                />
                <div
                  *ngIf="
                    sendMoneyParamsForm.controls.mixin.invalid &&
                    (sendMoneyParamsForm.controls.mixin.dirty || sendMoneyParamsForm.controls.mixin.touched)
                  "
                  class="error"
                >
                  <div *ngIf="sendMoneyParamsForm.controls.mixin.hasError('required')">
                    {{ 'SEND.FORM_ERRORS.AMOUNT_REQUIRED' | translate }}
                  </div>
                </div>
              </div>

              <div class="form__field">
                <label for="send-fee">
                  {{ 'SEND.FEE' | translate }}
                  <span class="color-red">*</span>
                </label>
                <input
                  (contextmenu)="variablesService.onContextMenu($event)"
                  [placeholder]="'PLACEHOLDERS.FEE_PLACEHOLDER' | translate"
                  appInputValidate="money"
                  class="form__field--input"
                  formControlName="fee"
                  id="send-fee"
                  type="text"
                />
                <div
                  *ngIf="
                    sendMoneyParamsForm.controls.fee.invalid &&
                    (sendMoneyParamsForm.controls.fee.dirty || sendMoneyParamsForm.controls.fee.touched)
                  "
                  class="error"
                >
                  <div *ngIf="sendMoneyParamsForm.controls.fee.errors['less_min']">
                    {{ 'SEND.FORM_ERRORS.FEE_MINIMUM' | translate : { fee: variablesService.default_fee } }}
                  </div>
                  <div *ngIf="sendMoneyParamsForm.controls.fee.hasError('required')">
                    {{ 'SEND.FORM_ERRORS.FEE_REQUIRED' | translate }}
                  </div>
                </div>
              </div>
            </div>

            <app-checkbox
              [label]="'SEND.HIDE' | translate"
              [value]="hideWalletAddress || sendMoneyParamsForm.controls['hide'].value"
              class="mt-1"
              formControlName="hide"
            ></app-checkbox>
          </div>
        </div>

        <button
          [disabled]="sendMoneyParamsForm.invalid || !variablesService.currentWallet.loaded"
          class="primary big max-w-19-rem w-100"
          type="submit"
        >
          {{ 'SEND.BUTTON' | translate }}
        </button>
      </form>
    </div>

    <app-send-modal
      *ngIf="isModalDialogVisible"
      [form]="sendMoneyParamsForm"
      (confirmed)="confirmed($event)"
    ></app-send-modal>

    <app-send-details-modal
      *ngIf="isModalDetailsDialogVisible"
      [job_id]="job_id"
      (eventClose)="handeCloseDetailsModal($event)"
    ></app-send-details-modal>
  `,
  styles: [
    `
      :host {
        width: 100%;
      }
    `,
  ],
})
export class SendComponent implements OnInit, OnDestroy {
  job_id: number;

  isVisibleDropdownAliases$ = new BehaviorSubject<boolean>(false);

  isVisibleDropdownAliasesObservable$ = this.isVisibleDropdownAliases$.pipe(delay(150));

  isModalDialogVisible = false;

  isModalDetailsDialogVisible = false;

  hideWalletAddress = false;

  wrapInfo: WrapInfo;

  loading$ = new BehaviorSubject<boolean>(true);

  isWrapShown = false;

  aliasAddress: string;

  additionalOptions = false;

  fb = inject(NonNullableFormBuilder);

  intToMoneyPipe = inject(IntToMoneyPipe);

  variablesService = inject(VariablesService);

  wrapInfoService = inject(WrapInfoService);

  aliases$ = new BehaviorSubject<Aliases>([]);

  lowerCaseDisabled$ = new BehaviorSubject(true);

  sendMoneyParamsForm = this.fb.group<ControlsOf<SendMoneyParams>>({
    wallet_id: this.fb.control(undefined, {
      validators: [Validators.required],
    }),
    address: this.fb.control('', {
      validators: [
        Validators.required,
        (control: FormControl): ValidationErrors | null => {
          this.aliasAddress = '';
          if (control.value) {
            if (control.value.indexOf('@') !== 0) {
              this.backendService.validateAddress(control.value, (valid_status, data) => {
                this.ngZone.run(() => {
                  this.isWrapShown = data.error_code === 'WRAP';
                  if (valid_status === false && !this.isWrapShown) {
                    control.setErrors(Object.assign({ address_not_valid: true }, control.errors));
                  } else {
                    if (control.hasError('address_not_valid')) {
                      delete control.errors['address_not_valid'];
                      if (Object.keys(control.errors).length === 0) {
                        control.setErrors(null);
                      }
                    }
                  }
                });
              });
              return control.hasError('address_not_valid') ? { address_not_valid: true } : null;
            } else {
              if (!regExpAliasName.test(control.value)) {
                return { alias_not_valid: true };
              } else {
                this.backendService.getAliasInfoByName(control.value.replace('@', ''), (alias_status, alias_data) => {
                  this.ngZone.run(() => {
                    this.aliasAddress = alias_data.address;
                    if (alias_status) {
                      if (control.hasError('alias_not_found')) {
                        delete control.errors['alias_not_found'];
                        if (Object.keys(control.errors).length === 0) {
                          control.setErrors(null);
                        }
                      }
                    } else {
                      control.setErrors(Object.assign({ alias_not_found: true }, control.errors));
                    }
                  });
                });
              }
              return control.hasError('alias_not_found') ? { alias_not_found: true } : null;
            }
          }
          return null;
        },
      ],
    }),
    amount: this.fb.control(undefined, {
      validators: [
        Validators.required,
        Validators.min(0.000000000001),
        (control: FormControl): ValidationErrors | null => {
          if (!control.value) {
            return null;
          }

          if (control.value === 0) {
            return { zero: true };
          }
          const bigAmount = this.moneyToInt.transform(control.value) as BigNumber;
          if (this.isWrapShown) {
            if (!this.wrapInfo) {
              return { wrap_info_null: true };
            }
            if (bigAmount.isGreaterThan(new BigNumber(this.wrapInfo.unwraped_coins_left))) {
              return { great_than_unwraped_coins: true };
            }
            if (bigAmount.isLessThan(new BigNumber(this.wrapInfo.tx_cost.infinium_needed_for_erc20))) {
              return { less_than_infinium_needed: true };
            }
          }
          return null;
        },

        (control: FormControl): ValidationErrors | null => {
          const asset_id = this.sendMoneyParamsForm?.controls.asset_id.value;
          if (!asset_id) {
            return null;
          }

          const asset: Asset | undefined = this.variablesService.currentWallet.balances?.find(v => v.asset_info.asset_id === asset_id);
          if (asset) {
            const unlocked = +this.intToMoneyPipe.transform(asset.unlocked);
            return +control.value > unlocked ? { insuficcientFunds } : null;
          }
          return null;
        },
      ],
    }),
    comment: this.fb.control('', {
      validators: [Validators.maxLength(this.variablesService.maxCommentLength)],
    }),
    asset_id: this.fb.control(undefined, {
      validators: [Validators.required],
    }),
    mixin: this.fb.control(MIXIN, {
      validators: [Validators.required],
    }),
    fee: this.fb.control(this.variablesService.default_fee, {
      validators: [
        Validators.required,
        (g: FormControl): ValidationErrors | null => {
          if (new BigNumber(g.value).isLessThan(this.variablesService.default_fee)) {
            return { less_min: true };
          }
          return null;
        },
      ],
    }),
    hide: this.fb.control(false),
  });

  private destroy$ = new Subject<void>();

  constructor(
    private backendService: BackendService,
    private modalService: ModalService,
    private ngZone: NgZone,
    private httpClient: HttpClient,
    private moneyToInt: MoneyToIntPipe
  ) {}

  ngOnInit(): void {
    const { aliases } = this.variablesService;
    this.aliases$.next(aliases);

    this.getWrapInfo();
    this.listenSendActionData();
    this.patchSendMoneyParamsByCurrentWallet();
    this.saveSendMoneyParams();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  showDialog(): void {
    this.isModalDialogVisible = true;
  }

  confirmed(confirmed: boolean): void {
    this.isModalDialogVisible = false;
    if (confirmed) {
      this.onSend();
    }
  }

  onSend(): void {
    if (this.sendMoneyParamsForm.valid) {
      const { address, asset_id } = this.sendMoneyParamsForm.getRawValue();
      let sendMoneyParams: SendMoneyParams = {
        ...this.sendMoneyParamsForm.getRawValue(),
        asset_id: asset_id !== infiniumAssetInfo.asset_id ? asset_id : null,
      };

      if (address.indexOf('@') === 0) {
        const aliasName = address;
        const alias = this.aliases$.value.find(({ name }) => name === aliasName);

        if (!alias) {
          this.sendMoneyParamsForm.controls.address.setErrors({
            alias_not_found: true,
          });
          return;
        }

        sendMoneyParams = {
          ...sendMoneyParams,
          address: alias.address,
        };
      }

      this.backendService.sendMoney(sendMoneyParams, job_id => {
        this.ngZone.run(() => {
          this.job_id = job_id;
          this.isModalDetailsDialogVisible = true;
          this.variablesService.currentWallet.sendMoneyParams = null;
        });
      });
    }
  }

  getReceivedValue(): number | BigNumber {
    const amount = this.moneyToInt.transform(this.sendMoneyParamsForm.value.amount);
    const needed = new BigNumber(this.wrapInfo.tx_cost.infinium_needed_for_erc20);
    if (amount && needed) {
      return (amount as BigNumber).minus(needed);
    }
    return 0;
  }

  handeCloseDetailsModal(success: boolean): void {
    this.isModalDetailsDialogVisible = false;
    this.job_id = null;

    if (success) {
      this.variablesService.currentWallet.sendMoneyParams = null;
      this.sendMoneyParamsForm.reset(defaultSendMoneyParams, { emitEvent: false });
    }
  }

  private patchSendMoneyParamsByCurrentWallet(): void {
    const { currentWallet, default_fee } = this.variablesService;

    let sendMoneyParams: SendMoneyParams;

    if (currentWallet.sendMoneyParams) {
      sendMoneyParams = currentWallet.sendMoneyParams;
      this.sendMoneyParamsForm.markAllAsTouched();
    } else {
      sendMoneyParams = {
        ...defaultSendMoneyParams,
        fee: default_fee,
      };
    }

    if (currentWallet.is_auditable && !currentWallet.is_watch_only) {
      sendMoneyParams.hide = true;
      this.sendMoneyParamsForm.controls['hide'].disable();
    }

    if (currentWallet.is_auditable) {
      sendMoneyParams.mixin = 0;
      this.sendMoneyParamsForm.controls['mixin'].disable();
    }

    sendMoneyParams.wallet_id = currentWallet.wallet_id;

    this.sendMoneyParamsForm.patchValue(sendMoneyParams, { emitEvent: false });
  }

  private fillDeepLinkData(value: DeeplinkParams): void {
    this.additionalOptions = true;
    this.sendMoneyParamsForm.patchValue({
      address: value.address,
      amount: null,
      comment: value.comment || value.comments || '',
      mixin: +value.mixins || MIXIN,
      asset_id: infiniumAssetInfo.asset_id,
      fee: value.fee || this.variablesService.default_fee,
      hide: value.hide_sender === 'true',
    });
  }

  private getWrapInfo(): void {
    this.wrapInfoService
      .getWrapInfo()
      .pipe(
        tap(() => this.loading$.next(true)),
        retry(5),
        takeUntil(this.destroy$)
      )
      .subscribe({
        next: value => {
          this.wrapInfo = value;
          this.loading$.next(false);
        },
        error: () => {
          this.loading$.next(false);
        },
      });
  }

  pasteListenAddressField(event: any): void {
    event.preventDefault();
    const { clipboardData } = event;
    let value = clipboardData.getData('Text') ?? '';
    this.lowerCaseDisabled$.next(value.indexOf('@') !== 0);

    if (value.indexOf('@') === 0) {
      value = value.toLowerCase();
    }
    this.sendMoneyParamsForm.controls.address.patchValue(value);
  }

  inputListenAddressField(event: any): void {
    const {
      target: { value },
    } = event;
    of((value ?? '') as string)
      .pipe(
        tap(v => this.lowerCaseDisabled$.next(v.indexOf('@') !== 0)),
        tap(v => this.isVisibleDropdownAliases$.next(!!v.length && v.indexOf('@') === 0)),
        filter(v => v.indexOf('@') === 0),
        take(1)
      )
      .subscribe({
        next: v => {
          const filteredAliases = this.variablesService.aliases.filter(({ name }) => {
            return name.indexOf(v) > -1;
          });
          this.aliases$.next(filteredAliases);
        },
      });
  }

  private listenSendActionData(): void {
    this.variablesService.sendActionData$.pipe(takeUntil(this.destroy$)).subscribe({
      next: value => {
        if (value && value.action === 'send') {
          setTimeout(() => {
            this.fillDeepLinkData(value);
          }, 100);
          this.variablesService.sendActionData$.next({});
        }
      },
    });
  }

  private saveSendMoneyParams(): void {
    this.sendMoneyParamsForm.valueChanges.pipe(debounceTime(200), takeUntil(this.destroy$)).subscribe({
      next: () => {
        this.variablesService.currentWallet.sendMoneyParams = this.sendMoneyParamsForm.getRawValue();
      },
    });
  }
}
