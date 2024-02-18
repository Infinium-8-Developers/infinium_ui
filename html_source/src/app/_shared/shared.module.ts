import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CheckboxModule, SwitchModule } from './components';
import { AutoFocusDirective } from './directives/autofocus.directive';

@NgModule({
  declarations: [AutoFocusDirective],
  imports: [CommonModule, SwitchModule, CheckboxModule],
  exports: [SwitchModule, CheckboxModule, AutoFocusDirective],
})
export class SharedModule {}
