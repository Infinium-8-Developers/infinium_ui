import { Component, NgZone } from '@angular/core';
import { CREATE_NEW_WALLET_HELP_PAGE } from '@parts/data/constants';
import { Router } from '@angular/router';
import { BackendService } from '@api/services/backend.service';
import { VariablesService } from '@parts/services/variables.service';
import { TranslateService } from '@ngx-translate/core';
import { paths } from '../../paths';

@Component({
  selector: 'app-no-wallet',
  template: `
    <div
      class="no-wallet-wrapper"
      fxFlexFill
      fxLayout="row"
      fxLayoutAlign="center center"
    >
      <div
        class="card max-w-42-rem max-h-100 w-100 p-2 border-radius-0_8-rem bg-light-blue scrolled-content"
      >
        <div class="logo mb-3" fxLayout="row" fxLayoutAlign="center center">
          <img alt="infinium-logo" src="assets/icons/blue/infinium-logo.svg" />
        </div>

        <h4 class="mb-2 text-align-center">{{ 'MAIN.TITLE' | translate }}</h4>

        <button
          [routerLink]="['/' + paths.create]"
          class="primary big w-100 mb-1"
          type="button"
        >
          {{ 'MAIN.BUTTON_NEW_WALLET' | translate }}
        </button>

        <button
          (click)="openWallet()"
          class="primary big w-100 mb-1"
          type="button"
        >
          {{ 'MAIN.BUTTON_OPEN_WALLET' | translate }}
        </button>

        <button
          [routerLink]="['/' + paths.restore]"
          class="outline big w-100 mb-2"
          type="button"
        >
          {{ 'MAIN.BUTTON_RESTORE_BACKUP' | translate }}
        </button>

        <p
          (click)="openInBrowser()"
          class="text-align-center cursor-pointer"
          fxLayout="row"
          fxLayoutAlign="center center"
        >
          <i class="icon question-circle mr-1"></i>
          <span class="color-primary">{{ 'MAIN.HELP' | translate }}</span>
        </p>
      </div>

      <app-synchronization-status
        class="max-w-19-rem"
      ></app-synchronization-status>
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
export class NoWalletComponent {
  paths = paths;

  constructor(
    public variablesService: VariablesService,
    private router: Router,
    private backend: BackendService,
    private ngZone: NgZone,
    private translate: TranslateService
  ) {}

  openWallet(): void {
    this.backend.openFileDialog(
      this.translate.instant('MAIN.CHOOSE_PATH'),
      '*',
      this.variablesService.settings.default_path,
      (file_status, file_data) => {
        if (file_status) {
          this.variablesService.settings.default_path = file_data.path.substr(
            0,
            file_data.path.lastIndexOf('/')
          );
          this.ngZone.run(() => {
            this.router
              .navigate(['/' + paths.open], {
                queryParams: { path: file_data.path },
              })
              .then();
          });
        } else {
          console.log(file_data['error_code']);
        }
      }
    );
  }

  openInBrowser(): void {
    this.backend.openUrlInBrowser(CREATE_NEW_WALLET_HELP_PAGE);
  }
}
