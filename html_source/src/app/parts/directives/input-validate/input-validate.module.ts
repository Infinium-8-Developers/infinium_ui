import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputValidateDirective } from '@parts/directives/input-validate/input-validate.directive';

@NgModule({
  declarations: [InputValidateDirective],
  exports: [InputValidateDirective],
  imports: [CommonModule],
})
export class InputValidateModule {}
