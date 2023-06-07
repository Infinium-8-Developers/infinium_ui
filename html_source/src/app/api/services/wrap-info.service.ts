import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WrapInfo } from '@api/models/wrap-info';

@Injectable({
  providedIn: 'root',
})
export class WrapInfoService {
  private httpClient = inject(HttpClient);

  getWrapInfo(): Observable<WrapInfo> {
    return this.httpClient.get<WrapInfo>('https://wrapped.infinium.space/api2/get_wrap_info');
  }
}
