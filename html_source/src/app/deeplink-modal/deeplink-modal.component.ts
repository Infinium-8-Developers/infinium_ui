import { Component, HostBinding, NgZone, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { VariablesService } from '../_helpers/services/variables.service';
import { DeeplinkParams, PushOffer, Wallet } from '../_helpers/models/wallet.model';
import { BigNumber } from 'bignumber.js';
import { MIXIN } from '../_shared/constants';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { BackendService } from '../_helpers/services/backend.service';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-deeplink-modal',
  templateUrl: './deeplink-modal.component.html',
  styleUrls: ['./deeplink-modal.component.scss']
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
  private destroy$ = new Subject<never>();

  constructor(
    private _router: Router,
    public variablesService: VariablesService,
    private backend: BackendService,
    private ngZone: NgZone,
    private renderer: Renderer2
  ) {
    this.walletsToPay = this.variablesService.wallets.filter(wallet => !wallet.is_watch_only || !wallet.is_auditable);
  }

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'no-scroll');

    this.variablesService.deeplink$
      .pipe(takeUntil(this.destroy$))
      .subscribe((deeplink) => {
        this.actionData = {};

        if (deeplink) {
          if (!this.walletsToPay.length) {
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
      });
  }

  parseDeeplink(deeplink): DeeplinkParams {
    const quotesRex = new RegExp(/'|"|”|%E2%80%9D|%22/g);
    const spaceSymbolRex = new RegExp(/%20/g);
    const newObj = {};

    const newString = deeplink.substr(5); // delete infinium:;
    newString.split('&').forEach((str) => {
      const [key, value] = str.split('=');
      newObj[key] = value.replace(quotesRex, '').replace(spaceSymbolRex, ' ').trim();
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
        fee: new BigNumber('' + ((+this.actionData.fee || +this.variablesService.default_fee) * 1000000000000)),
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
    setTimeout(() => this.copyAnimation = false, 2000);
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

  ngOnDestroy(): void {
    this.destroy$.next();
    this.variablesService.deeplink$.next(null);
    this.renderer.removeClass(document.body, 'no-scroll');
  }

}
