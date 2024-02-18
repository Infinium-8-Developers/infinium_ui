import { Component, HostBinding, OnDestroy, OnInit, Renderer2 } from '@angular/core';
import { VariablesService } from '../../services/variables.service';

@Component({
  selector: 'app-sync-modal',
  templateUrl: './sync-modal.component.html',
  styleUrls: ['./sync-modal.component.scss']
})
export class SyncModalComponent implements OnInit, OnDestroy {
  @HostBinding('class.modal-overlay') modalOverlay = true;

  constructor(
    private renderer: Renderer2,
    public variablesService: VariablesService,
  ) {
  }

  ngOnInit() {
    this.renderer.addClass(document.body, 'no-scroll');
  }

  ngOnDestroy() {
    this.renderer.removeClass(document.body, 'no-scroll');
  }

  canselAction() {
    this.variablesService.deeplink$.next(null);
    this.variablesService.sendActionData$.next({});
  }

}
