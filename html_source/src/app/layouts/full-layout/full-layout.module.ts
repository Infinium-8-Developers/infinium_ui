import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FullLayoutComponent } from './full-layout.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [FullLayoutComponent],
  imports: [CommonModule, RouterOutlet, FlexLayoutModule],
  exports: [FullLayoutComponent],
})
export class FullLayoutModule {}
