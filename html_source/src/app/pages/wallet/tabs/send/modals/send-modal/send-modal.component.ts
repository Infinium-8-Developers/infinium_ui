import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  HostBinding,
  inject,
  Input,
  OnDestroy,
  OnInit,
  Output,
  Renderer2,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  NonNullableFormBuilder,
  Validators,
} from '@angular/forms';
import { VariablesService } from '@parts/services/variables.service';
import { InfiniumValidators } from '@parts/utils/infinium-validators';

@Component({
  selector: 'app-send-modal',
  template: `
    <div
      class="modal p-2 border-radius-0_8-rem bg-light-blue max-w-54-rem w-100 max-h-100"
      fxLayout="row"
    >
      <div class="wrapper">
        <form
          (ngSubmit)="beforeSubmit()"
          [formGroup]="confirmForm"
          class="overflow-hidden"
          fxFlexFill
          fxLayout="column"
        >
          <h3 class="title mb-2" fxFlex="0 0 auto">
            {{ 'CONFIRM.TITLE' | translate }}
          </h3>

          <div
            class="content mb-2 w-100 overflow-x-hidden overflow-y-auto"
            fxFlex="1 1 auto"
          >
            <div class="table-info mb-2">
              <div class="row">
                <div class="label max-w-19-rem w-100">
                  {{ 'CONFIRM.MESSAGE.SEND' | translate }}
                </div>
                <div class="text">
                  {{ +form.get('amount').value }}
                  {{ form?.get('asset')?.value?.asset_info?.ticker }}
                </div>
              </div>

              <hr class="separator" />

              <div class="row">
                <div class="label max-w-19-rem w-100">
                  {{ 'CONFIRM.MESSAGE.FROM' | translate }}
                </div>
                <div class="text">
                  {{ variablesService.currentWallet.address }}
                </div>
              </div>

              <hr class="separator" />

              <div class="row">
                <div class="label max-w-19-rem w-100">
                  {{ 'CONFIRM.MESSAGE.TO' | translate }}
                </div>
                <div class="text">{{ form.get('address').value }}</div>
              </div>

              <ng-container *ngIf="!!form.get('comment').value">
                <hr class="separator" />

                <div class="row">
                  <div class="label max-w-19-rem w-100">
                    {{ 'CONFIRM.MESSAGE.COMMENT' | translate }}
                  </div>
                  <div class="text">{{ form.get('comment').value }}</div>
                </div>
              </ng-container>
            </div>

            <div *ngIf="variablesService.appPass" class="form__field mb-0">
              <label for="password">
                {{ 'LOGIN.MASTER_PASS' | translate }}
                <span class="color-red">*</span>
              </label>
              <input
                (contextmenu)="
                  variablesService.onContextMenuPasteSelect($event)
                "
                [placeholder]="
                  'PLACEHOLDERS.MASTER_PASS_PLACEHOLDER' | translate
                "
                autofocus
                class="form__field--input"
                [class.invalid]="confirmForm.touched && confirmForm.invalid"
                formControlName="password"
                id="password"
                name="password"
                type="password"
              />
              <div
                *ngIf="confirmForm.touched && confirmForm.invalid"
                class="error"
              >
                <div *ngIf="confirmForm.hasError('passwordNotMatch')">
                  {{ 'LOGIN.FORM_ERRORS.MISMATCH' | translate }}
                </div>
                <div *ngIf="confirmForm.controls.password.hasError('required')">
                  {{ 'LOGIN.FORM_ERRORS.PASS_REQUIRED' | translate }}
                </div>
              </div>
            </div>
          </div>

          <div
            class="controls w-100"
            fxFlex="0 0 auto"
            fxLayout="row nowrap"
            fxLayoutGap="1rem"
          >
            <button (click)="onClose()" class="outline big w-100" type="button">
              {{ 'CONFIRM.BUTTON_CANCEL' | translate }}
            </button>
            <button class="primary big w-100" type="submit">
              {{ 'CONFIRM.BUTTON_CONFIRM' | translate }}
            </button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SendModalComponent implements OnInit, OnDestroy {
  @HostBinding('class.modal-overlay') modalOverlay = true;

  @Input() form: FormGroup;

  @Output() confirmed: EventEmitter<boolean> = new EventEmitter<boolean>();

  cdr = inject(ChangeDetectorRef);

  fb = inject(NonNullableFormBuilder);

  confirmForm = this.fb.group({
    password: this.fb.control(''),
    appPass: this.fb.control(''),
  });

  constructor(
    public variablesService: VariablesService,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'no-scroll');
    const { appPass } = this.variablesService;
    if (appPass) {
      this.confirmForm.controls.appPass.patchValue(appPass, {
        emitEvent: false,
      });
      this.confirmForm.setValidators([
        InfiniumValidators.formMatch('password', 'appPass', 'passwordNotMatch'),
      ]);
      this.confirmForm.controls.password.setValidators([Validators.required]);
      this.confirmForm.updateValueAndValidity();
    }
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  beforeSubmit(): void {
    if (this.confirmForm.invalid) {
      this.confirmForm.markAsTouched();
      this.confirmForm.updateValueAndValidity();
      this.cdr.detectChanges();
      return;
    }

    this.submit();
  }

  submit(): void {
    this.confirmed.emit(true);
  }

  onClose(): void {
    this.confirmed.emit(false);
  }
}
