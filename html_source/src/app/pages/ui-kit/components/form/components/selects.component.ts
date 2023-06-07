import { Component } from '@angular/core';
import { scaleItems } from '@parts/data/scale-items';
import { ScaleItems } from '@api/models/scale.model';
import { TranslateModule } from '@ngx-translate/core';
import { NgSelectModule } from '@ng-select/ng-select';

@Component({
  selector: 'app-selects',
  template: `
    <div class="form__field mb-2">
      <label>Default</label>
      <ng-select
        [clearable]="false"
        [items]="scaleItems"
        [searchable]="false"
        bindLabel="name"
        bindValue="value"
      >
        <ng-template let-item="item" ng-label-tmp>
          {{ item.name | translate }}
        </ng-template>
        <ng-template let-index="index" let-item="item" ng-option-tmp>
          {{ item.name | translate }}
        </ng-template>
      </ng-select>
    </div>

    <div class="form__field">
      <label>With circle</label>
      <ng-select
        [clearable]="false"
        [items]="scaleItems"
        [searchable]="false"
        bindLabel="name"
        bindValue="value"
        class="with-circle"
      >
        <ng-template let-item="item" ng-label-tmp>
          {{ item.name | translate }}
        </ng-template>
        <ng-template let-index="index" let-item="item" ng-option-tmp>
          {{ item.name | translate }}
        </ng-template>
      </ng-select>
    </div>

    <h3 class="mb-1">
      if you use formControlName class ng-invalid set red border if select
      ng-touched
    </h3>
    <div class="form__field">
      <label>With error</label>
      <ng-select
        [clearable]="false"
        [items]="scaleItems"
        [searchable]="false"
        bindLabel="name"
        bindValue="value"
        class="with-circle invalid"
      >
        <ng-template let-item="item" ng-label-tmp>
          {{ item.name | translate }}
        </ng-template>
        <ng-template let-index="index" let-item="item" ng-option-tmp>
          {{ item.name | translate }}
        </ng-template>
      </ng-select>
    </div>
  `,
  styles: [],
  standalone: true,
  imports: [TranslateModule, NgSelectModule],
})
export class SelectsComponent {
  scaleItems: ScaleItems = [...scaleItems];
}
