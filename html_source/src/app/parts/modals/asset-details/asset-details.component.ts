import { Component, Inject } from '@angular/core';
import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { VariablesService } from '@parts/services/variables.service';
import { Asset } from '@api/models/assets.model';

@Component({
  selector: 'app-asset-details',
  template: `
    <div
      class="p-2 border-radius-0_8-rem bg-light-blue w-100 max-h-90-vh"
      fxFlex="0 1 54rem"
    >
      <div class="overflow-hidden" fxFlexFill fxLayout="column">
        <h3 class="title mb-2" fxFlex="0 0 auto">
          {{ title | translate }}
        </h3>
        <ng-container *ngIf="asset; else templateEmpty">
          <div
            class="content mb-2 w-100 overflow-x-hidden overflow-y-auto"
            fxFlex="1 1 auto"
          >
            <div class="table-info">
              <div class="row">
                <div class="label max-w-19-rem w-100">
                  {{ 'ASSETS.MODALS.ASSET_DETAILS.LABELS.NAME' | translate }}
                </div>
                <div class="text">{{ asset.asset_info.full_name }}</div>
              </div>

              <hr class="separator" />

              <div class="row">
                <div class="label max-w-19-rem w-100">
                  {{ 'ASSETS.MODALS.ASSET_DETAILS.LABELS.TICKER' | translate }}
                </div>
                <div class="text">{{ asset.asset_info.ticker }}</div>
              </div>

              <hr class="separator" />

              <div class="row">
                <div class="label max-w-19-rem w-100">
                  {{ 'ASSETS.MODALS.ASSET_DETAILS.LABELS.ID' | translate }}
                </div>
                <div
                  class="text"
                  (contextmenu)="
                    variablesService.onContextMenuOnlyCopy(
                      $event,
                      asset.asset_info.asset_id
                    )
                  "
                >
                  {{ asset.asset_info.asset_id }}
                </div>
              </div>

              <hr class="separator" />

              <div class="row">
                <div class="label max-w-19-rem w-100">
                  {{
                    'ASSETS.MODALS.ASSET_DETAILS.LABELS.CURRENT_SUPPLY'
                      | translate
                  }}
                </div>
                <div class="text">{{ asset.asset_info.current_supply }}</div>
              </div>

              <hr class="separator" />

              <div class="row">
                <div class="label max-w-19-rem w-100">
                  {{
                    'ASSETS.MODALS.ASSET_DETAILS.LABELS.MAX_SUPPLE' | translate
                  }}
                </div>
                <div class="text">{{ asset.asset_info.total_max_supply }}</div>
              </div>
            </div>
          </div>
        </ng-container>
        <ng-template #templateEmpty> No data </ng-template>
        <div
          class="controls w-100"
          fxFlex="0 0 auto"
          fxLayout="row nowrap"
          fxLayoutGap="1rem"
        >
          <button (click)="close()" class="outline big w-100" type="button">
            {{ 'MODALS.OK' | translate }}
          </button>
        </div>
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
export class AssetDetailsComponent {
  title = 'Asset Details';

  asset!: Asset;

  constructor(
    public variablesService: VariablesService,
    private dialogRef: DialogRef,
    @Inject(DIALOG_DATA) { asset, title }: { asset: Asset; title?: string }
  ) {
    this.asset = asset;

    if (title) {
      this.title = title;
    }
  }

  close(): void {
    this.dialogRef.close();
  }
}
