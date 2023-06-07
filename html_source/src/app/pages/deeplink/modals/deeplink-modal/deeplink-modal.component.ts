import {
  Component,
  HostBinding,
  NgZone,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { VariablesService } from '@parts/services/variables.service';
import { DeeplinkParams, PushOffer, Wallet } from '@api/models/wallet.model';
import { BigNumber } from 'bignumber.js';
import { MIXIN } from '@parts/data/constants';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { BackendService } from '@api/services/backend.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-deeplink-modal',
  template: `
    <div
      class="modal p-2 border-radius-0_8-rem bg-light-blue max-h-100"
      fxFlex="0 1 54rem"
      fxLayout="column"
    >
      <ng-container *ngIf="walletsToPay.length > 1 && !secondStep">
        <div class="content mb-2" fxFlex="0 0 auto" fxLayout="column">
          <div class="form__field" fxFlex="0 0 auto">
            <label>Select wallet for action:</label>
            <ng-select
              [(ngModel)]="walletToPayId"
              [clearable]="false"
              [items]="walletsToPay"
              [searchable]="false"
              bindLabel="name"
              bindValue="wallet_id"
            >
              <ng-template let-item="item" ng-label-tmp>
                {{ item.name }}
              </ng-template>
              <ng-template let-index="index" let-item="item" ng-option-tmp>
                {{ item.name }}
              </ng-template>
            </ng-select>
          </div>
        </div>

        <div
          class="controls"
          fxFlex="0 0 auto"
          fxLayout="row nowrap"
          fxLayoutAlign="space-between center"
          fxLayoutGap="1rem"
        >
          <button
            (click)="canselAction()"
            class="outline big w-100"
            type="button"
          >
            {{ 'EXPORT_HISTORY.CANCEL' | translate }}
          </button>
          <button (click)="nextStep()" class="primary big w-100" type="submit">
            Next...
          </button>
        </div>
      </ng-container>

      <ng-container
        *ngIf="
          secondStep &&
          marketplaceModalShow &&
          actionData.action === 'marketplace_offer_create'
        "
      >
        <h4 class="mb-2" fxFlex="0 0 auto">Creating a marketplace offer</h4>
        <div
          class="content scrolled-content mb-2"
          fxFlex="1 1 auto"
          fxLayout="column"
        >
          <div class="table-info" fxFlex="0 0 auto">
            <div class="row">
              <div class="label max-w-19-rem w-100">
                {{ 'Offer title' | translate }}
              </div>
              <div class="text">{{ actionData.title }}</div>
            </div>

            <hr class="separator" />

            <div class="row">
              <div class="label max-w-19-rem w-100">
                {{ 'Description' | translate }}
              </div>
              <div class="text">{{ actionData.description }}</div>
            </div>

            <hr class="separator" />

            <div class="row">
              <div class="label max-w-19-rem w-100">
                {{ 'Category' | translate }}
              </div>
              <div class="text">{{ actionData.category }}</div>
            </div>

            <hr class="separator" />

            <div class="row">
              <div class="label max-w-19-rem w-100">
                {{ 'Price' | translate }}
              </div>
              <div class="text">
                {{ actionData.price }}
                {{ this.variablesService.defaultCurrency }}
              </div>
            </div>

            <hr class="separator" />

            <div class="row">
              <div class="label max-w-19-rem w-100">
                {{ 'Preview url' | translate }}
              </div>
              <div class="text">{{ actionData.url || actionData.img_url }}</div>
            </div>

            <hr class="separator" />

            <div class="row">
              <div class="label max-w-19-rem w-100">
                {{ 'Contacts' | translate }}
              </div>
              <div class="text">{{ actionData.contact }}</div>
            </div>

            <hr class="separator" />

            <div class="row">
              <div class="label max-w-19-rem w-100">
                {{ 'Comments' | translate }}
              </div>
              <div class="text">
                {{ actionData.comment || actionData.comments }}
              </div>
            </div>

            <hr class="separator" />

            <div class="row">
              <div class="label max-w-19-rem w-100">
                {{ 'Mixins' | translate }}
              </div>
              <div class="text">{{ actionData.mixins || defaultMixin }}</div>
            </div>

            <hr class="separator" />

            <div class="row">
              <div class="label max-w-19-rem w-100">
                {{ 'Transaction fee' | translate }}
              </div>
              <div class="text">
                {{
                  actionData.price *
                    (actionData.fee || this.variablesService.default_fee)
                }}
                {{ this.variablesService.defaultCurrency }}
              </div>
            </div>
          </div>
        </div>

        <div
          class="controls"
          fxFlex="0 0 auto"
          fxLayout="row nowrap"
          fxLayoutAlign="space-between center"
          fxLayoutGap="1rem"
        >
          <button
            (click)="canselAction()"
            class="outline big w-100"
            type="button"
          >
            {{ 'EXPORT_HISTORY.CANCEL' | translate }}
          </button>
          <button
            (click)="marketplaceSend()"
            class="primary big w-100"
            type="submit"
          >
            Sign & Send...
          </button>
        </div>
      </ng-container>

      <ng-container *ngIf="marketplaceConfirmHash">
        <h4 class="mb-2" fxFlex="0 0 auto">Operation successful</h4>

        <div
          class="content scrolled-content mb-2"
          fxFlex="1 1 auto"
          fxLayout="column"
        >
          <div class="table-info" fxFlex="0 0 auto">
            <div class="row">
              <div class="label max-w-19-rem w-100">
                {{ 'Operation hash' | translate }}
              </div>
              <div
                (contextmenu)="
                  variablesService.onContextMenuOnlyCopy(
                    $event,
                    marketplaceConfirmHash
                  )
                "
                class="text"
                fxLayout="row"
                fxLayoutAlign="start center"
              >
                {{ marketplaceConfirmHash }}
                <i
                  (click)="copyHash()"
                  [class.check]="copyAnimation"
                  [class.copy]="!copyAnimation"
                  class="icon ml-1"
                ></i>
              </div>
            </div>
          </div>
        </div>

        <div
          class="controls"
          fxFlex="0 0 auto"
          fxLayout="row"
          fxLayoutAlign="space-between center"
        >
          <button
            (click)="canselAction()"
            class="primary big w-100"
            type="button"
          >
            Close
          </button>
        </div>
      </ng-container>

      <ng-container *ngIf="!walletsToPay.length">
        <h4 class="mb-2" fxFlex="0 0 auto">
          Your wallets have not loaded yet. Try this action a little later.
        </h4>

        <div
          class="controls"
          fxFlex="0 0 auto"
          fxLayout="row"
          fxLayoutAlign="space-between center"
        >
          <button
            (click)="canselAction()"
            class="primary big w-100"
            type="button"
          >
            Ok
          </button>
        </div>
      </ng-container>
    </div>
  `,
  styles: [],
})
export class DeeplinkModalComponent implements OnInit, OnDestroy {
  @HostBinding('class.modal-overlay') modalOverlay = true;

  secondStep = false;

  walletToPayId = 0;

  nextStepInterval;

  marketplaceModalShow = true;

  copyAnimation = false;

  marketplaceConfirmHash: any = null;

  actionData: DeeplinkParams = {};

  defaultMixin = MIXIN;

  walletsToPay: Array<Wallet> = [];

  private destroy$ = new Subject<void>();

  constructor(
    public variablesService: VariablesService,
    private _router: Router,
    private backend: BackendService,
    private ngZone: NgZone,
    private renderer: Renderer2
  ) {
    this.walletsToPay = this.variablesService.wallets.filter(
      wallet => !wallet.is_watch_only || !wallet.is_auditable
    );
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'no-scroll');

    this.variablesService.deeplink$.pipe(takeUntil(this.destroy$)).subscribe({
      next: deeplink => {
        this.actionData = {};

        if (deeplink) {
          if (this.walletsToPay.length === 0) {
            this.canselAction();
            return;
          }
          this.actionData = this.parseDeeplink(deeplink);
          if (this.walletsToPay.length === 1) {
            this.walletToPayId = this.walletsToPay[0].wallet_id;
            const { daemon_state, sync_started } = this.variablesService;

            if (daemon_state === 2 && sync_started === false) {
              this.nextStep();
            } else {
              this.nextStepInterval = setInterval(() => {
                if (daemon_state === 2 && sync_started === false) {
                  this.nextStep();
                  clearInterval(this.nextStepInterval);
                }
              }, 1500);
            }
          }
        }
      },
    });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.variablesService.deeplink$.next(null);
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  parseDeeplink(deeplink): DeeplinkParams {
    const quotesRex = new RegExp(/'|"|”|%E2%80%9D|%22/g);
    const spaceSymbolRex = new RegExp(/%20/g);
    const newObj = {};

    const newString = deeplink.substr(5); 
    newString.split('&').forEach(str => {
      const [key, value] = str.split('=');
      newObj[key] = value
        .replace(quotesRex, '')
        .replace(spaceSymbolRex, ' ')
        .trim();
    });
    return newObj;
  }

  canselAction(): void {
    this.variablesService.deeplink$.next(null);
    this.variablesService.sendActionData$.next({});
    this.actionData = {};
    this.secondStep = false;
  }

  marketplaceSend(): void {
    const offerObject: PushOffer = {
      wallet_id: this.walletToPayId,
      od: {
        ap: this.actionData.price || '',
        at: '1',
        cat: this.actionData.category || '',
        cnt: this.actionData.contact || '',
        com: this.actionData.comment || this.actionData.comments || '',
        do: this.actionData.description || '',
        et: 10,
        fee: new BigNumber(
          '' +
            (+this.actionData.fee || +this.variablesService.default_fee) *
              1000000000000
        ),
        lci: '',
        lco: 'World Wide',
        ot: 1,
        pt: 'Credit cards, BTC, INF, ETH',
        t: this.actionData.title || '',
        url: this.actionData.url || this.actionData.img_url || '',
      },
    };
    this.backend.push_offer(offerObject, (status, data) => {
      this.ngZone.run(() => {
        if (data.success) {
          this.marketplaceModalShow = false;
          this.marketplaceConfirmHash = data.tx_hash;
        } else {
          this.canselAction();
        }
      });
    });
  }

  copyHash(): void {
    this.backend.setClipboard(this.marketplaceConfirmHash);
    this.copyAnimation = true;
    setTimeout(() => (this.copyAnimation = false), 2000);
  }

  nextStep(): void {
    if (this.actionData.action === 'send') {
      this.variablesService.sendActionData$.next(this.actionData);
      this.variablesService.deeplink$.next(null);
      this.variablesService.setCurrentWallet(this.walletToPayId);
      this._router.navigate(['/wallet/send']).then();
      this.secondStep = false;
    } else if (this.actionData.action === 'escrow') {
      this.variablesService.sendActionData$.next(this.actionData);
      this.variablesService.deeplink$.next(null);
      this.variablesService.setCurrentWallet(this.walletToPayId);
      this._router.navigate(['/wallet/contracts/purchase']).then();
      this.secondStep = false;
    } else {
      this.secondStep = true;
    }
  }
}
