import { Component, EventEmitter, HostBinding, Input, OnDestroy, OnInit, Output, Renderer2 } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { BackendService } from '../../services/backend.service';
import { VariablesService } from '../../services/variables.service';

@Component({
  selector: 'app-export-history-modal',
  templateUrl: './export-history-modal.component.html',
  styleUrls: ['./export-history-modal.component.scss']
})
export class ExportHistoryModalComponent implements OnInit, OnDestroy {
  @HostBinding('class.modal-overlay') modalOverlay = true;

  posFilterIsOn = true;
  currentFormat: string;
  exportPath: string;
  exportData = {
    wallet_id: 0,
    include_pos_transactions: false,
    path: 'C:\\some_file.txt',
    format: 'json'
  };
  exportFormats = [
    {
      format: 'json',
      formatName: 'JSON'
    },
    {
      format: 'text',
      formatName: 'Text'
    },
    {
      format: 'csv',
      formatName: 'CSV'
    }
  ];


  @Input() currentWalletId;
  @Output() closeExportModal: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(
    private backend: BackendService,
    public variablesService: VariablesService,
    private translate: TranslateService,
    private renderer: Renderer2
  ) {
    this.currentFormat = this.exportFormats[0].format;
  }

  ngOnInit() {
    this.renderer.addClass(document.body, 'no-scroll');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  closeModal() {
    this.closeExportModal.emit(true);
  }

  confirmExport() {
    this.exportData.format = `${ this.currentFormat }`;
    this.exportData.wallet_id = this.currentWalletId;
    this.exportData.include_pos_transactions = this.posFilterIsOn;

    this.backend.saveFileDialog(
      this.translate.instant('EXPORT_HISTORY.SAVED_FILE'),
      `${ this.exportData.format }`,
      this.variablesService.settings.default_path,
      (file_status, file_data) => {
        if (this.exportData.format === 'text') {
          this.exportData.path = file_data.path + '.txt';
        } else {
          this.exportData.path = file_data.path + `.${ this.exportData.format }`;
        }
        if (file_status) {
          this.backend.exportWalletHistory(JSON.stringify(this.exportData));
          this.closeExportModal.emit(true);
        }
      });
  }
}
