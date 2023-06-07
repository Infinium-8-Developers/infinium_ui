import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import * as _ from 'lodash';

export interface Pages {
  page: number;
  offset: number;
  walletID: number;
}

@Injectable({
  providedIn: 'root',
})
export class PaginationStore {
  private subject = new BehaviorSubject<Pages[] | null>(null);

  get value(): Pages[] | null {
    return this.subject.value;
  }

  isForward(pages, currentPage): boolean {
    const max = _.maxBy(pages, 'page');
    return !max || max.page < currentPage || max.page === currentPage;
  }

  setPage(pageNumber: number, offset: number, walletID: number): void {
    let newPages: Pages[] = [];
    const pages = this.subject.getValue();
    if (pages && pages.length > 0) {
      newPages = pages.slice(0);
    }
    newPages.push({ page: pageNumber, offset, walletID });
    this.subject.next(newPages);
  }
}
