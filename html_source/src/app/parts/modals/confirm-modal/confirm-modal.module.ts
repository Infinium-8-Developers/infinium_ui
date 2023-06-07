import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmModalComponent } from './confirm-modal.component';
import { TranslateModule } from '@ngx-translate/core';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
  declarations: [ConfirmModalComponent],
  imports: [CommonModule, TranslateModule, FlexLayoutModule],
  exports: [ConfirmModalComponent],
})
export class ConfirmModalModule {}
