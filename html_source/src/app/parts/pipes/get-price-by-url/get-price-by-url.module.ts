import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetPriceByUrlPipe } from './get-price-by-url.pipe';

@NgModule({
  declarations: [GetPriceByUrlPipe],
  exports: [GetPriceByUrlPipe],
  providers: [GetPriceByUrlPipe],
  imports: [CommonModule],
})
export class GetPriceByUrlModule {}
