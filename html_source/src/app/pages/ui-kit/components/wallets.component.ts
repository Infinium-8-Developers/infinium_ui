import { Component } from '@angular/core';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TranslateModule } from '@ngx-translate/core';
import { FlexModule } from '@angular/flex-layout';
import { CheckboxComponent } from '@parts/components/checkbox.component';
import { SwitchComponent } from '@parts/components/switch.component';

@Component({
  selector: 'app-wallets',
  template: `
    <form class="mb-2" fxLayout="column" fxLayoutAlign="start stretch">
      <app-checkbox
        (emitChange)="classWalletActive = !classWalletActive"
        [value]="classWalletActive"
        class="mb-1"
        label="classWalletActive"
      ></app-checkbox>
      <app-checkbox
        (emitChange)="classWalletAuditable = !classWalletAuditable"
        [value]="classWalletAuditable"
        class="mb-1"
        label="classWalletAuditable"
      ></app-checkbox>
      <app-checkbox
        (emitChange)="classWalletWatchOnly = !classWalletWatchOnly"
        [value]="classWalletWatchOnly"
        class="mb-1"
        label="classWalletWatchOnly"
      ></app-checkbox>
      <app-checkbox
        (emitChange)="showIndicator = !showIndicator"
        [value]="showIndicator"
        class="mb-1"
        label="showIndicator"
      ></app-checkbox>
      <app-checkbox
        (emitChange)="showPrice = !showPrice"
        [value]="showPrice"
        class="mb-1"
        label="showPrice"
      ></app-checkbox>
      <app-checkbox
        (emitChange)="percentRed = !percentRed"
        [value]="percentRed"
        class="mb-1"
        label="percentRed"
      ></app-checkbox>
      <app-checkbox
        (emitChange)="showStaking = !showStaking"
        [value]="showStaking"
        class="mb-1"
        label="showStaking"
      ></app-checkbox>
      <app-checkbox
        (emitChange)="showProgressBar = !showProgressBar"
        [value]="showProgressBar"
        class="mb-1"
        label="showProgressBar"
      ></app-checkbox>
    </form>

    <div
      [class.active]="classWalletActive"
      [class.auditable]="classWalletAuditable"
      [class.watch-only]="classWalletWatchOnly"
      cdkDrag
      class="wallet"
    >
      <div class="content">
        <div class="header">
          <div class="left">
            <div class="name text-ellipsis">
              <span *ngIf="showIndicator" class="indicator"> 12 </span>

              <span class="name">test</span>
            </div>
          </div>
          <div class="right">
            <button type="button">
              <i class="icon close"></i>
            </button>
          </div>
        </div>

        <div class="balance">
          <span class="text-ellipsis mr-1">9999</span>
          <span>INFINIUM</span>
        </div>

        <ng-container *ngIf="showPrice">
          <h4 class="price">
            $999

            <span [class.red]="percentRed" class="percent">20%</span>
          </h4>
        </ng-container>

        <ng-container *ngIf="showStaking">
          <div class="staking">
            <span class="text">{{
              'SIDEBAR.ACCOUNT.STAKING' | translate
            }}</span>
            <app-switch></app-switch>
          </div>
        </ng-container>

        <div *ngIf="showProgressBar" class="account-synchronization">
          <div class="progress-bar">
            <div [style.width]="33 + '%'" class="fill"></div>
          </div>
          <div class="progress-percent">33%</div>
        </div>
      </div>
    </div>
  `,
  styles: [],
  standalone: true,
  imports: [
    CheckboxComponent,
    DragDropModule,
    SwitchComponent,
    TranslateModule,
    FlexModule,
  ],
})
export class WalletsComponent {
  classWalletActive = true;

  classWalletAuditable = false;

  classWalletWatchOnly = false;

  showIndicator = false;

  showPrice = true;

  percentRed = false;

  showStaking = true;

  showProgressBar = false;
}
