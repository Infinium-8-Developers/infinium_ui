import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ResponseAssetsWhiteList } from '@api/models/assets.model';

@Injectable({
  providedIn: 'root',
})
export class AssetsService {
  private httpClient = inject(HttpClient);

  assetsWhitelist(): Observable<ResponseAssetsWhiteList> {
    return this.httpClient.get<ResponseAssetsWhiteList>('https://infinium.space/assets_whitelist.json');
  }
}
