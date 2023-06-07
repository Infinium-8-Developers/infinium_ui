import { Component, inject, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { BackendService } from '@api/services/backend.service';
import { VariablesService } from '@parts/services/variables.service';
import { ModalService } from '@parts/services/modal.service';
import { Wallet } from '@api/models/wallet.model';
import { MoneyToIntPipe } from '@parts/pipes/money-to-int-pipe/money-to-int.pipe';
import { IntToMoneyPipe } from '@parts/pipes/int-to-money-pipe/int-to-money.pipe';
import BigNumber from 'bignumber.js';
import { Subject } from 'rxjs';
import { hasOwnProperty } from '@parts/functions/hasOwnProperty';
import { takeUntil } from 'rxjs/operators';
import { regExpAliasName } from '@parts/utils/infinium-validators';

@Component({
  selector: 'app-assign-alias',
  template: `
    <div class="page-container">
      <div class="toolbar mb-2">
        <div class="left">
          <button
            appBackButton
            class="btn-icon circle big mr-2"
            type="button"
          >
            <i class="icon dropdown-arrow-left"></i>
          </button>
          <h1>{{ 'BREADCRUMBS.ASSIGN_ALIAS' | translate }}</h1>
        </div>
        <div class="right"></div>
      </div>

      <div class="page-content">
        <div class="breadcrumbs mb-2">
          <div class="breadcrumb">
            <a [routerLink]="['/wallet/history']">{{ wallet.name }}</a>
          </div>
          <div class="breadcrumb">
            <span>{{ 'BREADCRUMBS.ASSIGN_ALIAS' | translate }}</span>
          </div>
        </div>

        <div class="scrolled-content">
          <form
            [formGroup]="assignForm"
            class="form"
          >
            <div class="form__field">
              <label
                [delay]="50"
                for="alias-name"
                placement="bottom-left"
                tooltip="{{ 'ASSIGN_ALIAS.NAME.TOOLTIP' | translate }}"
                tooltipClass="table-tooltip assign-alias-tooltip"
              >
                {{ 'ASSIGN_ALIAS.NAME.LABEL' | translate }}
              </label>
              <div class="has-no-edit-symbol">
                <input
                  (contextmenu)="variablesService.onContextMenu($event)"
                  [placeholder]="'ASSIGN_ALIAS.NAME.PLACEHOLDER' | translate"
                  class="form__field--input"
                  formControlName="name"
                  id="alias-name"
                  type="text"
                />
              </div>
              <div
                *ngIf="assignForm.controls['name'].invalid && (assignForm.controls['name'].dirty || assignForm.controls['name'].touched)"
                class="error"
              >
                <div
                  *ngIf="
                    assignForm.controls['name'].errors['pattern'] &&
                    assignForm.get('name').value.length > 6 &&
                    assignForm.get('name').value.length <= 25
                  "
                >
                  {{ 'ASSIGN_ALIAS.FORM_ERRORS.NAME_WRONG' | translate }}
                </div>
                <div *ngIf="assignForm.get('name').value.length <= 6 || assignForm.get('name').value.length > 25">
                  {{ 'ASSIGN_ALIAS.FORM_ERRORS.NAME_LENGTH' | translate }}
                </div>
                <div *ngIf="assignForm.controls['name'].hasError('required')">
                  {{ 'ASSIGN_ALIAS.FORM_ERRORS.NAME_REQUIRED' | translate }}
                </div>
              </div>
              <div
                *ngIf="alias.exists"
                class="error"
              >
                <div>
                  {{ 'ASSIGN_ALIAS.FORM_ERRORS.NAME_EXISTS' | translate }}
                </div>
              </div>
              <div
                *ngIf="notEnoughMoney"
                class="error"
              >
                <div>
                  {{ 'ASSIGN_ALIAS.FORM_ERRORS.NO_MONEY' | translate }}
                </div>
              </div>
            </div>

            <div class="form__field textarea">
              <label
                [delay]="50"
                for="alias-comment"
                placement="bottom-left"
                tooltip="{{ 'ASSIGN_ALIAS.COMMENT.TOOLTIP' | translate }}"
                tooltipClass="table-tooltip assign-alias-tooltip"
              >
                {{ 'ASSIGN_ALIAS.COMMENT.LABEL' | translate }}
              </label>
              <textarea
                (contextmenu)="variablesService.onContextMenu($event)"
                [maxLength]="variablesService.maxCommentLength"
                class="scrolled-content"
                formControlName="comment"
                id="alias-comment"
                placeholder="{{ 'ASSIGN_ALIAS.COMMENT.PLACEHOLDER' | translate }}"
              >
              </textarea>
              <div
                *ngIf="assignForm.get('comment').value.length >= variablesService.maxCommentLength"
                class="error"
              >
                {{ 'ASSIGN_ALIAS.FORM_ERRORS.MAX_LENGTH' | translate }}
              </div>
            </div>

            <p class="mb-2">
              {{
                'ASSIGN_ALIAS.COST'
                  | translate
                    : {
                        value: alias.price | intToMoney,
                        currency: variablesService.defaultCurrency
                      }
              }}
            </p>

            <button
              (click)="assignAlias()"
              [disabled]="!assignForm.valid || !canRegister || notEnoughMoney"
              class="primary big w-100"
              type="button"
            >
              {{ 'ASSIGN_ALIAS.BUTTON_ASSIGN' | translate }}
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
export class AssignAliasComponent implements OnInit, OnDestroy {
  wallet: Wallet;

  fb = inject(FormBuilder);

  assignForm = this.fb.group({
    name: this.fb.nonNullable.control('', [Validators.required, Validators.pattern(regExpAliasName)]),
    comment: this.fb.nonNullable.control('', [Validators.maxLength(this.variablesService.maxCommentLength)]),
  });

  alias = {
    name: '',
    fee: this.variablesService.default_fee,
    price: new BigNumber(0),
    reward: '0',
    rewardOriginal: '0',
    comment: '',
    exists: false,
  };

  canRegister = false;

  notEnoughMoney = false;

  private destroy$ = new Subject<void>();

  constructor(
    public variablesService: VariablesService,
    private ngZone: NgZone,
    private router: Router,
    private backend: BackendService,
    private modalService: ModalService,
    private moneyToInt: MoneyToIntPipe,
    private intToMoney: IntToMoneyPipe
  ) {}

  ngOnInit(): void {
    this.wallet = this.variablesService.currentWallet;
    this.assignForm
      .get('name')
      .valueChanges.pipe(takeUntil(this.destroy$))
      .subscribe({
        next: value => {
          this.canRegister = false;
          this.alias.exists = false;
          const newName = value.toLowerCase().replace('@', '');
          if (
            !(this.assignForm.controls['name'].errors && hasOwnProperty(this.assignForm.controls['name'].errors, 'pattern')) &&
            newName.length >= 6 &&
            newName.length <= 25
          ) {
            this.backend.getAliasInfoByName(newName, status => {
              this.ngZone.run(() => {
                this.alias.exists = status;
              });
              if (!status) {
                this.alias.price = new BigNumber(0);
                this.backend.getAliasCoast(newName, (statusPrice, dataPrice) => {
                  this.ngZone.run(() => {
                    if (statusPrice) {
                      this.alias.price = BigNumber.sum(dataPrice['coast'], this.variablesService.default_fee_big);
                    }
                    const unlocked_balance = new BigNumber(this.wallet.getBalanceByTicker('INF')?.unlocked || 0);
                    this.notEnoughMoney = this.alias.price.isGreaterThan(unlocked_balance);
                    this.alias.reward = this.intToMoney.transform(this.alias.price, false);
                    this.alias.rewardOriginal = this.intToMoney.transform(dataPrice['coast'], false);
                    this.canRegister = !this.notEnoughMoney;
                  });
                });
              } else {
                this.notEnoughMoney = false;
                this.alias.reward = '0';
                this.alias.rewardOriginal = '0';
              }
            });
          } else {
            this.notEnoughMoney = false;
            this.alias.reward = '0';
            this.alias.rewardOriginal = '0';
          }
          this.alias.name = newName;
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  assignAlias(): void {
    const alias = this.backend.getWalletAlias(this.wallet.address);
    if (hasOwnProperty(alias, 'name')) {
      this.modalService.prepareModal('info', 'ASSIGN_ALIAS.ONE_ALIAS');
    } else {
      this.alias.comment = this.assignForm.get('comment').value;
      this.backend.registerAlias(
        this.wallet.wallet_id,
        this.alias.name,
        this.wallet.address,
        this.alias.fee,
        this.alias.comment,
        this.alias.rewardOriginal,
        async status => {
          if (status) {
            this.wallet.wakeAlias = true;
            this.modalService.prepareModal('info', 'ASSIGN_ALIAS.REQUEST_ADD_REG');
            await this.ngZone.run(async () => {
              await this.router.navigate(['/wallet/']);
            });
          }
        }
      );
    }
  }
}
