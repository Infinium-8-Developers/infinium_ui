import { Component, HostListener, NgZone, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../_helpers/services/backend.service';
import { VariablesService } from '../_helpers/services/variables.service';
import { ModalService } from '../_helpers/services/modal.service';
import { Location } from '@angular/common';
import { IntToMoneyPipe } from '../_helpers/pipes/int-to-money.pipe';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.scss']
})
export class PurchaseComponent implements OnInit, OnDestroy {
  isOpen = false;
  localAliases = [];
  currentWalletId;
  newPurchase = false;
  actionData = null;
  historyBlock;
  sameAmountChecked = false;
  additionalOptions = false;
  currentContract = null;
  showTimeSelect = false;
  showNullify = false;

  purchaseForm = new FormGroup({
    description: new FormControl('', Validators.required),
    seller: new FormControl('', [Validators.required, (g: FormControl) => {
      if (g.value === this.variablesService.currentWallet.address) {
        return { 'address_same': true };
      }
      return null;
    }, (g: FormControl) => {
      this.localAliases = [];
      if (g.value) {
        if (g.value.indexOf('@') !== 0) {
          this.isOpen = false;
          this._backend.validateAddress(g.value, (valid_status) => {
            this._ngZone.run(() => {
              if (valid_status === false) {
                g.setErrors(Object.assign({ 'address_not_valid': true }, g.errors));
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
          return (g.hasError('address_not_valid')) ? { 'address_not_valid': true } : null;
        } else {
          this.isOpen = true;
          this.localAliases = this.variablesService.aliases.filter((item) => {
            return item.name.indexOf(g.value) > -1;
          });
          if (!(/^@?[a-z\d\-]{6,25}$/.test(g.value))) {
            g.setErrors(Object.assign({ 'alias_not_valid': true }, g.errors));
          } else {
            this._backend.getAliasByName(g.value.replace('@', ''), (alias_status, alias_data) => {
              this._ngZone.run(() => {
                if (alias_status) {
                  if (alias_data.address === this.variablesService.currentWallet.address) {
                    g.setErrors(Object.assign({ 'address_same': true }, g.errors));
                  }
                  if (g.hasError('alias_not_valid')) {
                    delete g.errors['alias_not_valid'];
                    if (Object.keys(g.errors).length === 0) {
                      g.setErrors(null);
                    }
                  }
                } else {
                  g.setErrors(Object.assign({ 'alias_not_valid': true }, g.errors));
                }
              });
            });
          }
          return (g.hasError('alias_not_valid')) ? { 'alias_not_valid': true } : null;
        }
      }
      return null;
    }]),
    amount: new FormControl(null, [Validators.required, (g: FormControl) => {
      if (parseFloat(g.value) === 0) {
        return { 'amount_zero': true };
      }
      return null;
    }]),
    yourDeposit: new FormControl(null, Validators.required),
    sellerDeposit: new FormControl(null, Validators.required),
    sameAmount: new FormControl({ value: false, disabled: false }),
    comment: new FormControl(''),
    fee: new FormControl(this.variablesService.default_fee),
    time: new FormControl({ value: 12, disabled: false }),
    timeCancel: new FormControl({ value: 12, disabled: false }),
    payment: new FormControl(''),
    password: new FormControl('')
  });

  private _destroy$ = new Subject<never>();

  @HostListener('document:click', ['$event.target'])
  public onClick(targetElement) {
    if (targetElement.id !== 'purchase-seller' && this.isOpen) {
      this.isOpen = false;
    }
  }

  constructor(
    private _route: ActivatedRoute,
    private _backend: BackendService,
    private _modalService: ModalService,
    private _ngZone: NgZone,
    private _location: Location,
    private _intToMoneyPipe: IntToMoneyPipe,
    public variablesService: VariablesService
  ) {
  }

  checkAndChangeHistory() {
    if (this.currentContract.state === 201) {
      this.historyBlock = this.variablesService.currentWallet.history.find(
        item => item.tx_type === 8 && item.contract[0].contract_id === this.currentContract.contract_id && item.contract[0].is_a === this.currentContract.is_a);
    } else if (this.currentContract.state === 601) {
      this.historyBlock = this.variablesService.currentWallet.history.find(
        item => item.tx_type === 12 && item.contract[0].contract_id === this.currentContract.contract_id && item.contract[0].is_a === this.currentContract.is_a);
    }
  }

  addressMouseDown(e) {
    if (e['button'] === 0 && this.purchaseForm.get('seller').value && this.purchaseForm.get('seller').value.indexOf('@') === 0) {
      this.isOpen = true;
    }
  }

  setAlias(alias) {
    this.purchaseForm.get('seller').setValue(alias);
  }

  ngOnInit() {
    this._route.params.pipe(takeUntil(this._destroy$)).subscribe(params => {
      if (params.hasOwnProperty('id')) {
        this.currentContract = this.variablesService.currentWallet.getContract(params['id']);
        this.purchaseForm.controls['seller'].setValidators([]);
        this.purchaseForm.updateValueAndValidity();
        this.purchaseForm.setValue({
          description: this.currentContract.private_detailes.t,
          seller: this.currentContract.private_detailes.b_addr,
          amount: this._intToMoneyPipe.transform(this.currentContract.private_detailes.to_pay),
          yourDeposit: this._intToMoneyPipe.transform(this.currentContract.private_detailes.a_pledge),
          sellerDeposit: this._intToMoneyPipe.transform(this.currentContract.private_detailes.b_pledge),
          sameAmount: this.currentContract.private_detailes.to_pay.isEqualTo(this.currentContract.private_detailes.b_pledge),
          comment: this.currentContract.private_detailes.c,
          fee: this.variablesService.default_fee,
          time: 12,
          timeCancel: 12,
          payment: this.currentContract.payment_id,
          password: this.variablesService.appPass
        });
        this.purchaseForm.get('sameAmount').disable();
        this.newPurchase = false;

        if (this.currentContract.is_new) {
          if (this.currentContract.is_a && this.currentContract.state === 2) {
            this.currentContract.state = 120;
          }
          if (this.currentContract.state === 130 && this.currentContract.cancel_expiration_time !== 0 && this.currentContract.cancel_expiration_time < this.variablesService.exp_med_ts) {
            this.currentContract.state = 2;
          }
          this.variablesService.settings.viewedContracts = (this.variablesService.settings.viewedContracts) ? this.variablesService.settings.viewedContracts : [];
          let findViewedCont = false;
          for (let j = 0; j < this.variablesService.settings.viewedContracts.length; j++) {
            if (this.variablesService.settings.viewedContracts[j].contract_id === this.currentContract.contract_id && this.variablesService.settings.viewedContracts[j].is_a === this.currentContract.is_a) {
              this.variablesService.settings.viewedContracts[j].state = this.currentContract.state;
              findViewedCont = true;
              break;
            }
          }
          if (!findViewedCont) {
            this.variablesService.settings.viewedContracts.push({
              contract_id: this.currentContract.contract_id,
              is_a: this.currentContract.is_a,
              state: this.currentContract.state
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
    });

    this.variablesService.getHeightAppEvent.pipe(takeUntil(this._destroy$)).subscribe((newHeight: number) => {
      if (this.currentContract && this.currentContract.state === 201 && this.currentContract.height !== 0 && (newHeight - this.currentContract.height) >= 10) {
        this.currentContract.state = 2;
        this.currentContract.is_new = true;
        this.variablesService.currentWallet.recountNewContracts();
      } else if (this.currentContract && this.currentContract.state === 601 && this.currentContract.height !== 0 && (newHeight - this.currentContract.height) >= 10) {
        this.currentContract.state = 6;
        this.currentContract.is_new = true;
        this.variablesService.currentWallet.recountNewContracts();
      }
    });

    if (this.variablesService.appPass) {
      this.purchaseForm.controls.password.setValidators([Validators.required, (g: FormControl) => {
        if (g.value) {
          this._backend.checkMasterPassword({ pass: g.value }, (status) => {
            this._ngZone.run(() => {
              if (status === false) {
                g.setErrors(
                  Object.assign({ password_not_match: true }, g.errors)
                );
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
          return g.hasError('password_not_match')
            ? { password_not_match: true }
            : null;
        }
        return null;
      }]);
    }
    this.variablesService.sendActionData$.pipe(takeUntil(this._destroy$)).subscribe((res) => {
      if (res.action === 'escrow') {
        this.actionData = res;
        this.fillDeepLinkData();
        this.variablesService.sendActionData$.next({});
      }
    });
  }

  fillDeepLinkData() {
    this.additionalOptions = true;
    this.purchaseForm.get('description').setValue(this.actionData.description || '');
    this.purchaseForm.get('seller').setValue(this.actionData.seller_address || '');
    this.purchaseForm.get('amount').setValue(this.actionData.amount || '');
    this.purchaseForm.get('yourDeposit').setValue(this.actionData.my_deposit || '');
    this.purchaseForm.get('sellerDeposit').setValue(this.actionData.seller_deposit || '');
    this.purchaseForm.get('comment').setValue(this.actionData.comment || this.actionData.comments || '');
  }

  toggleOptions() {
    this.additionalOptions = !this.additionalOptions;
  }

  getProgressBarWidth() {
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

  sameAmountChange() {
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

  createPurchase() {
    if (this.purchaseForm.valid) {
      const {
        amount,
        comment,
        description,
        payment,
        sameAmount,
        seller,
        sellerDeposit,
        time,
        yourDeposit
      } = this.purchaseForm.value;

      const { wallet_id, address } = this.variablesService.currentWallet;

      const b_pledge = sameAmount ? amount : sellerDeposit;

      const callback = (create_status) => {
        if (create_status) {
          this.back();
        }
      };

      if (seller.indexOf('@') !== 0) {
        this._backend.createProposal(
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
          callback);
      } else {
        this._backend.getAliasByName(seller.replace('@', ''), (alias_status, alias_data) => {
          this._ngZone.run(() => {
            if (!alias_status) {
              this._ngZone.run(() => {
                this.purchaseForm.get('seller').setErrors({ 'alias_not_valid': true });
              });
            } else {
              this._backend.createProposal(
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
                callback);
            }
          });
        });
      }
    }
  }

  back() {
    this._location.back();
  }

  acceptState() {
    this._backend.acceptProposal(this.variablesService.currentWallet.wallet_id, this.currentContract.contract_id, (accept_status) => {
      if (accept_status) {
        this._modalService.prepareModal('info', 'PURCHASE.ACCEPT_STATE_WAIT_BIG');
        this.back();
      }
    });
  }

  ignoredContract() {
    this.variablesService.settings.notViewedContracts = (this.variablesService.settings.notViewedContracts) ? this.variablesService.settings.notViewedContracts : [];
    let findViewedCont = false;
    for (let j = 0; j < this.variablesService.settings.notViewedContracts.length; j++) {
      if (this.variablesService.settings.notViewedContracts[j].contract_id === this.currentContract.contract_id && this.variablesService.settings.notViewedContracts[j].is_a === this.currentContract.is_a) {
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
        time: this.currentContract.expiration_time
      });
    }
    this.currentContract.is_new = true;
    this.currentContract.state = 110;
    this.currentContract.time = this.currentContract.expiration_time;

    this.variablesService.currentWallet.recountNewContracts();
    this._modalService.prepareModal('info', 'PURCHASE.IGNORED_ACCEPT');
    this.back();
  }

  productNotGot() {
    this._backend.releaseProposal(this.variablesService.currentWallet.wallet_id, this.currentContract.contract_id, 'REL_B',
      (release_status) => {
        if (release_status) {
          this._modalService.prepareModal('info', 'PURCHASE.BURN_PROPOSAL');
          this.back();
        }
      });
  }

  dealsDetailsFinish() {
    this._backend.releaseProposal(this.variablesService.currentWallet.wallet_id, this.currentContract.contract_id, 'REL_N',
      (release_status) => {
        if (release_status) {
          this._modalService.prepareModal('success', 'PURCHASE.SUCCESS_FINISH_PROPOSAL');
          this.back();
        }
      });
  }

  dealsDetailsCancel() {
    this._backend.requestCancelContract(this.variablesService.currentWallet.wallet_id, this.currentContract.contract_id,
      this.purchaseForm.get('timeCancel').value, (cancel_status) => {
        if (cancel_status) {
          this._modalService.prepareModal('info', 'PURCHASE.SEND_CANCEL_PROPOSAL');
          this.back();
        }
      });
  }

  dealsDetailsDontCanceling() {
    this.variablesService.settings.notViewedContracts = this.variablesService.settings.notViewedContracts ? this.variablesService.settings.notViewedContracts : [];
    let findViewedCont = false;
    for (let j = 0; j < this.variablesService.settings.notViewedContracts.length; j++) {
      if (this.variablesService.settings.notViewedContracts[j].contract_id === this.currentContract.contract_id && this.variablesService.settings.notViewedContracts[j].is_a === this.currentContract.is_a) {
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
        time: this.currentContract.cancel_expiration_time
      });
    }
    this.currentContract.is_new = true;
    this.currentContract.state = 130;
    this.currentContract.time = this.currentContract.cancel_expiration_time;
    this.variablesService.currentWallet.recountNewContracts();
    this._modalService.prepareModal('info', 'PURCHASE.IGNORED_CANCEL');
    this.back();
  }

  dealsDetailsSellerCancel() {
    this._backend.acceptCancelContract(this.variablesService.currentWallet.wallet_id, this.currentContract.contract_id, (accept_status) => {
      if (accept_status) {
        this._modalService.prepareModal('info', 'PURCHASE.DEALS_CANCELED_WAIT');
        this.back();
      }
    });
  }

  ngOnDestroy() {
    this._destroy$.next();
  }

}
