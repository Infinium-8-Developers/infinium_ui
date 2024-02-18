import { delay, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { VariablesService } from '../_helpers/services/variables.service';

@Component({
  selector: 'app-deeplink',
  templateUrl: './deeplink.component.html',
  styleUrls: ['./deeplink.component.scss']
})
export class DeeplinkComponent implements OnInit, OnDestroy {
  deeplink$: BehaviorSubject<string | null> = new BehaviorSubject(null);

  private destroy$ = new Subject<never>();

  constructor(
    public variablesService: VariablesService,
  ) {
  }

  ngOnInit(): void {
    this.variablesService.deeplink$
      .pipe(delay(200), takeUntil(this.destroy$))
      .subscribe((data) => {
        this.deeplink$.next(data);
      });
  }

  ngOnDestroy() {
    this.destroy$.next();
  }
}
