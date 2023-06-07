import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  inject,
} from '@angular/core';
import {
  NonNullableFormBuilder,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { VariablesService } from '@parts/services/variables.service';
import { InfiniumValidators } from '@parts/utils/infinium-validators';
import { DialogRef } from '@angular/cdk/dialog';
import { BackendService } from '@api/services/backend.service';
import { Asset, ParamsAddCustomAssetId } from '@api/models/assets.model';
import { WalletsService } from '@parts/services/wallets.service';
import { ControlsOf } from '@parts/utils/controls-of';
import { wrongAssetId } from '@parts/utils/infinium-errors';
import { BehaviorSubject } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FlexModule } from '@angular/flex-layout';
import { TranslateModule } from '@ngx-translate/core';
import { LoaderComponent } from '@parts/components/loader.component';

@Component({
  selector: 'app-add-custom-token',
  standalone: true,
  template: `
    <form
      (ngSubmit)="beforeSubmit()"
      [formGroup]="formGroup"
      class="modal p-2 border-radius-0_8-rem bg-light-blue max-w-54-rem w-100 max-h-100"
    >
      <div class="content" fxLayout="column">
        <h3 class="mb-2">
          {{ 'WALLET.MODAL_ADD_CUSTOM_TOKEN.TITLE' | translate }}
        </h3>

        <div class="form__field">
          <label for="asset_id">{{
            'WALLET.MODAL_ADD_CUSTOM_TOKEN.FIELD_TITLE' | translate
          }}</label>
          <input
            (contextmenu)="variablesService.onContextMenuPasteSelect($event)"
            class="form__field--input"
            formControlName="asset_id"
            id="asset_id"
            name="asset_id"
            placeholder="Enter Asset ID"
            type="text"
            maxlength="64"
          />
          <ng-container *ngIf="formGroup.get('asset_id').touched">
            <div
              *ngIf="formGroup.get('asset_id').hasError('invalidHash')"
              class="error"
            >
              Invalid hash
            </div>
            <div
              *ngIf="formGroup.get('asset_id').hasError('wrongAssetId')"
              class="error"
            >
              {{
                formGroup.get('asset_id').errors['wrongAssetId'].errorText
                  | translate
              }}
            </div>
          </ng-container>
        </div>
      </div>

      <div class="controls" fxLayout="row nowrap" fxLayoutGap="1rem">
        <button (click)="close()" class="outline big w-100" type="button">
          {{ 'MODALS.CANCEL' | translate }}
        </button>
        <button
          [disabled]="formGroup.invalid || (loading$ | async)"
          class="primary big w-100"
          type="submit"
        >
          <ng-container *ngIf="!(loading$ | async); else loadingTemplate">
            {{ 'MODALS.ADD_TOKEN' | translate }}
          </ng-container>
          <ng-template #loadingTemplate>
            <infinium-loader></infinium-loader>
          </ng-template>
        </button>
      </div>
    </form>
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
  imports: [
    CommonModule,
    FlexModule,
    TranslateModule,
    ReactiveFormsModule,
    LoaderComponent,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCustomTokenComponent {
  private fb = inject(NonNullableFormBuilder);

  private cdr = inject(ChangeDetectorRef);

  loading$ = new BehaviorSubject<boolean>(false);

  formGroup = this.fb.group<ControlsOf<{ asset_id: string }>>({
    asset_id: this.fb.control(
      '',
      Validators.compose([
        Validators.required,
        InfiniumValidators.hash,
        Validators.maxLength(64),
      ])
    ),
  });

  constructor(
    public variablesService: VariablesService,
    public backendService: BackendService,
    private walletsService: WalletsService,
    private dialogRef: DialogRef<Asset | undefined>
  ) {}

  beforeSubmit(): void {
    if (this.formGroup.invalid) {
      this.formGroup.markAsTouched();
      this.formGroup.updateValueAndValidity();
      return;
    }

    this.submit();
  }

  submit(): void {
    this.loading$.next(true);
    const { asset_id } = this.formGroup.getRawValue();
    const { wallet_id } = this.variablesService.currentWallet;
    const params: ParamsAddCustomAssetId = {
      asset_id,
      wallet_id,
    };
    this.backendService.addCustomAssetId(
      params,
      (status, { asset_descriptor }) => {
        if (status) {
          const asset: Asset = {
            asset_info: {
              ...asset_descriptor,
              asset_id,
            },
            awaiting_in: 0,
            awaiting_out: 0,
            total: 0,
            unlocked: 0,
          };
          this.walletsService.updateWalletInfo(wallet_id);
          this.dialogRef.close(asset);
        } else {
          this.formGroup.controls.asset_id.setErrors({
            wrongAssetId,
          });
          this.loading$.next(false);
          this.cdr.detectChanges();
        }
      }
    );
  }

  close(): void {
    this.dialogRef.close();
  }
}
