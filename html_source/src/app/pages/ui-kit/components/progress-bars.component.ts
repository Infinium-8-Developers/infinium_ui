import { Component } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { FlexModule } from '@angular/flex-layout';

@Component({
  selector: 'app-progress-bars',
  template: `
    <div
      class="synchronization-status"
      fxLayout="column"
      fxLayoutAlign="start stretch"
    >
      <div class="status-container">
        <div class="offline mb-0_5">
          <span>{{ 'SIDEBAR.SYNCHRONIZATION.OFFLINE' | translate }}</span>
        </div>
        <div class="syncing text-ellipsis mb-0_5">
          {{ 'SIDEBAR.SYNCHRONIZATION.SYNCING' | translate }} {{ 100
          }}{{ 'SIDEBAR.SYNCHRONIZATION.SLASH' | translate }}{{ 20000 }}
        </div>
        <div class="online mb-0_5">
          <span>{{ 'SIDEBAR.SYNCHRONIZATION.ONLINE' | translate }}</span>
        </div>
        <div class="loading mb-0_5">
          {{ 'SIDEBAR.SYNCHRONIZATION.LOADING' | translate }}
        </div>
        <div class="offline mb-0_5">
          {{ 'SIDEBAR.SYNCHRONIZATION.ERROR' | translate }}
        </div>
        <div class="online mb-0_5">
          {{ 'SIDEBAR.SYNCHRONIZATION.COMPLETE' | translate }}
        </div>
        <div class="syncing text-ellipsis mb-0_5">
          {{ 'SIDEBAR.SYNCHRONIZATION.DOWNLOADING' | translate }}
          {{ 2345 }}
          {{ 'SIDEBAR.SYNCHRONIZATION.SLASH' | translate }}
          {{ 18000 }}{{ 'SIDEBAR.SYNCHRONIZATION.MB' | translate }}
        </div>

        <div class="progress-bar-container mb-1">
          <div class="syncing">
            <div class="progress-bar">
              <div [style.width]="50 + '%'" class="fill"></div>
            </div>
          </div>
        </div>

        <div class="progress-bar-container mb-1">
          <div class="loading"></div>
        </div>

        <div class="progress-bar-container mb-1">
          <div class="syncing downloading">
            <div class="progress-bar">
              <div [style.width]="44 + '%'" class="fill"></div>
            </div>
          </div>
        </div>
      </div>

      <div class="update-container">
        <div class="update-text standard mb-0_5">
          <span [style.cursor]="'pointer'">{{
            'SIDEBAR.UPDATE.STANDARD' | translate
          }}</span>
        </div>
        <i class="icon update standard"></i>
      </div>

      <div class="update-container">
        <div class="update-text important">
          <span [style.cursor]="'pointer'">{{
            'SIDEBAR.UPDATE.IMPORTANT' | translate
          }}</span>
          <span style="font-size: 1rem">{{
            'SIDEBAR.UPDATE.IMPORTANT_HINT' | translate
          }}</span>
        </div>
        <i class="icon update important"></i>
      </div>

      <div class="update-container">
        <div class="update-text critical">
          <span [style.cursor]="'pointer'">{{
            'SIDEBAR.UPDATE.CRITICAL' | translate
          }}</span>
          <span style="font-size: 1rem">{{
            'SIDEBAR.UPDATE.IMPORTANT_HINT' | translate
          }}</span>
        </div>
        <i class="icon update critical"></i>
      </div>

      <div class="update-container">
        <div class="update-text time-orange">
          <span>{{ 'SIDEBAR.UPDATE.TIME' | translate }}</span>
        </div>
        <i class="icon time-orange"></i>
      </div>
    </div>
  `,
  styles: [],
  standalone: true,
  imports: [TranslateModule, FlexModule],
})
export class ProgressBarsComponent {}
