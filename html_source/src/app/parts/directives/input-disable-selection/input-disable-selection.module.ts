import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputDisableSelectionDirective } from '@parts/directives/input-disable-selection/input-disable-selection.directive';

@NgModule({
  declarations: [InputDisableSelectionDirective],
  exports: [InputDisableSelectionDirective],
  imports: [CommonModule],
})
export class InputDisableSelectionModule {}
