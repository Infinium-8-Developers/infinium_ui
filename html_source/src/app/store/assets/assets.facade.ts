import { Injectable } from '@angular/core';
import { StateKeys, Store } from '@store/store';
import { AssetsService } from '@api/services/assets.service';
import { BehaviorSubject, Observable, take } from 'rxjs';
import {
  ResponseAssetsWhiteList,
  WhiteAssetInfo,
} from '@api/models/assets.model';
import { map } from 'rxjs/operators';
import { infiniumAssetInfo } from '@parts/data/assets';

@Injectable({
  providedIn: 'root',
})
export class AssetsFacade {
  loading$ = new BehaviorSubject<boolean>(false);

  constructor(private store: Store, private assetsService: AssetsService) {}

  loadWhitelist(): void {
    this.loading$.next(true);
    this.assetsService
      .assetsWhitelist()
      .pipe(take(1))
      .subscribe({
        next: response => {
          this.store.set(StateKeys.responseAssetsWhiteList, response);
          this.loading$.next(false);
        },
        error: () => {
          this.loading$.next(false);
        },
      });
  }

  getWhitelist(): Observable<WhiteAssetInfo[]> {
    return this.store
      .select<ResponseAssetsWhiteList>(StateKeys.responseAssetsWhiteList)
      .pipe(
        map(({ assets }) => {
          return [infiniumAssetInfo, ...assets];
        })
      );
  }

  getAssetByIdFromWhitelist(
    asset_id: string
  ): Observable<WhiteAssetInfo | undefined> {
    return this.getWhitelist().pipe(
      map(arr => arr.find(i => i.asset_id === asset_id))
    );
  }
}
