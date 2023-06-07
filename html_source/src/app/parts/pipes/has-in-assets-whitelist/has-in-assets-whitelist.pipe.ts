import { Pipe, PipeTransform } from '@angular/core';
import { AssetsFacade } from '@store/assets/assets.facade';
import { Asset } from '@api/models/assets.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'hasInAssetsWhitelist',
})
export class HasInAssetsWhitelistPipe implements PipeTransform {
  constructor(private assetsFacade: AssetsFacade) {}

  transform({ asset_info: { asset_id } }: Asset): Observable<boolean> {
    return this.assetsFacade
      .getAssetByIdFromWhitelist(asset_id)
      .pipe(map(i => Boolean(i)));
  }
}
