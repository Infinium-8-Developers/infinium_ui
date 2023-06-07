import {
  Component,
  HostBinding,
  OnDestroy,
  OnInit,
  Renderer2,
} from '@angular/core';
import { VariablesService } from '@parts/services/variables.service';

@Component({
  selector: 'app-sync-modal',
  template: `
    <div
      class="modal p-2 border-radius-0_8-rem bg-light-blue max-w-54-rem w-100 max-h-100"
    >
      <div class="content" fxLayout="column" fxLayoutAlign="center center">
        <h3 class="mb-2">
          This action is not available during synchronization...
        </h3>
        <button
          (click)="canselAction()"
          class="primary big max-w-19-rem w-100"
          type="button"
        >
          OK
        </button>
      </div>
    </div>
  `,
  styles: [],
})
export class SyncModalComponent implements OnInit, OnDestroy {
  @HostBinding('class.modal-overlay') modalOverlay = true;

  constructor(
    private renderer: Renderer2,
    public variablesService: VariablesService
  ) {}

  ngOnInit(): void {
    this.renderer.addClass(document.body, 'no-scroll');
  }

  ngOnDestroy(): void {
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  canselAction(): void {
    this.variablesService.deeplink$.next(null);
    this.variablesService.sendActionData$.next({});
  }
}
