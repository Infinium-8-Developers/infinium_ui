import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DefaultImgDirective } from './default-img.directive';

@NgModule({
  declarations: [DefaultImgDirective],
  exports: [DefaultImgDirective],
  imports: [CommonModule],
})
export class DefaultImgModule {}
