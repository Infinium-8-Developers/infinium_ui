import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DeeplinkModalComponent } from './deeplink-modal.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [DeeplinkModalComponent],
  imports: [
    CommonModule,
    NgSelectModule,
    FormsModule,
    FlexLayoutModule,
    TranslateModule,
  ],
  exports: [DeeplinkModalComponent],
})
export class DeeplinkModalModule {}
