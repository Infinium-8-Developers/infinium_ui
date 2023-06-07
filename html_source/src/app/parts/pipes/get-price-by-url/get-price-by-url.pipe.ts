import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Pipe({
  name: 'getPriceByUrl',
})
export class GetPriceByUrlPipe implements PipeTransform {
  constructor(private httpClient: HttpClient) {}
  transform(
    price_url: string
  ): Observable<{ usd: number; usd_24h_change: number }> | undefined {
    return (
      price_url &&
      this.httpClient
        .get(price_url)
        .pipe(
          map(obj => Object.values(obj)[0] || { usd: 0, usd_24h_change: 0 })
        )
    );
  }
}
