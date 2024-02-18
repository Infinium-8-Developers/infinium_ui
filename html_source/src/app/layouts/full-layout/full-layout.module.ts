import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullLayoutComponent } from './full-layout.component';
import { AppRoutingModule } from '../../app-routing.module';
import { FlexLayoutModule } from '@angular/flex-layout';

@NgModule({
            declarations: [FullLayoutComponent],
            imports: [
              AppRoutingModule,
              FlexLayoutModule,
              CommonModule
            ],
            exports: [FullLayoutComponent]
          })
export class FullLayoutModule {
}
