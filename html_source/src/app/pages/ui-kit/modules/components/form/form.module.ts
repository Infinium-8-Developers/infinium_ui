import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormComponent } from './form.component';
import { CheckboxsComponent, InputsComponent, SelectsComponent, SwitchesComponent } from './components';
import { SharedModule } from 'src/app/_shared/shared.module';
import { NgSelectModule } from '@ng-select/ng-select';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [FormComponent, InputsComponent, SelectsComponent, CheckboxsComponent, SwitchesComponent],
  imports: [
    CommonModule,
    SharedModule,
    NgSelectModule,
    TranslateModule,
  ],
  exports: [FormComponent, InputsComponent, SelectsComponent, CheckboxsComponent, SwitchesComponent]
})
export class FormModule {
}
