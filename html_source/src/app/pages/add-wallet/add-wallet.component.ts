import { Component, inject, NgZone } from '@angular/core';
import { BackendService } from '@api/services/backend.service';
import { VariablesService } from '@parts/services/variables.service';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CREATE_NEW_WALLET_HELP_PAGE } from '@parts/data/constants';
import { filePathWalletValidator } from '@parts/utils/infinium-validators';
import { ModalService } from '@parts/services/modal.service';

@Component({
  selector: 'app-add-wallet',
  template: `
    <div class="page-container">
      <div class="toolbar mb-2">
        <div class="left">
          <button appBackButton class="btn-icon circle big mr-2" type="button">
            <i class="icon dropdown-arrow-left"></i>
          </button>
          <h1>{{ 'BREADCRUMBS.ADD_WALLET' | translate }}</h1>
        </div>
        <div class="right"></div>
      </div>

      <div class="page-content">
        <div
          class="scrolled-content"
          fxFlex="1 1 auto"
          fxLayout="column"
          fxLayoutAlign="center center"
        >
          <div
            class="add-wallet w-100"
            fxLayout="row"
            fxLayoutAlign="center center"
          >
            <div class="wrap-controls text-align-center max-w-38-rem">
              <h4 class="mb-2">{{ 'MAIN.TITLE' | translate }}</h4>

              <button
                [routerLink]="['/create']"
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
                [routerLink]="['/restore']"
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
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [],
})
export class AddWalletComponent {
  private translateService = inject(TranslateService);

  constructor(
    public variablesService: VariablesService,
    private router: Router,
    private modalService: ModalService,
    private backendService: BackendService,
    private ngZone: NgZone
  ) {}

  openWallet(): void {
    const caption = this.translateService.instant('MAIN.CHOOSE_PATH');
    const default_path = this.variablesService.settings.default_path;
    this.backendService.openFileDialog(
      caption,
      '*',
      default_path,
      async (file_status, file_data) => {
        if (!file_status) {
          if (file_data['error_code'] !== 'CANCELED') {
            this.modalService.prepareModal('error', file_data['error_code']);
          }
          return;
        }
        const positionLastSlash = file_data.path.lastIndexOf('/');
        const new_default_path = file_data.path.slice(0, positionLastSlash);
        const error = filePathWalletValidator(file_data.path);

        if (error) {
          const text = this.translateService.instant(error.errorText);
          this.modalService.prepareModal('error', text);
          return;
        }

        this.variablesService.settings.default_path = new_default_path;
        await this.ngZone.run(async () => {
          await this.router.navigate(['/open'], {
            queryParams: { path: file_data.path },
          });
        });
      }
    );
  }

  openInBrowser(): void {
    this.backendService.openUrlInBrowser(CREATE_NEW_WALLET_HELP_PAGE);
  }
}
