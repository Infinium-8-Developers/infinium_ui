import {
  Directive,
  OnDestroy,
  TemplateRef,
  ViewContainerRef,
} from '@angular/core';
import { VariablesService } from '../../services/variables.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Directive({
  selector: '[appDisablePriceFetch]',
})
export class DisablePriceFetchDirective implements OnDestroy {
  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private _variablesService: VariablesService,
    private _templateRef: TemplateRef<any>,
    private _viewContainer: ViewContainerRef
  ) {
    this._variablesService.disable_price_fetch$
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (disable_price_fetch: boolean) => {
          return !disable_price_fetch
            ? this._viewContainer.createEmbeddedView(this._templateRef)
            : this._viewContainer.clear();
        },
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
