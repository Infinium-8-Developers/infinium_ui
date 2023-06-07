import {
  Component,
  ElementRef,
  Inject,
  OnInit,
  ViewChild,
} from '@angular/core';
import { DIALOG_DATA, DialogRef } from '@angular/cdk/dialog';

export interface ConfirmModalData {
  title: string;
  message?: string;
}

@Component({
  selector: 'app-confirm-modal',
  template: `
    <div
      class="modal p-2 border-radius-0_8-rem bg-light-blue w-100 max-h-100"
      fxLayout="column"
    >
      <button (click)="close()" class="close" type="button">
        <i class="icon close"></i>
      </button>

      <div
        class="content mb-2"
        fxLayout="row"
        fxLayoutAlign="center center"
        fxLayoutGap="1rem"
      >
        <i class="icon modal-info"></i>

        <div fxLayout="column" fxLayoutAlign="start stretch">
          <h3 class="title">{{ title | translate }}</h3>
          <p class="message">{{ message | translate }}</p>
        </div>
      </div>

      <div class="controls" fxLayout="row nowrap" fxLayoutGap="1rem">
        <button (click)="close()" class="outline big w-100" type="button">
          {{ 'MODALS.CANCEL' | translate }}
        </button>
        <button
          #buttonSubmit
          (click)="submit()"
          class="primary big w-100"
          type="button"
        >
          {{ 'MODALS.OK' | translate }}
        </button>
      </div>
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
export class ConfirmModalComponent implements OnInit {
  title: string;

  message: string;

  @ViewChild('buttonSubmit', { static: true }) buttonSubmit: ElementRef;

  constructor(
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) { title, message }: ConfirmModalData
  ) {
    this.title = title;
    this.message = message;
  }

  ngOnInit(): void {
    this.buttonSubmit.nativeElement.focus();
  }

  submit(): void {
    this.dialogRef.close(true);
  }

  close(): void {
    this.dialogRef.close(false);
  }
}
