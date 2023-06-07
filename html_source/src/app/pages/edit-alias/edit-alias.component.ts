import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BackendService } from '@api/services/backend.service';
import { VariablesService } from '@parts/services/variables.service';
import { ModalService } from '@parts/services/modal.service';
import { Wallet } from '@api/models/wallet.model';
import { BigNumber } from 'bignumber.js';

@Component({
  selector: 'app-edit-alias',
  template: `
    <div class="page-container">
      <div class="toolbar mb-2">
        <div class="left">
          <button appBackButton class="btn-icon circle big mr-2" type="button">
            <i class="icon dropdown-arrow-left"></i>
          </button>
          <h1>{{ 'BREADCRUMBS.EDIT_ALIAS' | translate }}</h1>
        </div>
        <div class="right"></div>
      </div>

      <div class="page-content">
        <div class="breadcrumbs mb-2">
          <div class="breadcrumb">
            <a [routerLink]="['/wallet/history']">{{ wallet.name }}</a>
          </div>
          <div class="breadcrumb">
            <span>{{ 'BREADCRUMBS.EDIT_ALIAS' | translate }}</span>
          </div>
        </div>

        <div class="scrolled-content">
          <form class="form">
            <div class="form__field">
              <label for="alias-name">
                {{ 'EDIT_ALIAS.NAME.LABEL' | translate }}
              </label>
              <input
                [value]="alias.name"
                class="form__field--input"
                id="alias-name"
                placeholder="{{ 'EDIT_ALIAS.NAME.PLACEHOLDER' | translate }}"
                readonly
                type="text"
              />
            </div>

            <div class="form__field textarea">
              <label for="alias-comment">
                {{ 'EDIT_ALIAS.COMMENT.LABEL' | translate }}
              </label>
              <textarea
                (contextmenu)="variablesService.onContextMenu($event)"
                [(ngModel)]="alias.comment"
                [maxlength]="variablesService.maxCommentLength + ''"
                [ngModelOptions]="{ standalone: true }"
                id="alias-comment"
                placeholder="{{ 'EDIT_ALIAS.COMMENT.PLACEHOLDER' | translate }}"
              >
              </textarea>
              <div
                *ngIf="alias.comment.length > 0 && notEnoughMoney"
                class="error"
              >
                {{ 'EDIT_ALIAS.FORM_ERRORS.NO_MONEY' | translate }}
              </div>
              <div
                *ngIf="
                  alias.comment.length >= variablesService.maxCommentLength
                "
                class="error"
              >
                {{ 'EDIT_ALIAS.FORM_ERRORS.MAX_LENGTH' | translate }}
              </div>
            </div>

            <div class="alias-cost mb-2">
              {{
                'EDIT_ALIAS.COST'
                  | translate
                    : {
                        value: variablesService.default_fee,
                        currency: variablesService.defaultCurrency
                      }
              }}
            </div>

            <button
              (click)="updateAlias()"
              [disabled]="
                notEnoughMoney ||
                oldAliasComment === alias.comment ||
                alias.comment.length > variablesService.maxCommentLength
              "
              class="primary big w-100"
              type="button"
            >
              {{ 'EDIT_ALIAS.BUTTON_EDIT' | translate }}
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
export class EditAliasComponent implements OnInit {
  wallet: Wallet;

  alias: any;

  oldAliasComment: string;

  notEnoughMoney: boolean;

  requestProcessing = false;

  constructor(
    public variablesService: VariablesService,
    private router: Router,
    private backend: BackendService,
    private modalService: ModalService,
    private ngZone: NgZone
  ) {}

  ngOnInit(): void {
    this.wallet = this.variablesService.currentWallet;
    const alias = this.backend.getWalletAlias(this.wallet.address);
    this.alias = {
      name: alias.name,
      address: alias.address,
      comment: alias.comment,
    };
    this.oldAliasComment = alias.comment;
    const balance = new BigNumber(
      this.wallet.getBalanceByTicker('INF')?.unlocked || 0
    );
    this.notEnoughMoney = balance.isLessThan(
      this.variablesService.default_fee_big
    );
  }

  updateAlias(): void {
    if (
      this.requestProcessing ||
      this.notEnoughMoney ||
      this.oldAliasComment === this.alias.comment ||
      this.alias.comment.length > this.variablesService.maxCommentLength
    ) {
      return;
    }
    this.requestProcessing = true;
    this.backend.updateAlias(
      this.wallet.wallet_id,
      this.alias,
      this.variablesService.default_fee,
      status => {
        if (status) {
          this.modalService.prepareModal('success', '');
          this.wallet.alias['comment'] = this.alias.comment;
          this.ngZone.run(() => {
            this.router.navigate(['/wallet/']);
          });
        }
        this.requestProcessing = false;
      }
    );
  }
}
