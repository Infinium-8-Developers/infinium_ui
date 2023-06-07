import { NgModule } from '@angular/core';
import { ExportHistoryModalComponent } from './export-history-modal.component';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FlexModule } from '@angular/flex-layout';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { CheckboxComponent } from '@parts/components/checkbox.component';
import { SwitchComponent } from '@parts/components/switch.component';

@NgModule({
  declarations: [ExportHistoryModalComponent],
  exports: [ExportHistoryModalComponent],
  imports: [
    CommonModule,
    TranslateModule,
    FlexModule,
    SwitchComponent,
    CheckboxComponent,
    NgSelectModule,
    FormsModule,
  ],
})
export class ExportHistoryModalModule {}
