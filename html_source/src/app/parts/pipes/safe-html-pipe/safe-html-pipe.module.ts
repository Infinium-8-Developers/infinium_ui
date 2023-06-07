import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SafeHTMLPipe } from '@parts/pipes/safe-html-pipe/safe-html.pipe';

@NgModule({
  declarations: [SafeHTMLPipe],
  exports: [SafeHTMLPipe],
  providers: [SafeHTMLPipe],
  imports: [CommonModule],
})
export class SafeHtmlPipeModule {}
