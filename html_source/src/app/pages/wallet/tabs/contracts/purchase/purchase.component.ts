import { Component, HostListener, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UntypedFormControl, UntypedFormGroup, ValidationErrors, Validators } from '@angular/forms';
import { BackendService } from '@api/services/backend.service';
import { VariablesService } from '@parts/services/variables.service';
import { ModalService } from '@parts/services/modal.service';
import { IntToMoneyPipe } from '@parts/pipes/int-to-money-pipe/int-to-money.pipe';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { hasOwnProperty } from '@parts/functions/hasOwnProperty';
import { NavigationService } from '@parts/services/back.service';

@Component({
  selector: 'app-purchase',
  template: `
    <div
      class="container"
      fxFlexFill
      fxLayout="column"
      fxLayoutAlign="start strech"
    >
      <div class="breadcrumbs mb-2">
        <div class="breadcrumb">
          <a [routerLink]="'/wallet/contracts'">{{ 'BREADCRUMBS.CONTRACTS' | translate }}</a>
        </div>
        <div
          *ngIf="newPurchase"
          class="breadcrumb"
        >
          <span>{{ 'BREADCRUMBS.NEW_PURCHASE' | translate }}</span>
        </div>
        <div
          *ngIf="!newPurchase"
          class="breadcrumb"
        >
          <span>{{ 'BREADCRUMBS.OLD_PURCHASE' | translate }}</span>
        </div>
      </div>

      <div class="scrolled-content">
        <div
          class="form-wrap"
          fxFlex="1 1 auto"
          fxLayout="row"
        >
          <form
            [formGroup]="purchaseForm"
            class="form"
          >
            <div class="form__field">
              <label for="purchase-description">{{ 'PURCHASE.DESCRIPTION' | translate }}</label>
              <input
                (contextmenu)="variablesService.onContextMenu($event)"
                [placeholder]="'PLACEHOLDERS.DESCRIPTION_PLACEHOLDER' | translate"
                [readonly]="!newPurchase"
                class="form__field--input"
                formControlName="description"
                id="purchase-description"
                maxlength="100"
                type="text"
              />
              <div
                *ngIf="
                  purchaseForm.controls['description'].invalid &&
                  (purchaseForm.controls['description'].dirty || purchaseForm.controls['description'].touched)
                "
                class="error"
              >
                <div *ngIf="newPurchase && purchaseForm.controls['description'].value.length >= 100">
                  {{ 'PURCHASE.FORM_ERRORS.COMMENT_MAXIMUM' | translate }}
                </div>
                <div *ngIf="purchaseForm.controls['description'].hasError('required')">
                  {{ 'PURCHASE.FORM_ERRORS.DESC_REQUIRED' | translate }}
                </div>
              </div>
            </div>

            <div class="form__field--row">
              <div class="form__field form__field-dropdown">
                <label for="purchase-seller">{{ 'PURCHASE.SELLER' | translate }}</label>
                <input
                  (contextmenu)="
                    !newPurchase
                      ? variablesService.onContextMenuOnlyCopy($event, purchaseForm.controls['seller'].value)
                      : variablesService.onContextMenu($event)
                  "
                  (mousedown)="addressMouseDown($event)"
                  [placeholder]="'PLACEHOLDERS.SELLER_PLACEHOLDER' | translate"
                  [readonly]="!newPurchase"
                  class="form__field--input"
                  formControlName="seller"
                  id="purchase-seller"
                  type="text"
                />

                <div
                  *ngIf="isOpen"
                  class="dropdown py-0_5 border-radius-0_8-rem bg-light-blue-details scrolled-content"
                >
                  <div
                    (click)="setAlias(item.name)"
                    *ngFor="let item of localAliases"
                    class="item p-1 text-ellipsis"
                  >
                    {{ item.name }}
                  </div>
                </div>

                <div
                  *ngIf="
                    purchaseForm.controls['seller'].invalid &&
                    (purchaseForm.controls['seller'].dirty || purchaseForm.controls['seller'].touched)
                  "
                  class="error"
                >
                  <div *ngIf="purchaseForm.controls['seller'].errors['address_not_valid']">
                    {{ 'PURCHASE.FORM_ERRORS.SELLER_NOT_VALID' | translate }}
                  </div>
                  <div *ngIf="purchaseForm.controls['seller'].errors['address_same']">
                    {{ 'PURCHASE.FORM_ERRORS.SELLER_SAME' | translate }}
                  </div>
                  <div *ngIf="purchaseForm.controls['seller'].errors['alias_not_valid']">
                    {{ 'PURCHASE.FORM_ERRORS.ALIAS_NOT_VALID' | translate }}
                  </div>
                  <div *ngIf="purchaseForm.controls['seller'].hasError('required')">
                    {{ 'PURCHASE.FORM_ERRORS.SELLER_REQUIRED' | translate }}
                  </div>
                </div>
              </div>

              <div class="form__field">
                <label for="purchase-amount">{{ 'PURCHASE.AMOUNT' | translate }}</label>
                <input
                  (contextmenu)="variablesService.onContextMenu($event)"
                  [placeholder]="'PLACEHOLDERS.AMOUNT_PLACEHOLDER' | translate"
                  [readonly]="!newPurchase"
                  appInputValidate="money"
                  class="form__field--input"
                  formControlName="amount"
                  id="purchase-amount"
                  type="text"
                />
                <div
                  *ngIf="
                    purchaseForm.controls['amount'].invalid &&
                    (purchaseForm.controls['amount'].dirty || purchaseForm.controls['amount'].touched)
                  "
                  class="error"
                >
                  <div *ngIf="purchaseForm.controls['amount'].errors['amount_zero']">
                    {{ 'PURCHASE.FORM_ERRORS.AMOUNT_ZERO' | translate }}
                  </div>
                  <div *ngIf="purchaseForm.controls['amount'].hasError('required')">
                    {{ 'PURCHASE.FORM_ERRORS.AMOUNT_REQUIRED' | translate }}
                  </div>
                </div>
              </div>
            </div>

            <div class="form__field--row">
              <div class="form__field">
                <label for="purchase-your-deposit">{{
                  (currentContract && !currentContract.is_a ? 'PURCHASE.BUYER_DEPOSIT' : 'PURCHASE.YOUR_DEPOSIT') | translate
                }}</label>
                <input
                  (contextmenu)="variablesService.onContextMenu($event)"
                  [placeholder]="'PLACEHOLDERS.DEPOSIT_PLACEHOLDER' | translate"
                  [readonly]="!newPurchase"
                  appInputValidate="money"
                  class="form__field--input"
                  formControlName="yourDeposit"
                  id="purchase-your-deposit"
                  type="text"
                />
                <div
                  *ngIf="
                    purchaseForm.controls['yourDeposit'].invalid &&
                    (purchaseForm.controls['yourDeposit'].dirty || purchaseForm.controls['yourDeposit'].touched)
                  "
                  class="error"
                >
                  <div *ngIf="purchaseForm.controls['yourDeposit'].hasError('required')">
                    {{ 'PURCHASE.FORM_ERRORS.YOUR_DEPOSIT_REQUIRED' | translate }}
                  </div>
                </div>
              </div>

              <div class="form__field">
                <div>
                  <label for="purchase-seller-deposit"
                    >{{ (currentContract && !currentContract.is_a ? 'PURCHASE.YOUR_DEPOSIT' : 'PURCHASE.SELLER_DEPOSIT') | translate }}
                  </label>
                  <app-checkbox
                    (emitChange)="sameAmountChange()"
                    class="ml-2"
                    formControlName="sameAmount"
                    label="{{ 'PURCHASE.SAME_AMOUNT' | translate }}"
                  >
                  </app-checkbox>
                </div>
                <input
                  (contextmenu)="variablesService.onContextMenu($event)"
                  [placeholder]="'PLACEHOLDERS.SELLER_DEPOSIT_PLACEHOLDER' | translate"
                  [readonly]="!newPurchase"
                  [value]="sameAmountChecked ? purchaseForm.controls['amount'].value : ''"
                  appInputValidate="money"
                  class="form__field--input"
                  formControlName="sellerDeposit"
                  id="purchase-seller-deposit"
                  type="text"
                />
                <div
                  *ngIf="
                    purchaseForm.controls['sellerDeposit'].invalid &&
                    (purchaseForm.controls['sellerDeposit'].dirty || purchaseForm.controls['sellerDeposit'].touched)
                  "
                  class="error"
                >
                  <div *ngIf="purchaseForm.controls['sellerDeposit'].hasError('required')">
                    {{ 'PURCHASE.FORM_ERRORS.SELLER_DEPOSIT_REQUIRED' | translate }}
                  </div>
                </div>
              </div>
            </div>

            <div class="form__field">
              <label for="purchase-comment">{{ 'PURCHASE.COMMENT' | translate }}</label>
              <input
                (contextmenu)="variablesService.onContextMenu($event)"
                [readonly]="!newPurchase"
                class="form__field--input"
                formControlName="comment"
                id="purchase-comment"
                maxlength="100"
                placeholder="{{ 'PLACEHOLDERS.COMMENT_PLACEHOLDER' | translate }}"
                type="text"
              />
              <div
                *ngIf="newPurchase && purchaseForm.controls['comment'].value.length >= 100"
                class="error"
              >
                <div>
                  {{ 'PURCHASE.FORM_ERRORS.COMMENT_MAXIMUM' | translate }}
                </div>
              </div>
            </div>

            <div
              *ngIf="variablesService.appPass"
              class="form__field max-w-50-rem"
            >
              <label for="password">{{ 'LOGIN.MASTER_PASS' | translate }}</label>
              <input
                (contextmenu)="variablesService.onContextMenuPasteSelect($event)"
                [placeholder]="'PLACEHOLDERS.MASTER_PASS_PLACEHOLDER' | translate"
                [readonly]="!newPurchase"
                autofocus
                class="form__field--input"
                formControlName="password"
                id="password"
                type="password"
              />
              <div
                *ngIf="
                  purchaseForm.controls['password'].invalid &&
                  (purchaseForm.controls['password'].dirty || purchaseForm.controls['password'].touched)
                "
                class="error"
              >
                <div *ngIf="purchaseForm.controls['password'].hasError('required')">
                  {{ 'LOGIN.FORM_ERRORS.PASS_REQUIRED' | translate }}
                </div>
              </div>

              <div
                *ngIf="purchaseForm.controls.password.errors && purchaseForm.controls.password.errors.password_not_match"
                class="error"
              >
                <div>
                  {{ 'LOGIN.FORM_ERRORS.MISMATCH' | translate }}
                </div>
              </div>
            </div>

            <div class="details mb-2">
              <button
                (click)="toggleOptions()"
                [class.border-radius-all]="!additionalOptions"
                class="header"
                type="button"
              >
                <span>{{ 'PURCHASE.DETAILS' | translate }}</span>
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
                    <label for="purchase-fee">{{ 'PURCHASE.FEE' | translate }}</label>
                    <input
                      class="form__field--input"
                      formControlName="fee"
                      id="purchase-fee"
                      readonly
                      type="text"
                    />
                  </div>
                  <div
                    *ngIf="newPurchase"
                    class="form__field"
                  >
                    <label for="purchase-time">{{ 'PURCHASE.WAITING_TIME' | translate }}</label>
                    <ng-select
                      [clearable]="false"
                      [searchable]="false"
                      class="custom-select"
                      formControlName="time"
                      id="purchase-time"
                    >
                      <ng-option [value]="1">1 {{ 'PURCHASE.HOUR' | translate }}</ng-option>
                      <ng-option
                        *ngFor="let title of [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]"
                        [value]="title"
                      >
                        {{ title }} {{ 'PURCHASE.HOURS' | translate }}
                      </ng-option>
                    </ng-select>
                  </div>
                  <div class="form__field">
                    <label for="purchase-payment">{{ 'PURCHASE.PAYMENT' | translate }}</label>
                    <input
                      (contextmenu)="variablesService.onContextMenu($event)"
                      [readonly]="!newPurchase"
                      class="form__field--input"
                      formControlName="payment"
                      id="purchase-payment"
                      placeholder="{{ 'PLACEHOLDERS.PURCHASE_PAYMENT_PLACEHOLDER' | translate }}"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              (click)="createPurchase()"
              *ngIf="newPurchase"
              [disabled]="!purchaseForm.valid"
              class="primary big max-w-19-rem w-100"
              type="button"
            >
              {{ 'PURCHASE.SEND_BUTTON' | translate }}
            </button>

            <div
              *ngIf="!newPurchase"
              class="purchase-states mt-2 mb-2"
              fxLayout="column"
              fxLayoutAlign="center center"
            >
              <ng-container
                *ngIf="
                  currentContract.state === 1 &&
                  !currentContract.is_a &&
                  currentContract.private_detailes.b_pledge
                    .plus(variablesService.default_fee_big)
                    .plus(variablesService.default_fee_big)
                    .isGreaterThan(variablesService.currentWallet.unlocked_balance)
                "
              >
                <span>{{ 'PURCHASE.NEED_MONEY' | translate }}</span>
              </ng-container>
            </div>

            <div
              *ngIf="!newPurchase"
              class="purchase-buttons"
              fxLayout="row"
              fxLayoutAlign="start center"
            >
              <ng-container *ngIf="!currentContract.is_a && currentContract.state === 1">
                <button
                  (click)="acceptState()"
                  [disabled]="
                    currentContract.private_detailes.b_pledge
                      .plus(variablesService.default_fee_big)
                      .plus(variablesService.default_fee_big)
                      .isGreaterThan(variablesService.currentWallet.unlocked_balance)
                  "
                  class="primary big"
                  type="button"
                >
                  {{ 'PURCHASE.BUTTON_MAKE_PLEDGE' | translate }}
                </button>
                <button
                  (click)="ignoredContract()"
                  class="outline big"
                  type="button"
                >
                  {{ 'PURCHASE.BUTTON_IGNORE' | translate }}
                </button>
              </ng-container>

              <ng-container
                *ngIf="
                  !showNullify &&
                  !showTimeSelect &&
                  currentContract.is_a &&
                  (currentContract.state === 201 ||
                    currentContract.state === 2 ||
                    currentContract.state === 120 ||
                    currentContract.state === 130)
                "
              >
                <button
                  (click)="dealsDetailsFinish()"
                  [disabled]="
                    currentContract.cancel_expiration_time === 0 &&
                    (currentContract.height === 0 || variablesService.height_app - currentContract.height < 10)
                  "
                  class="primary big"
                  type="button"
                >
                  {{ 'PURCHASE.BUTTON_RECEIVED' | translate }}
                </button>
                <button
                  (click)="showNullify = true"
                  [disabled]="
                    currentContract.cancel_expiration_time === 0 &&
                    (currentContract.height === 0 || variablesService.height_app - currentContract.height < 10)
                  "
                  class="outline big"
                  type="button"
                >
                  {{ 'PURCHASE.BUTTON_NULLIFY' | translate }}
                </button>
                <button
                  (click)="showTimeSelect = true"
                  [disabled]="
                    currentContract.cancel_expiration_time === 0 &&
                    (currentContract.height === 0 || variablesService.height_app - currentContract.height < 10)
                  "
                  class="outline big"
                  type="button"
                >
                  {{ 'PURCHASE.BUTTON_CANCEL_BUYER' | translate }}
                </button>
              </ng-container>

              <ng-container *ngIf="!currentContract.is_a && currentContract.state === 5">
                <button
                  (click)="dealsDetailsDontCanceling()"
                  class="outline big"
                  type="button"
                >
                  {{ 'PURCHASE.BUTTON_NOT_CANCEL' | translate }}
                </button>
                <button
                  (click)="dealsDetailsSellerCancel()"
                  class="primary big"
                  type="button"
                >
                  {{ 'PURCHASE.BUTTON_CANCEL_SELLER' | translate }}
                </button>
              </ng-container>
            </div>

            <div
              *ngIf="showNullify"
              class="nullify-block-row"
              fxLayout="column"
              fxLayoutAlign="center center"
            >
              <div>{{ 'PURCHASE.NULLIFY_QUESTION' | translate }}</div>
              <div
                class="nullify-block-buttons my-1 mx-0 w-100"
                fxLayout="row"
                fxLayoutAlign="center center"
              >
                <button
                  (click)="showNullify = false"
                  class="primary big"
                  type="button"
                >
                  {{ 'PURCHASE.CANCEL' | translate }}
                </button>
                <button
                  (click)="productNotGot()"
                  class="primary big"
                  type="button"
                >
                  {{ 'PURCHASE.BUTTON_NULLIFY_SHORT' | translate }}
                </button>
              </div>
            </div>

            <div
              *ngIf="
                showTimeSelect &&
                !newPurchase &&
                currentContract.is_a &&
                (currentContract.state === 201 ||
                  currentContract.state === 2 ||
                  currentContract.state === 120 ||
                  currentContract.state === 130)
              "
              class="time-cancel-block-row"
              fxLayout="column"
              fxLayoutAlign="center center"
            >
              <div class="time-cancel-block-question mb-1">
                {{ 'PURCHASE.WAITING_TIME_QUESTION' | translate }}
              </div>
              <label
                class="mb-1"
                for="purchase-timeCancel"
                >{{ 'PURCHASE.WAITING_TIME' | translate }}</label
              >
              <div class="form__field">
                <ng-select
                  [clearable]="false"
                  [searchable]="false"
                  formControlName="timeCancel"
                  id="purchase-timeCancel"
                >
                  <ng-option [value]="1">1 {{ 'PURCHASE.HOUR' | translate }}</ng-option>
                  <ng-option
                    *ngFor="let title of [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24]"
                    [value]="title"
                  >
                    {{ title }} {{ 'PURCHASE.HOURS' | translate }}
                  </ng-option>
                </ng-select>
              </div>
              <div
                class="time-cancel-block-buttons my-1 mx-0 w-100"
                fxLayout="row"
                fxLayoutAlign="center center"
              >
                <button
                  (click)="showTimeSelect = false"
                  class="outline big"
                  type="button"
                >
                  {{ 'PURCHASE.CANCEL' | translate }}
                </button>
                <button
                  (click)="dealsDetailsCancel()"
                  class="primary big"
                  type="button"
                >
                  {{ 'PURCHASE.BUTTON_CANCEL_BUYER' | translate }}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <!-- TODO - Do not delete, may be needed later. 12.05 decided to temporarily remove.  -->
      <!--    <div class="progress-bar-container">-->
      <!--        <div class="progress-bar">-->
      <!--            <div class="progress-bar-full"-->
      <!--                 [style.width]="getProgressBarWidth()"></div>-->
      <!--        </div>-->
      <!--        <div class="progress-labels h-100" fxLayout="column" fxLayoutAlign="center center">-->
      <!--            <ng-container *ngIf="newPurchase">-->
      <!--                <span>{{ 'PURCHASE.STATUS_MESSAGES.NEW_PURCHASE' | translate }}</span>-->
      <!--            </ng-container>-->

      <!--            <ng-container *ngIf="!newPurchase && currentContract.is_a">-->
      <!--                <span *ngIf="currentContract.state == 1">{{ 'PURCHASE.STATUS_MESSAGES.WAITING_SELLER' | translate }}</span>-->
      <!--                <span *ngIf="currentContract.state == 110">{{ 'PURCHASE.STATUS_MESSAGES.IGNORED_SELLER' | translate }}</span>-->
      <!--                <span *ngIf="currentContract.state == 120">{{ 'PURCHASE.STATUS_MESSAGES.WAITING_DELIVERY' | translate }}</span>-->
      <!--                <span *ngIf="currentContract.state == 130">{{ 'PURCHASE.STATUS_MESSAGES.IGNORED_CANCEL_SELLER' | translate-->
      <!--                    }}</span>-->
      <!--                <span *ngIf="currentContract.state == 140">{{ 'PURCHASE.STATUS_MESSAGES.EXPIRED' | translate }}</span>-->
      <!--                <span *ngIf="currentContract.state == 2">{{ 'PURCHASE.STATUS_MESSAGES.WAITING_SELLER' | translate }}</span>-->
      <!--                <span *ngIf="currentContract.state == 201">{{ 'PURCHASE.STATUS_MESSAGES.WAITING_CONFIRMATION' | translate }}-->
      <!--                    <ng-container *ngIf="currentContract.height === 0">(0/10)</ng-container>-->
      <!--        <ng-container-->
      <!--              *ngIf="currentContract.height !== 0 && (variablesService.height_app - currentContract.height) < 10">-->
      <!--          ({{variablesService.height_app - currentContract.height}}/10)</ng-container>-->
      <!--      </span>-->
      <!--                <span *ngIf="currentContract.state == 3">{{ 'PURCHASE.STATUS_MESSAGES.COMPLETED' | translate }}</span>-->
      <!--                <span *ngIf="currentContract.state == 4"-->
      <!--                      class="color-red">-->
      <!--        {{ 'PURCHASE.STATUS_MESSAGES.NOT_RECEIVED' | translate }}. {{ 'PURCHASE.STATUS_MESSAGES.NULLIFIED' | translate-->
      <!--                    }}-->
      <!--      </span>-->
      <!--                <span *ngIf="currentContract.state == 5">{{ 'PURCHASE.STATUS_MESSAGES.PROPOSAL_CANCEL_SELLER' | translate-->
      <!--                    }}</span>-->
      <!--                <span *ngIf="currentContract.state == 6">{{ 'PURCHASE.STATUS_MESSAGES.CANCELLED' | translate }}</span>-->
      <!--                <span *ngIf="currentContract.state == 601">-->
      <!--        {{ 'PURCHASE.STATUS_MESSAGES.BEING_CANCELLED' | translate }}-->
      <!--                    <ng-container *ngIf="currentContract.height === 0">(0/10)</ng-container>-->
      <!--        <ng-container-->
      <!--              *ngIf="currentContract.height !== 0 && (variablesService.height_app - currentContract.height) < 10">-->
      <!--          ({{variablesService.height_app - currentContract.height}}/10)</ng-container>-->
      <!--      </span>-->
      <!--            </ng-container>-->

      <!--            <ng-container *ngIf="!newPurchase && !currentContract.is_a">-->
      <!--                <span *ngIf="currentContract.state == 1">{{ 'PURCHASE.STATUS_MESSAGES.WAITING_BUYER' | translate }}</span>-->
      <!--                <span *ngIf="currentContract.state == 110">{{ 'PURCHASE.STATUS_MESSAGES.IGNORED_BUYER' | translate }}</span>-->
      <!--                <span *ngIf="currentContract.state == 130">{{ 'PURCHASE.STATUS_MESSAGES.IGNORED_CANCEL_BUYER' | translate-->
      <!--                    }}</span>-->
      <!--                <span *ngIf="currentContract.state == 140">{{ 'PURCHASE.STATUS_MESSAGES.EXPIRED' | translate }}</span>-->
      <!--                <span *ngIf="currentContract.state == 2">{{ 'PURCHASE.STATUS_MESSAGES.WAITING_DELIVERY' | translate }}</span>-->
      <!--                <span *ngIf="currentContract.state == 201">-->
      <!--        {{ 'PURCHASE.STATUS_MESSAGES.WAITING_CONFIRMATION' | translate }}-->
      <!--                    <ng-container *ngIf="currentContract.height === 0">(0/10)</ng-container>-->
      <!--        <ng-container-->
      <!--              *ngIf="currentContract.height !== 0 && (variablesService.height_app - currentContract.height) < 10">-->
      <!--          ({{variablesService.height_app - currentContract.height}}/10)</ng-container>-->
      <!--      </span>-->
      <!--                <span *ngIf="currentContract.state == 3">{{ 'PURCHASE.STATUS_MESSAGES.COMPLETED' | translate }}</span>-->
      <!--                <span *ngIf="currentContract.state == 4"-->
      <!--                      class="color-red">-->
      <!--        {{ 'PURCHASE.STATUS_MESSAGES.NOT_RECEIVED' | translate }}. {{ 'PURCHASE.STATUS_MESSAGES.NULLIFIED' | translate}}-->
      <!--      </span>-->
      <!--                <span *ngIf="currentContract.state == 5">{{ 'PURCHASE.STATUS_MESSAGES.PROPOSAL_CANCEL_BUYER' | translate }}</span>-->
      <!--                <span *ngIf="currentContract.state == 6">{{ 'PURCHASE.STATUS_MESSAGES.CANCELLED' | translate }}</span>-->
      <!--                <span *ngIf="currentContract.state == 601">-->
      <!--        {{ 'PURCHASE.STATUS_MESSAGES.BEING_CANCELLED' | translate }}-->
      <!--                    <ng-container *ngIf="currentContract.height === 0">(0/10)</ng-container>-->
      <!--        <ng-container-->
      <!--              *ngIf="currentContract.height !== 0 && (variablesService.height_app - currentContract.height) < 10">-->
      <!--          ({{variablesService.height_app - currentContract.height}}/10)</ng-container>-->
      <!--      </span>-->
      <!--            </ng-container>-->
      <!--        </div>-->
      <!--        <div class="progress-time"-->
      <!--             *ngIf="!newPurchase">-->
      <!--            <span *ngIf="currentContract.is_a && currentContract.state == 1">-->
      <!--                {{currentContract.expiration_time | contractTimeLeft: 0}}-->
      <!--            </span>-->
      <!--            <span *ngIf="currentContract.is_a && currentContract.state == 5">-->
      <!--                {{currentContract.cancel_expiration_time | contractTimeLeft: 2}}-->
      <!--            </span>-->
      <!--            <span *ngIf="!currentContract.is_a && currentContract.state == 1">-->
      <!--                {{currentContract.expiration_time | contractTimeLeft: 1}}-->
      <!--            </span>-->
      <!--            <span *ngIf="!currentContract.is_a && currentContract.state == 5">-->
      <!--                {{currentContract.cancel_expiration_time | contractTimeLeft: 1}}-->
      <!--            </span>-->
      <!--        </div>-->
      <!--    </div>-->
    </div>
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
export class PurchaseComponent implements OnInit, OnDestroy {
  isOpen = false;

  localAliases = [];

  newPurchase = false;

  actionData = null;

  historyBlock;

  sameAmountChecked = false;

  additionalOptions = false;

  currentContract = null;

  showTimeSelect = false;

  showNullify = false;

  purchaseForm = new UntypedFormGroup({
    description: new UntypedFormControl('', Validators.required),
    seller: new UntypedFormControl('', [
      Validators.required,
      (g: UntypedFormControl): ValidationErrors | null => {
        if (g.value === this.variablesService.currentWallet.address) {
          return { address_same: true };
        }
        return null;
      },
      (g: UntypedFormControl): ValidationErrors | null => {
        this.localAliases = [];
        if (g.value) {
          if (g.value.indexOf('@') !== 0) {
            this.isOpen = false;
            this.backend.validateAddress(g.value, valid_status => {
              this.ngZone.run(() => {
                if (valid_status === false) {
                  g.setErrors(Object.assign({ address_not_valid: true }, g.errors));
                } else {
                  if (g.hasError('address_not_valid')) {
                    delete g.errors['address_not_valid'];
                    if (Object.keys(g.errors).length === 0) {
                      g.setErrors(null);
                    }
                  }
                }
              });
            });
            return g.hasError('address_not_valid') ? { address_not_valid: true } : null;
          } else {
            this.isOpen = true;
            this.localAliases = this.variablesService.aliases.filter(item => {
              return item.name.indexOf(g.value) > -1;
            });
            // eslint-disable-next-line
            if (!/^@?[a-z\d\-]{6,25}$/.test(g.value)) {
              g.setErrors(Object.assign({ alias_not_valid: true }, g.errors));
            } else {
              this.backend.getAliasInfoByName(g.value.replace('@', ''), (alias_status, alias_data) => {
                this.ngZone.run(() => {
                  if (alias_status) {
                    if (alias_data.address === this.variablesService.currentWallet.address) {
                      g.setErrors(Object.assign({ address_same: true }, g.errors));
                    }
                    if (g.hasError('alias_not_valid')) {
                      delete g.errors['alias_not_valid'];
                      if (Object.keys(g.errors).length === 0) {
                        g.setErrors(null);
                      }
                    }
                  } else {
                    g.setErrors(Object.assign({ alias_not_valid: true }, g.errors));
                  }
                });
              });
            }
            return g.hasError('alias_not_valid') ? { alias_not_valid: true } : null;
          }
        }
        return null;
      },
    ]),
    amount: new UntypedFormControl(null, [
      Validators.required,
      (g: UntypedFormControl): ValidationErrors | null => {
        if (parseFloat(g.value) === 0) {
          return { amount_zero: true };
        }
        return null;
      },
    ]),
    yourDeposit: new UntypedFormControl(null, Validators.required),
    sellerDeposit: new UntypedFormControl(null, Validators.required),
    sameAmount: new UntypedFormControl({ value: false, disabled: false }),
    comment: new UntypedFormControl(''),
    fee: new UntypedFormControl(this.variablesService.default_fee),
    time: new UntypedFormControl({ value: 12, disabled: false }),
    timeCancel: new UntypedFormControl({ value: 12, disabled: false }),
    payment: new UntypedFormControl(''),
    password: new UntypedFormControl(''),
  });

  private destroy$ = new Subject<void>();

  constructor(
    public variablesService: VariablesService,
    private route: ActivatedRoute,
    private backend: BackendService,
    private modalService: ModalService,
    private ngZone: NgZone,
    private intToMoneyPipe: IntToMoneyPipe,
    private navigationService: NavigationService
  ) {}

  @HostListener('document:click', ['$event.target'])
  onClick(targetElement): void {
    if (targetElement.id !== 'purchase-seller' && this.isOpen) {
      this.isOpen = false;
    }
  }

  ngOnInit(): void {
    this.route.params.pipe(takeUntil(this.destroy$)).subscribe({
      next: params => {
        if (hasOwnProperty(params, 'id')) {
          this.currentContract = this.variablesService.currentWallet.getContract(params['id']);
          this.purchaseForm.controls['seller'].setValidators([]);
          this.purchaseForm.updateValueAndValidity();
          this.purchaseForm.setValue({
            description: this.currentContract.private_detailes.t,
            seller: this.currentContract.private_detailes.b_addr,
            amount: this.intToMoneyPipe.transform(this.currentContract.private_detailes.to_pay),
            yourDeposit: this.intToMoneyPipe.transform(this.currentContract.private_detailes.a_pledge),
            sellerDeposit: this.intToMoneyPipe.transform(this.currentContract.private_detailes.b_pledge),
            sameAmount: this.currentContract.private_detailes.to_pay.isEqualTo(this.currentContract.private_detailes.b_pledge),
            comment: this.currentContract.private_detailes.c,
            fee: this.variablesService.default_fee,
            time: 12,
            timeCancel: 12,
            payment: this.currentContract.payment_id,
            password: this.variablesService.appPass,
          });
          this.purchaseForm.get('sameAmount').disable();
          this.newPurchase = false;

          if (this.currentContract.is_new) {
            if (this.currentContract.is_a && this.currentContract.state === 2) {
              this.currentContract.state = 120;
            }
            if (
              this.currentContract.state === 130 &&
              this.currentContract.cancel_expiration_time !== 0 &&
              this.currentContract.cancel_expiration_time < this.variablesService.exp_med_ts
            ) {
              this.currentContract.state = 2;
            }
            this.variablesService.settings.viewedContracts = this.variablesService.settings.viewedContracts
              ? this.variablesService.settings.viewedContracts
              : [];
            let findViewedCont = false;
            for (let j = 0; j < this.variablesService.settings.viewedContracts.length; j++) {
              if (
                this.variablesService.settings.viewedContracts[j].contract_id === this.currentContract.contract_id &&
                this.variablesService.settings.viewedContracts[j].is_a === this.currentContract.is_a
              ) {
                this.variablesService.settings.viewedContracts[j].state = this.currentContract.state;
                findViewedCont = true;
                break;
              }
            }
            if (!findViewedCont) {
              this.variablesService.settings.viewedContracts.push({
                contract_id: this.currentContract.contract_id,
                is_a: this.currentContract.is_a,
                state: this.currentContract.state,
              });
            }
            this.currentContract.is_new = false;
            setTimeout(() => {
              this.variablesService.currentWallet.recountNewContracts();
            }, 0);
          }
          this.checkAndChangeHistory();
        } else {
          this.newPurchase = true;
        }
      },
    });

    this.variablesService.getHeightAppEvent.pipe(takeUntil(this.destroy$)).subscribe({
      next: (newHeight: number) => {
        if (
          this.currentContract &&
          this.currentContract.state === 201 &&
          this.currentContract.height !== 0 &&
          newHeight - this.currentContract.height >= 10
        ) {
          this.currentContract.state = 2;
          this.currentContract.is_new = true;
          this.variablesService.currentWallet.recountNewContracts();
        } else if (
          this.currentContract &&
          this.currentContract.state === 601 &&
          this.currentContract.height !== 0 &&
          newHeight - this.currentContract.height >= 10
        ) {
          this.currentContract.state = 6;
          this.currentContract.is_new = true;
          this.variablesService.currentWallet.recountNewContracts();
        }
      },
    });

    if (this.variablesService.appPass) {
      this.purchaseForm.controls.password.setValidators([
        Validators.required,
        (g: UntypedFormControl): ValidationErrors | null => {
          if (g.value) {
            this.backend.checkMasterPassword({ pass: g.value }, status => {
              this.ngZone.run(() => {
                if (status === false) {
                  g.setErrors(Object.assign({ password_not_match: true }, g.errors));
                } else {
                  if (g.hasError('password_not_match')) {
                    delete g.errors['password_not_match'];
                    if (Object.keys(g.errors).length === 0) {
                      g.setErrors(null);
                    }
                  }
                }
              });
            });
            return g.hasError('password_not_match') ? { password_not_match: true } : null;
          }
          return null;
        },
      ]);
    }
    this.variablesService.sendActionData$.pipe(takeUntil(this.destroy$)).subscribe({
      next: res => {
        if (res.action === 'escrow') {
          this.actionData = res;
          this.fillDeepLinkData();
          this.variablesService.sendActionData$.next({});
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  checkAndChangeHistory(): void {
    if (this.currentContract.state === 201) {
      this.historyBlock = this.variablesService.currentWallet.history.find(
        item =>
          item.tx_type === 8 &&
          item.contract[0].contract_id === this.currentContract.contract_id &&
          item.contract[0].is_a === this.currentContract.is_a
      );
    } else if (this.currentContract.state === 601) {
      this.historyBlock = this.variablesService.currentWallet.history.find(
        item =>
          item.tx_type === 12 &&
          item.contract[0].contract_id === this.currentContract.contract_id &&
          item.contract[0].is_a === this.currentContract.is_a
      );
    }
  }

  addressMouseDown(e): void {
    if (e['button'] === 0 && this.purchaseForm.get('seller').value && this.purchaseForm.get('seller').value.indexOf('@') === 0) {
      this.isOpen = true;
    }
  }

  setAlias(alias): void {
    this.purchaseForm.get('seller').setValue(alias);
  }

  fillDeepLinkData(): void {
    this.additionalOptions = true;
    this.purchaseForm.get('description').setValue(this.actionData.description || '');
    this.purchaseForm.get('seller').setValue(this.actionData.seller_address || '');
    this.purchaseForm.get('amount').setValue(this.actionData.amount || '');
    this.purchaseForm.get('yourDeposit').setValue(this.actionData.my_deposit || '');
    this.purchaseForm.get('sellerDeposit').setValue(this.actionData.seller_deposit || '');
    this.purchaseForm.get('comment').setValue(this.actionData.comment || this.actionData.comments || '');
  }

  toggleOptions(): void {
    this.additionalOptions = !this.additionalOptions;
  }

  getProgressBarWidth(): string {
    let progress = '0';
    if (!this.newPurchase) {
      if (this.currentContract) {
        if (this.currentContract.state === 1) {
          progress = '10%';
        }
        if (this.currentContract.state === 201) {
          progress = '25%';
        }
        if ([120, 2].indexOf(this.currentContract.state) !== -1) {
          progress = '50%';
        }
        if ([5, 601].indexOf(this.currentContract.state) !== -1) {
          progress = '75%';
        }
        if ([110, 130, 140, 3, 4, 6].indexOf(this.currentContract.state) !== -1) {
          progress = '100%';
        }
      }
    }
    return progress;
  }

  sameAmountChange(): void {
    if (!this.sameAmountChecked) {
      this.purchaseForm.get('sellerDeposit').clearValidators();
      this.purchaseForm.get('sellerDeposit').updateValueAndValidity();
      this.sameAmountChecked = !this.sameAmountChecked;
    } else {
      this.purchaseForm.get('sellerDeposit').setValidators([Validators.required]);
      this.purchaseForm.get('sellerDeposit').updateValueAndValidity();
      this.sameAmountChecked = !this.sameAmountChecked;
    }
  }

  back(): void {
    this.navigationService.back();
  }

  createPurchase(): void {
    if (this.purchaseForm.valid) {
      const { amount, comment, description, payment, sameAmount, seller, sellerDeposit, time, yourDeposit } = this.purchaseForm.value;

      const { wallet_id, address } = this.variablesService.currentWallet;

      const b_pledge = sameAmount ? amount : sellerDeposit;

      const callback = (create_status): void => {
        if (create_status) {
          this.back();
        }
      };

      if (seller.indexOf('@') !== 0) {
        this.backend.createProposal(
          wallet_id,
          description,
          comment,
          address,
          seller,
          amount,
          yourDeposit,
          b_pledge,
          time,
          payment,
          callback
        );
      } else {
        this.backend.getAliasInfoByName(seller.replace('@', ''), (alias_status, alias_data) => {
          this.ngZone.run(() => {
            if (!alias_status) {
              this.ngZone.run(() => {
                this.purchaseForm.get('seller').setErrors({ alias_not_valid: true });
              });
            } else {
              this.backend.createProposal(
                wallet_id,
                description,
                comment,
                address,
                alias_data.address,
                amount,
                yourDeposit,
                b_pledge,
                time,
                payment,
                callback
              );
            }
          });
        });
      }
    }
  }

  acceptState(): void {
    this.backend.acceptProposal(this.variablesService.currentWallet.wallet_id, this.currentContract.contract_id, accept_status => {
      if (accept_status) {
        this.modalService.prepareModal('info', 'PURCHASE.ACCEPT_STATE_WAIT_BIG');
        this.back();
      }
    });
  }

  ignoredContract(): void {
    this.variablesService.settings.notViewedContracts = this.variablesService.settings.notViewedContracts
      ? this.variablesService.settings.notViewedContracts
      : [];
    let findViewedCont = false;
    for (let j = 0; j < this.variablesService.settings.notViewedContracts.length; j++) {
      if (
        this.variablesService.settings.notViewedContracts[j].contract_id === this.currentContract.contract_id &&
        this.variablesService.settings.notViewedContracts[j].is_a === this.currentContract.is_a
      ) {
        this.variablesService.settings.notViewedContracts[j].state = 110;
        this.variablesService.settings.notViewedContracts[j].time = this.currentContract.expiration_time;
        findViewedCont = true;
        break;
      }
    }
    if (!findViewedCont) {
      this.variablesService.settings.notViewedContracts.push({
        contract_id: this.currentContract.contract_id,
        is_a: this.currentContract.is_a,
        state: 110,
        time: this.currentContract.expiration_time,
      });
    }
    this.currentContract.is_new = true;
    this.currentContract.state = 110;
    this.currentContract.time = this.currentContract.expiration_time;

    this.variablesService.currentWallet.recountNewContracts();
    this.modalService.prepareModal('info', 'PURCHASE.IGNORED_ACCEPT');
    this.back();
  }

  productNotGot(): void {
    this.backend.releaseProposal(
      this.variablesService.currentWallet.wallet_id,
      this.currentContract.contract_id,
      'REL_B',
      release_status => {
        if (release_status) {
          this.modalService.prepareModal('info', 'PURCHASE.BURN_PROPOSAL');
          this.back();
        }
      }
    );
  }

  dealsDetailsFinish(): void {
    this.backend.releaseProposal(
      this.variablesService.currentWallet.wallet_id,
      this.currentContract.contract_id,
      'REL_N',
      release_status => {
        if (release_status) {
          this.modalService.prepareModal('success', 'PURCHASE.SUCCESS_FINISH_PROPOSAL');
          this.back();
        }
      }
    );
  }

  dealsDetailsCancel(): void {
    this.backend.requestCancelContract(
      this.variablesService.currentWallet.wallet_id,
      this.currentContract.contract_id,
      this.purchaseForm.get('timeCancel').value,
      cancel_status => {
        if (cancel_status) {
          this.modalService.prepareModal('info', 'PURCHASE.SEND_CANCEL_PROPOSAL');
          this.back();
        }
      }
    );
  }

  dealsDetailsDontCanceling(): void {
    this.variablesService.settings.notViewedContracts = this.variablesService.settings.notViewedContracts
      ? this.variablesService.settings.notViewedContracts
      : [];
    let findViewedCont = false;
    for (let j = 0; j < this.variablesService.settings.notViewedContracts.length; j++) {
      if (
        this.variablesService.settings.notViewedContracts[j].contract_id === this.currentContract.contract_id &&
        this.variablesService.settings.notViewedContracts[j].is_a === this.currentContract.is_a
      ) {
        this.variablesService.settings.notViewedContracts[j].state = 130;
        this.variablesService.settings.notViewedContracts[j].time = this.currentContract.cancel_expiration_time;
        findViewedCont = true;
        break;
      }
    }
    if (!findViewedCont) {
      this.variablesService.settings.notViewedContracts.push({
        contract_id: this.currentContract.contract_id,
        is_a: this.currentContract.is_a,
        state: 130,
        time: this.currentContract.cancel_expiration_time,
      });
    }
    this.currentContract.is_new = true;
    this.currentContract.state = 130;
    this.currentContract.time = this.currentContract.cancel_expiration_time;
    this.variablesService.currentWallet.recountNewContracts();
    this.modalService.prepareModal('info', 'PURCHASE.IGNORED_CANCEL');
    this.back();
  }

  dealsDetailsSellerCancel(): void {
    this.backend.acceptCancelContract(this.variablesService.currentWallet.wallet_id, this.currentContract.contract_id, accept_status => {
      if (accept_status) {
        this.modalService.prepareModal('info', 'PURCHASE.DEALS_CANCELED_WAIT');
        this.back();
      }
    });
  }
}
