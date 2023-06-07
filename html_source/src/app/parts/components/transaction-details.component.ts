import { Component, Input, OnInit } from '@angular/core';
import { Transaction } from '@api/models/transaction.model';
import { VariablesService } from '../services/variables.service';
import { BackendService } from '@api/services/backend.service';
import { IntToMoneyPipe } from '@parts/pipes';
import {
  BLOCK_EXPLORER_TN_TX_URL_PREFIX,
  BLOCK_EXPLORER_TX_URL_PREFIX,
} from '../data/constants';
import { hasOwnProperty } from '../functions/hasOwnProperty';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexModule } from '@angular/flex-layout';
import { TooltipModule } from '@parts/directives';

@Component({
  selector: 'app-transaction-details',
  template: `
    <table>
      <tbody>
        <tr>
          <td>{{ 'HISTORY.DETAILS.ID' | translate }}</td>
          <td
            colspan="2"
            (click)="openInBrowser(transaction.tx_hash)"
            (contextmenu)="
              variablesService.onContextMenuOnlyCopy(
                $event,
                transaction.tx_hash
              )
            "
            class="color-primary cursor-pointer"
          >
            {{ transaction.tx_hash }}
          </td>
          <td>{{ 'HISTORY.DETAILS.SIZE' | translate }}</td>
          <td>
            {{
              'HISTORY.DETAILS.SIZE_VALUE'
                | translate : { value: transaction.tx_blob_size }
            }}
          </td>
        </tr>
        <tr>
          <td>{{ 'HISTORY.DETAILS.HEIGHT' | translate }}</td>
          <td colspan="2">{{ transaction.height }}</td>
          <td>{{ 'HISTORY.DETAILS.CONFIRMATION' | translate }}</td>
          <td>
            {{
              transaction.height === 0
                ? 0
                : variablesService.height_app - transaction.height
            }}
          </td>
        </tr>
        <tr>
          <td>{{ 'HISTORY.DETAILS.INPUTS' | translate }}</td>
          <td
            colspan="2"
            [delay]="500"
            [showWhenNoOverflow]="false"
            placement="top"
            tooltip="{{ inputs.join(', ') }}"
            tooltipClass="table-tooltip table-tooltip-dimensions"
          >
            {{ inputs.join(', ') }}
          </td>
          <td
            [delay]="500"
            [showWhenNoOverflow]="false"
            placement="top"
            tooltip="{{ outputs.join(', ') }}"
            tooltipClass="table-tooltip table-tooltip-dimensions"
          >
            {{ 'HISTORY.DETAILS.OUTPUTS' | translate }}
          </td>
          <td>{{ outputs.join(', ') }}</td>
        </tr>
        <tr>
          <td>{{ 'HISTORY.DETAILS.PAYMENT_ID' | translate }}</td>
          <td
            colspan="4"
            [delay]="500"
            [showWhenNoOverflow]="false"
            placement="top"
            tooltip="{{ transaction.payment_id }}"
            tooltipClass="table-tooltip comment-tooltip"
          >
            {{ transaction.payment_id }}
          </td>
        </tr>
        <tr>
          <td>{{ 'HISTORY.DETAILS.COMMENT' | translate }}</td>
          <td
            colspan="4"
            (contextmenu)="
              variablesService.onContextMenuOnlyCopy(
                $event,
                transaction.comment
              )
            "
            [delay]="500"
            [showWhenNoOverflow]="false"
            placement="top"
            tooltip="{{ transaction.comment }}"
            tooltipClass="table-tooltip comment-tooltip"
          >
            {{ transaction.comment }}
          </td>
        </tr>
      </tbody>
    </table>
  `,
  styles: [
    `
      :host {
        display: block;
        padding: 2rem 0;
      }
      table tbody tr {
        background: none;
      }

      table tbody tr td {
        padding: 1rem 2rem;
      }
    `,
  ],
  standalone: true,
  imports: [CommonModule, TranslateModule, TooltipModule],
})
export class TransactionDetailsComponent implements OnInit {
  @Input() transaction: Transaction;

  inputs: Array<string> = [];

  outputs: Array<string> = [];

  constructor(
    public variablesService: VariablesService,
    private backendService: BackendService,
    private intToMoneyPipe: IntToMoneyPipe
  ) {}

  ngOnInit(): void {
    for (const input in this.transaction.td['spn']) {
      if (hasOwnProperty(this.transaction.td['spn'], input)) {
        this.inputs.push(
          this.intToMoneyPipe.transform(this.transaction.td['spn'][input])
        );
      }
    }
    for (const output in this.transaction.td['rcv']) {
      if (hasOwnProperty(this.transaction.td['rcv'], output)) {
        this.outputs.push(
          this.intToMoneyPipe.transform(this.transaction.td['rcv'][output])
        );
      }
    }
  }

  openInBrowser(tr): void {
    this.backendService.openUrlInBrowser(
      (this.variablesService.testnet
        ? BLOCK_EXPLORER_TN_TX_URL_PREFIX
        : BLOCK_EXPLORER_TX_URL_PREFIX) + tr
    );
  }
}
