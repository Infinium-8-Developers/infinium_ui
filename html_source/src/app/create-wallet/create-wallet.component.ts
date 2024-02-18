import { Component, NgZone } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { BackendService } from '../_helpers/services/backend.service';
import { VariablesService } from '../_helpers/services/variables.service';
import { ModalService } from '../_helpers/services/modal.service';
import { Router } from '@angular/router';
import { Wallet } from '../_helpers/models/wallet.model';
import { TranslateService } from '@ngx-translate/core';
import { Location } from '@angular/common';
import {WalletsService} from "../_helpers/services/wallets.service";

@Component({
  selector: 'app-create-wallet',
  templateUrl: './create-wallet.component.html',
  styleUrls: ['./create-wallet.component.scss'],
})
export class CreateWalletComponent {
  createForm = this.fb.group(
    {
      name: this.fb.control('', [
        Validators.required,
        (g: FormControl) => {
          for (let i = 0; i < this.variablesService.wallets.length; i++) {
            if (g.value === this.variablesService.wallets[i].name) {
              return { duplicate: true };
            }
          }
          return null;
        },
      ]),
      password: this.fb.control('', Validators.pattern(this.variablesService.pattern)),
      confirm: this.fb.control(''),
      path: this.fb.control('', Validators.required),
    },
    (g: FormGroup) => {
      return g.get('password').value === g.get('confirm').value ? null : { confirm_mismatch: true };
    }
  );

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private backend: BackendService,
    public variablesService: VariablesService,
    public walletsService: WalletsService,
    private modalService: ModalService,
    private ngZone: NgZone,
    private translate: TranslateService,
    public location: Location
  ) {
  }

  get savedWalletName(): string {
    const path = this.createForm.get('path').value;
    return path.substr(path.lastIndexOf('/') + 1, path.length - 1);
  }

  createWallet(): void {
    const { path: selectedPath, password, name } = this.createForm.value;
    this.backend.generateWallet(selectedPath, password, async (generate_status, generate_data, errorCode) => {
      if (generate_status) {
        const { wallet_id } = generate_data;
        const { path, address, balance, unlocked_balance, mined_total, tracking_hey } = generate_data['wi'];
        const wallet = new Wallet(wallet_id, name, password, path, address, balance, unlocked_balance, mined_total, tracking_hey);
        wallet.alias = this.backend.getWalletAlias(address);
        wallet.total_history_item = 0;
        wallet.pages = new Array(1).fill(1);
        wallet.totalPages = 1;
        wallet.currentPage = 1;
        await this.backend.runWallet(wallet_id, async (run_status, run_data) => {
          if (run_status) {
            await this.ngZone.run(async () => {
              this.walletsService.addWallet(wallet);
              if (this.variablesService.appPass) {
                this.backend.storeSecureAppData();
              }
              this.variablesService.setCurrentWallet(wallet_id);
              await this.router.navigate(['/seed-phrase'], { queryParams: { wallet_id } });
            });
          } else {
            console.log(run_data['error_code']);
          }
        });
      } else {
        const errorTranslationKey =
          errorCode === 'ALREADY_EXISTS' ? 'CREATE_WALLET.ERROR_CANNOT_SAVE_TOP' : 'CREATE_WALLET.ERROR_CANNOT_SAVE_SYSTEM';
        this.modalService.prepareModal('error', errorTranslationKey);
      }
    });
  }

  selectWalletLocation(): void {
    const caption = this.translate.instant('CREATE_WALLET.TITLE_SAVE');
    const fileMask = '*';
    const { default_path } = this.variablesService.settings;
    this.backend.saveFileDialog(caption, fileMask, default_path, (file_status, file_data) => {
      if (file_status) {
        this.ngZone.run(() => {
          const { path } = file_data;
          this.createForm.get('path').patchValue(path);
          this.variablesService.settings.default_path = path.substr(0, path.lastIndexOf('/'));
        });
      }
    });
  }
}
