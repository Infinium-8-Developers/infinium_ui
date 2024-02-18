import { Component, NgZone, OnDestroy, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { BackendService } from '../_helpers/services/backend.service';
import { ActivatedRoute, Router } from '@angular/router';
import { VariablesService } from '../_helpers/services/variables.service';
import { ModalService } from '../_helpers/services/modal.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Wallet} from "../_helpers/models/wallet.model";
import {WalletsService} from "../_helpers/services/wallets.service";

@Component({
  selector: 'app-seed-phrase',
  templateUrl: './seed-phrase.component.html',
  styleUrls: ['./seed-phrase.component.scss']
})
export class SeedPhraseComponent implements OnInit, OnDestroy {

  queryRouting;
  seedPhrase = '';
  showSeed = false;
  wallet_id: number;
  wallet!: Wallet;
  seedPhraseCopied = false;
  progressWidth = '66%';

  detailsForm = new FormGroup({
    name: new FormControl('', [
      Validators.required,
      (g: FormControl) => {
        for (let i = 0; i < this.variablesService.wallets.length; i++) {
          if (g.value === this.variablesService.wallets[i].name) {
            if (
              this.variablesService.wallets[i].wallet_id ===
              this.variablesService.currentWallet.wallet_id
            ) {
              return { same: true };
            } else {
              return { duplicate: true };
            }
          }
        }
        return null;
      },
    ]),
    path: new FormControl(''),
  });

  seedPhraseForm = new FormGroup(
    {
      password: new FormControl(
        '',
        Validators.pattern(this.variablesService.pattern)
      ),
      confirmPassword: new FormControl(
        '',
        Validators.pattern(this.variablesService.pattern)
      ),
    },
    { validators: this.checkPasswords }
  );

  checkPasswords(group: FormGroup) {
    const pass = group.controls.password.value;
    const confirmPass = group.controls.confirmPassword.value;

    return pass === confirmPass ? null : { notSame: true };
  }


  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private location: Location,
    private backend: BackendService,
    public variablesService: VariablesService,
    public walletsService: WalletsService,
    private modalService: ModalService,
    private ngZone: NgZone
  ) {
  }

  ngOnInit() {
    this.showSeed = false;
    this.getWallet();
  }

  private setWalletInfoNamePath() {
    this.detailsForm
      .get('name')
      .setValue(this.wallet.name);
    this.detailsForm
      .get('path')
      .setValue(this.wallet.path);
  }

  private getWallet() {
    this.queryRouting = this.route.queryParams.subscribe(params => {
      if (params.wallet_id) {
        this.wallet_id = +params.wallet_id;
        this.wallet = this.walletsService.getWalletById(this.wallet_id);
        if (this.wallet) {
          this.setWalletInfoNamePath();
        }
      }
    });
  }

  copySeedPhrase() {
    this.backend.setClipboard(this.seedPhrase, () => {
      this.ngZone.run(() => {
        setTimeout(() => {
          this.seedPhraseCopied = false;
        }, 4000);
        this.seedPhraseCopied = true;
      });
    });
  }

  back() {
    this.location.back();
  }

  showSeedPhrase() {
    this.showSeed = true;
    this.progressWidth = '100%';
  }

  onSubmitSeed() {
    if (this.seedPhraseForm.valid) {
      this.showSeedPhrase();
      const wallet_id = this.wallet_id;
      const seed_password = this.seedPhraseForm.controls.password.value;
      this.backend.getSmartWalletInfo(
        { wallet_id, seed_password },
        (status, data) => {
          if (data.hasOwnProperty('seed_phrase')) {
            this.ngZone.run(() => {
              this.seedPhrase = data['seed_phrase'].trim();
            });
          }
        }
      );
    }
  }

  ngOnDestroy() {
    this.queryRouting.unsubscribe();
  }
}
