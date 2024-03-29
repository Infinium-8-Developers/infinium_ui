import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { BackendService } from '../_helpers/services/backend.service';
import { VariablesService } from '../_helpers/services/variables.service';
import { ModalService } from '../_helpers/services/modal.service';
import { Wallet } from '../_helpers/models/wallet.model';
import { ValidationErrors } from '@angular/forms/src/directives/validators';

@Component({
             selector: 'app-login',
             templateUrl: './login.component.html',
             styleUrls: ['./login.component.scss']
           })
export class LoginComponent implements OnInit, OnDestroy {

  queryRouting;

  regForm = new FormGroup({
                            password: new FormControl('',
                                                      Validators.pattern(this.variablesService.pattern)),
                            confirmation: new FormControl('')
                          }, [function (g: FormGroup) {
    return g.get('password').value === g.get('confirmation').value ? null : { 'mismatch': true };
  }
                          ]);

  authForm = new FormGroup({
                             password: new FormControl('')
                           });

  type = 'reg';

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private backend: BackendService,
    public variablesService: VariablesService,
    private modalService: ModalService,
    private ngZone: NgZone
  ) {
  }

  ngOnInit() {
    this.queryRouting = this.route.queryParams.subscribe(params => {
      if (params.type) {
        this.type = params.type;
      }
    });
  }

  onSubmitCreatePass(): void {
    if (this.regForm.valid) {
      this.variablesService.appPass = this.regForm.get('password').value;  // the pass what was written in input of login form by user

      this.backend.setMasterPassword({ pass: this.variablesService.appPass }, (status, data) => {
        if (status) {
          this.backend.storeSecureAppData({ pass: this.variablesService.appPass });
          this.variablesService.appLogin = true;
          this.variablesService.dataIsLoaded = true;
          if (this.variablesService.settings.appLockTime) {
            this.variablesService.startCountdown();
          }
          this.ngZone.run(() => {
            this.router.navigate(['/']);
          });
        } else {
          console.log(data['error_code']);
        }
      });
    }
  }

  onSkipCreatePass(): void {
    this.variablesService.appPass = '';
    this.ngZone.run(() => {
      this.variablesService.appLogin = true;
      this.router.navigate(['/']);
    });
  }

  dropSecureAppData(): void {
    this.backend.dropSecureAppData(() => {
      this.onSkipCreatePass();
    });
    this.closeAllWallets();
    this.variablesService.contacts = [];
  }

  onSubmitAuthPass(): void {
    if (this.authForm.valid) {
      this.variablesService.appPass = this.authForm.get('password').value;
      if (this.variablesService.dataIsLoaded) {
        this.backend.checkMasterPassword({ pass: this.variablesService.appPass }, (status) => {
          if (status) {
            this.variablesService.appLogin = true;
            if (this.variablesService.settings.appLockTime) {
              this.variablesService.startCountdown();
            }
            this.ngZone.run(() => {
              this.router.navigate(['/'], { queryParams: { prevUrl: 'login' } });
            });
          } else {
            this.ngZone.run(() => {
              this.setAuthPassError({ wrong_password: true });
            });
          }
        });
      } else {
        this.getData(this.variablesService.appPass);
      }
    }
  }

  getData(appPass) {
    this.backend.getSecureAppData({ pass: appPass }, (status, data) => {
      if (!data.error_code) {
        this.setAuthPassError(null);
        this.variablesService.appLogin = true;
        this.variablesService.dataIsLoaded = true;
        if (this.variablesService.settings.appLockTime) {
          this.variablesService.startCountdown();
        }
        this.variablesService.appPass = appPass;
        const isEmptyObject = Object.keys(data).length === 0 && data.constructor === Object;

        if (this.variablesService.wallets.length) {
          this.ngZone.run(() => {
            this.router.navigate(['/wallet/']);
          });
          return;
        }
        if (data.hasOwnProperty('contacts')) {
          if (Object.keys(data['contacts']).length !== 0) {
            data['contacts'].map(contact => {
              this.variablesService.contacts.push(contact);
            });
          }
        }
        if (data.hasOwnProperty('wallets')) {
          if (Object.keys(data['wallets']).length !== 0) {
            this.getWalletData(data['wallets']);
          } else {
            this.ngZone.run(() => {
              this.router.navigate(['/']);
            });
          }
        }
        if (!data.hasOwnProperty('wallets') && !data.hasOwnProperty('contacts')) {
          if (data.length !== 0 && !isEmptyObject) {
            this.getWalletData(data);
          } else {
            this.ngZone.run(() => {
              this.router.navigate(['/']);
            });
          }
        }
      }

      if (data.error_code === 'WRONG_PASSWORD') {
        this.ngZone.run(() => {
          this.setAuthPassError({ wrong_password: true });
        });
      }
    });
  }

  private setAuthPassError(errors: ValidationErrors | null) {
    this.authForm.controls['password'].setErrors(errors);
  }

  getWalletData(walletData) {
    let openWallets = 0;
    let runWallets = 0;
    walletData.forEach((wallet, wallet_index) => {
      this.backend.openWallet(wallet.path, wallet.pass, this.variablesService.count, true, (open_status, open_data, open_error) => {
        if (open_status || open_error === 'FILE_RESTORED') {
          openWallets++;
          this.ngZone.run(() => {
            const new_wallet = new Wallet(
              open_data.wallet_id,
              wallet.name,
              wallet.pass,
              open_data['wi'].path,
              open_data['wi'].address,
              open_data['wi'].balance,
              open_data['wi'].unlocked_balance,
              open_data['wi'].mined_total,
              open_data['wi'].tracking_hey
            );
            new_wallet.alias = this.backend.getWalletAlias(new_wallet.address);
            if (wallet.staking) {
              new_wallet.staking = true;
              this.backend.startPosMining(new_wallet.wallet_id);
            } else {
              new_wallet.staking = false;
            }
            new_wallet.is_auditable = open_data['wi'].is_auditable;
            new_wallet.is_watch_only = open_data['wi'].is_watch_only;
            new_wallet.currentPage = 1;
            new_wallet.exclude_mining_txs = false;
            if (open_data.recent_history && open_data.recent_history.history) {
              new_wallet.total_history_item = open_data.recent_history.total_history_items;
              new_wallet.totalPages = Math.ceil(open_data.recent_history.total_history_items / this.variablesService.count);
              new_wallet.totalPages > this.variablesService.maxPages
                ? new_wallet.pages = new Array(5).fill(1).map((value, index) => value + index)
                : new_wallet.pages = new Array(new_wallet.totalPages).fill(1).map((value, index) => value + index);
              new_wallet.prepareHistory(open_data.recent_history.history);
            } else {
              new_wallet.total_history_item = 0;
              new_wallet.pages = new Array(1).fill(1);
              new_wallet.totalPages = 1;
            }
            this.backend.getContracts(open_data.wallet_id, (contracts_status, contracts_data) => {
              if (contracts_status && contracts_data.hasOwnProperty('contracts')) {
                this.ngZone.run(() => {
                  new_wallet.prepareContractsAfterOpen(
                    contracts_data.contracts,
                    this.variablesService.exp_med_ts,
                    this.variablesService.height_app,
                    this.variablesService.settings.viewedContracts,
                    this.variablesService.settings.notViewedContracts
                  );
                });
              }
            });
            this.variablesService.wallets.push(new_wallet);
            if (this.variablesService.wallets.length === 1) {
              this.router.navigate(['/wallet/']);
            }
          });
          this.backend.runWallet(open_data.wallet_id, (run_status) => {
            if (run_status) {
              runWallets++;
            } else {
              if (wallet_index === walletData.length - 1 && runWallets === 0) {
                this.ngZone.run(() => {
                  this.router.navigate(['/']);
                });
              }
            }
          });
        } else {
          if (wallet_index === walletData.length - 1 && openWallets === 0) {
            this.ngZone.run(() => {
              this.router.navigate(['/']);
            });
          }
        }
      });
    });
  }

  closeAllWallets(): void {
    this.variablesService.wallets.forEach(({ wallet_id }) => this.closeWallet(wallet_id));
    if (this.variablesService.appPass) {
      this.backend.storeSecureAppData();
    }
  }

  closeWallet(wallet_id) {
    this.backend.closeWallet(wallet_id, () => {
      for (let i = this.variablesService.wallets.length - 1; i >= 0; i--) {
        this.variablesService.wallets.splice(i, 1);
      }
    });
  }

  ngOnDestroy() {
    this.queryRouting.unsubscribe();
  }

}
