import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SynchronizationStatusComponent } from './synchronization-status.component';
import { TranslateModule } from '@ngx-translate/core';
import { TooltipModule } from '../_helpers/directives/tooltip.module';

@NgModule({
            declarations: [SynchronizationStatusComponent],
            imports: [
              CommonModule,
              TranslateModule,
              TooltipModule
            ],
            exports: [SynchronizationStatusComponent]
          })
export class SynchronizationStatusModule {
}
