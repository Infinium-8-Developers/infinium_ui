import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ShortStringPipe } from './short-string.pipe';

@NgModule({
  declarations: [ShortStringPipe],
  exports: [ShortStringPipe],
  providers: [ShortStringPipe],
  imports: [CommonModule],
})
export class ShortStringPipeModule {}
