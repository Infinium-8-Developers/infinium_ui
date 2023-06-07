import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GetWhiteAssetInfoPipe } from './get-white-asset-info.pipe';

@NgModule({
  declarations: [GetWhiteAssetInfoPipe],
  exports: [GetWhiteAssetInfoPipe],
  providers: [GetWhiteAssetInfoPipe],
  imports: [CommonModule],
})
export class GetWhiteAssetInfoModule {}
