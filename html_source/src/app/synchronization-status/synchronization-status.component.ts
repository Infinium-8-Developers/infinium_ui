import { Component } from '@angular/core';
import { VariablesService } from '../_helpers/services/variables.service';
import { DOWNLOADS_PAGE_URL } from '../_shared/constants';
import { BackendService } from '../_helpers/services/backend.service';

@Component({
  selector: 'app-synchronization-status',
  templateUrl: './synchronization-status.component.html',
  styleUrls: ['./synchronization-status.component.scss']
})
export class SynchronizationStatusComponent {

  constructor(
    public variablesService: VariablesService,
    private backend: BackendService
  ) {
  }

  getUpdate() {
    this.backend.openUrlInBrowser(DOWNLOADS_PAGE_URL);
  }

}
