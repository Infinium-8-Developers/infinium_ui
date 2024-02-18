import { Component, NgZone, OnInit } from '@angular/core';
import { CREATE_NEW_WALLET_HELP_PAGE } from '../../../_shared/constants';
import { Router } from '@angular/router';
import { BackendService } from '../../../_helpers/services/backend.service';
import { VariablesService } from '../../../_helpers/services/variables.service';
import { TranslateService } from '@ngx-translate/core';
import { paths } from '../../../paths';

@Component({
             selector: 'app-no-wallet',
             templateUrl: './no-wallet.component.html',
             styleUrls: ['./no-wallet.component.scss']
           })
export class NoWalletComponent implements OnInit {
  /** app paths */
  paths = paths;

  constructor(
    private _router: Router,
    private _backend: BackendService,
    private _ngZone: NgZone,
    private _translate: TranslateService,
    public variablesService: VariablesService
  ) { }

  ngOnInit() {
  }

  openWallet() {
    this._backend.openFileDialog(
      this._translate.instant('MAIN.CHOOSE_PATH'),
      '*', this.variablesService.settings.default_path,
      (file_status, file_data) => {
        if (file_status) {
          this.variablesService.settings.default_path = file_data.path.substr(0, file_data.path.lastIndexOf('/'));
          this._ngZone.run(() => {
            this._router.navigate(['/' + paths.open], { queryParams: { path: file_data.path } }).then();
          });
        } else {
          console.log(file_data['error_code']);
        }
      });
  }

  openInBrowser() {
    this._backend.openUrlInBrowser(CREATE_NEW_WALLET_HELP_PAGE);
  }

}
