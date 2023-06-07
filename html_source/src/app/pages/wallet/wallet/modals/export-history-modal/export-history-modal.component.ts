import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BackendService } from '@api/services/backend.service';
import { VariablesService } from '@parts/services/variables.service';
import { DialogRef } from '@angular/cdk/dialog';

@Component({
  selector: 'app-export-history-modal',
  template: `
    <div
      class="modal p-2 border-radius-0_8-rem bg-light-blue max-h-100 overflow-hidden"
      fxFlex="0 1 54rem"
      fxLayout="column"
      fxLayoutAlign="start stretch"
    >
      <form
        class="form overflow-x-hidden overflow-y-auto"
        fxLayout="column"
        fxLayoutAlign="start stretch"
      >
        <h4 class="text-ellipsis mb-2" fxFlex="0 0 auto">
          {{ 'EXPORT_HISTORY.TITLE' | translate }}
        </h4>

        <div class="content mb-2" fxFlex="1 1 auto">
          <div class="form__field">
            <label>Format:</label>
            <ng-select
              [(ngModel)]="currentFormat"
              [clearable]="false"
              [items]="exportFormats"
              [searchable]="false"
              bindLabel="formatName"
              bindValue="format"
              name="format"
            >
              <ng-template let-item="item" ng-label-tmp>
                {{ item.formatName }}
              </ng-template>
              <ng-template let-index="index" let-item="item" ng-option-tmp>
                {{ item.formatName }}
              </ng-template>
            </ng-select>
          </div>

          <div class="mb-2" fxLayout="row" fxLayoutAlign="start center">
            <span class="color-primary mr-1">{{
              'EXPORT_HISTORY.FILTER' | translate
            }}</span>
            <app-switch
              (emitChange)="posFilterIsOn = !posFilterIsOn"
              [value]="posFilterIsOn"
            ></app-switch>
          </div>
        </div>

        <div
          class="controls"
          fxFlex="0 0 auto"
          fxLayout="row"
          fxLayoutAlign="space-between center"
        >
          <button
            (click)="confirmExport()"
            class="primary big w-100 mr-0_5"
            type="submit"
          >
            {{ 'EXPORT_HISTORY.EXPORT' | translate }}
          </button>
          <button
            (click)="closeModal()"
            class="outline big w-100 ml-0_5"
            type="button"
          >
            {{ 'EXPORT_HISTORY.CANCEL' | translate }}
          </button>
        </div>
      </form>
    </div>
  `,
  styles: [
    `
      :host {
        max-width: 54rem;
        width: 100vw;
        display: block;
      }
    `,
  ],
})
export class ExportHistoryModalComponent {
  posFilterIsOn = true;

  currentFormat: string;

  exportData = {
    wallet_id: 0,
    include_pos_transactions: false,
    path: 'C:\\some_file.txt',
    format: 'json',
  };

  exportFormats = [
    {
      format: 'json',
      formatName: 'JSON',
    },
    {
      format: 'text',
      formatName: 'Text',
    },
    {
      format: 'csv',
      formatName: 'CSV',
    },
  ];

  constructor(
    private backend: BackendService,
    public variablesService: VariablesService,
    private translate: TranslateService,
    private dialogRef: DialogRef
  ) {
    this.currentFormat = this.exportFormats[0].format;
  }

  closeModal(): void {
    this.dialogRef.close();
  }

  confirmExport(): void {
    this.exportData.format = `${this.currentFormat}`;
    this.exportData.wallet_id = this.variablesService.currentWallet.wallet_id;
    this.exportData.include_pos_transactions = this.posFilterIsOn;

    this.backend.saveFileDialog(
      this.translate.instant('EXPORT_HISTORY.SAVED_FILE'),
      `${this.exportData.format}`,
      this.variablesService.settings.default_path,
      (file_status, file_data) => {
        if (this.exportData.format === 'text') {
          this.exportData.path = file_data.path + '.txt';
        } else {
          this.exportData.path = file_data.path + `.${this.exportData.format}`;
        }
        if (file_status) {
          this.backend.exportWalletHistory(JSON.stringify(this.exportData));
          this.closeModal();
        }
      }
    );
  }
}
