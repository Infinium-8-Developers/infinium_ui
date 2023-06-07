import { Pipe, PipeTransform } from '@angular/core';
import { Asset, WhiteAssetInfo } from '@api/models/assets.model';
import { AssetsFacade } from '@store/assets/assets.facade';
import { Observable } from 'rxjs';

@Pipe({
  name: 'getWhiteAssetInfo',
})
export class GetWhiteAssetInfoPipe implements PipeTransform {
  constructor(private assetsFacade: AssetsFacade) {}

  transform({
    asset_info: { asset_id },
  }: Asset): Observable<WhiteAssetInfo | undefined> {
    return this.assetsFacade.getAssetByIdFromWhitelist(asset_id);
  }
}
