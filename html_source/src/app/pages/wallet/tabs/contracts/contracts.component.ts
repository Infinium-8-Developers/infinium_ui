import { Component } from '@angular/core';
import { VariablesService } from '@parts/services/variables.service';

@Component({
  selector: 'app-contracts',
  template: `
    <div
      *ngIf="
        variablesService.currentWallet.contracts.length;
        else emptyContracts
      "
      class="container"
      fxFlexFill
      fxLayout="column"
    >
      <div class="wrap-table scrolled-content mb-2" fxFlex="1 1 auto">
        <table class="contracts-table">
          <thead>
            <tr>
              <th>
                <div class="bg title">
                  {{ 'CONTRACTS.CONTRACTS' | translate }}
                </div>
              </th>
              <th>
                <div class="bg title">{{ 'CONTRACTS.DATE' | translate }}</div>
              </th>
              <th>
                <div class="bg title">{{ 'CONTRACTS.AMOUNT' | translate }}</div>
              </th>
              <th>
                <div class="bg title">{{ 'CONTRACTS.STATUS' | translate }}</div>
              </th>
              <th>
                <div class="bg title">
                  {{ 'CONTRACTS.COMMENTS' | translate }}
                </div>
              </th>
            </tr>
            <div class="row-divider"></div>
          </thead>
          <tbody>
            <ng-container *ngFor="let item of sortedArrayContracts">
              <tr
                [routerLink]="'/wallet/contracts/purchase/' + item.contract_id"
              >
                <td>
                  <div class="contract" fxLayout="row" fxLayoutAlign=" center">
                    <i *ngIf="!item.is_new" class="icon alert mr-1"></i>
                    <i *ngIf="item.is_new" class="icon new mr-1"></i>
                    <i
                      [class.purchase-arrow-down]="item.is_a"
                      [class.purchase-arrow-up]="!item.is_a"
                      class="icon mr-1"
                    ></i>
                    <span
                      [delay]="500"
                      [showWhenNoOverflow]="false"
                      placement="top-left"
                      tooltip="{{ item.private_detailes.t }}"
                      tooltipClass="table-tooltip"
                      >{{ item.private_detailes.t }}</span
                    >
                  </div>
                </td>
                <td>
                  <div>
                    {{ item.timestamp * 1000 | date : 'dd-MM-yyyy HH:mm' }}
                  </div>
                </td>
                <td>
                  <div>
                    {{ item.private_detailes.to_pay | intToMoney }}
                    {{ variablesService.defaultCurrency }}
                  </div>
                </td>
                <td>
                  <div
                    [class.color-red]="item.state === 4"
                    [delay]="500"
                    class="status"
                    placement="top"
                    tooltip="{{
                      item.state | contractStatusMessages : item.is_a
                    }}"
                    tooltipClass="table-tooltip"
                  >
                    {{ item.state | contractStatusMessages : item.is_a }}
                  </div>
                </td>
                <td>
                  <div
                    [delay]="500"
                    [showWhenNoOverflow]="false"
                    class="comment"
                    placement="top-right"
                    tooltip="{{ item.private_detailes.c }}"
                    tooltipClass="table-tooltip"
                  >
                    {{ item.private_detailes.c }}
                  </div>
                </td>
              </tr>
              <div class="row-divider"></div>
            </ng-container>
          </tbody>
        </table>
      </div>
      <div
        class="buttons-wrap w-100"
        fxFlex="0 0 auto"
        fxLayout="row"
        fxLayoutAlign="start center"
      >
        <button
          [routerLink]="'/wallet/contracts/purchase'"
          class="primary big max-w-19-rem w-100"
          type="button"
        >
          {{ 'CONTRACTS.PURCHASE_BUTTON' | translate }}
        </button>
      </div>
    </div>

    <ng-template #emptyContracts>
      <div
        class="container"
        fxFlexFill
        fxLayout="column"
        fxLayoutAlign="center center"
      >
        <span class="mb-2">{{ 'CONTRACTS.EMPTY' | translate }}</span>
        <button
          [routerLink]="'/wallet/contracts/purchase'"
          class="primary big max-w-19-rem w-100"
          type="button"
        >
          {{ 'CONTRACTS.PURCHASE_BUTTON' | translate }}
        </button>
      </div>
    </ng-template>
  `,
  styles: [
    `
      :host {
        width: 100%;
        height: auto;
      }
    `,
  ],
})
export class ContractsComponent {
  constructor(public variablesService: VariablesService) {}

  get sortedArrayContracts(): any[] {
    return this.variablesService.currentWallet.contracts.sort((a, b) => {
      if (a.is_new < b.is_new) {
        return 1;
      }
      if (a.is_new > b.is_new) {
        return -1;
      }
      if (a.timestamp < b.timestamp) {
        return 1;
      }
      if (a.timestamp > b.timestamp) {
        return -1;
      }
      if (a.contract_id < b.contract_id) {
        return 1;
      }
      if (a.contract_id > b.contract_id) {
        return -1;
      }
      return 0;
    });
  }
}
