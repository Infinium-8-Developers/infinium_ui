import { delay, takeUntil } from 'rxjs/operators';
import { BehaviorSubject, Subject } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { VariablesService } from '@parts/services/variables.service';

@Component({
  selector: 'app-deeplink',
  template: `
    <ng-container *ngIf="deeplink$ | async">
      <app-deeplink-modal
        *ngIf="
          variablesService?.daemon_state === 2 ||
          !variablesService?.sync_started
        "
      ></app-deeplink-modal>

      <app-sync-modal
        *ngIf="
          variablesService?.daemon_state !== 2 || variablesService?.sync_started
        "
      >
      </app-sync-modal>
    </ng-container>
  `,
  styles: [],
})
export class DeeplinkComponent implements OnInit, OnDestroy {
  deeplink$ = new BehaviorSubject<string | null>(null);

  private destroy$ = new Subject<void>();

  constructor(public variablesService: VariablesService) {}

  ngOnInit(): void {
    this.variablesService.deeplink$
      .pipe(delay(200), takeUntil(this.destroy$))
      .subscribe({
        next: data => {
          this.deeplink$.next(data);
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
