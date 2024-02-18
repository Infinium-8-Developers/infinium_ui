import {Injectable, NgZone} from '@angular/core';
import {Router} from '@angular/router';
import {Wallet} from '../models/wallet.model';
import {BackendService} from './backend.service';
import {VariablesService} from './variables.service';

@Injectable({
  providedIn: 'root',
})
export class WalletsService {
  get wallets(): Wallet[] | null | undefined {
    return this.variablesService.wallets;
  }

  set wallets(value) {
    this.variablesService.wallets = value;
  }

  get currentWallet(): Wallet | null | undefined {
    return this.variablesService.currentWallet;
  }

  set currentWallet(value) {
    this.variablesService.currentWallet = value;
  }

  constructor(
    private backendService: BackendService,
    private variablesService: VariablesService,
    private router: Router,
    private ngZone: NgZone
  ) {
  }

  addWallet(wallet: Wallet): void {
    const {wallet_id} = wallet;
    this.variablesService.wallets.push(wallet);
  }

  getWalletById(wallet_id: number): Wallet | undefined {
    const {wallets} = this.variablesService;
    return wallets.find(w => w.wallet_id === wallet_id);
  }

  closeWallet(wallet_id): void {
    const callback = async (): Promise<void> => {
      this.wallets = this.wallets.filter(w => w.wallet_id !== wallet_id);

      await this.ngZone.run(async () => {
        let url = '/';
        if (this.wallets.length > 0) {
          this.currentWallet = this.wallets[0];
          url = '/wallet/';
        }
        if (this.variablesService.appPass) {
          this.backendService.storeSecureAppData();
        }
        await this.router.navigate([url]);
      });
    };

    this.backendService.closeWallet(wallet_id, callback);
  }
}
