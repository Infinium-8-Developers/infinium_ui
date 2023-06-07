import { Component, OnInit } from '@angular/core';
import QRCode from 'qrcode';
import { VariablesService } from '@parts/services/variables.service';
import { RCV_ADDR_QR_SCALE } from '@parts/data/constants';

@Component({
  selector: 'app-receive',
  template: `
    <div
      class="container overflow-auto"
      fxFlexFill
      fxLayout="column"
      fxLayoutAlign="center center"
    >
      <div
        class="wrap-qr overflow-hidden border-radius-0_8-rem mb-2"
        fxFlex="0 0 auto"
        fxLayout="column"
        fxLayoutAlign="center center"
      >
        <img alt="qr-code" [src]="qrImageSrc" />
      </div>

      <div
        class="address border-radius-0_8-rem overflow-hidden pl-1 pr-0_5 pt-0_5 pb-0_5"
        fxFlex="0 0 auto"
        fxLayout="row"
        fxLayoutAlign="space-between center"
      >
        <span
          [delay]="150"
          [placement]="'bottom'"
          [timeout]="0"
          [tooltipClass]="'table-tooltip'"
          [tooltip]="variablesService.currentWallet.address"
          class="text-ellipsis mr-1"
          >{{
            variablesService.currentWallet.address | infiniumShortString : 9 : 9
          }}</span
        >
        <app-copy-button [value]="variablesService.currentWallet.address">
        </app-copy-button>
      </div>
    </div>
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
export class ReceiveComponent implements OnInit {
  qrImageSrc: string;

  constructor(public variablesService: VariablesService) {}

  ngOnInit(): void {
    QRCode.toDataURL(this.variablesService.currentWallet.address, {
      width: 200 * RCV_ADDR_QR_SCALE,
      height: 200 * RCV_ADDR_QR_SCALE,
    })
      .then(url => {
        this.qrImageSrc = url;
      })
      .catch(err => {
        console.error(err);
      });
  }
}
