import { Component, OnInit, ViewChild } from '@angular/core';
import {
  ContextMenuComponent,
  ContextMenuModule,
  ContextMenuService,
} from '@perfectmemory/ngx-contextmenu';
import { VariablesService } from '@parts/services/variables.service';
import { BackendService } from '@api/services/backend.service';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-register-context-templates',
  template: ` <context-menu #allContextMenu>
      <ng-template (execute)="contextMenuCopy($event.value)" contextMenuItem>{{
        'CONTEXT_MENU.COPY' | translate
      }}</ng-template>
      <ng-template (execute)="contextMenuPaste($event.value)" contextMenuItem>{{
        'CONTEXT_MENU.PASTE' | translate
      }}</ng-template>
      <ng-template
        (execute)="contextMenuSelect($event.value)"
        contextMenuItem
        >{{ 'CONTEXT_MENU.SELECT' | translate }}</ng-template
      >
    </context-menu>
    <context-menu #onlyCopyContextMenu>
      <ng-template
        (execute)="contextMenuOnlyCopy($event.value)"
        contextMenuItem
        >{{ 'CONTEXT_MENU.COPY' | translate }}</ng-template
      >
    </context-menu>

    <context-menu #pasteSelectContextMenu>
      <ng-template (execute)="contextMenuPaste($event.value)" contextMenuItem>{{
        'CONTEXT_MENU.PASTE' | translate
      }}</ng-template>
      <ng-template
        (execute)="contextMenuSelect($event.value)"
        contextMenuItem
        >{{ 'CONTEXT_MENU.SELECT' | translate }}</ng-template
      >
    </context-menu>`,
  standalone: true,
  imports: [CommonModule, ContextMenuModule, TranslateModule],
  providers: [ContextMenuService],
})
export class RegisterContextTemplatesComponent implements OnInit {
  @ViewChild('allContextMenu', { static: true })
  public allContextMenu: ContextMenuComponent<any>;

  @ViewChild('onlyCopyContextMenu', { static: true })
  public onlyCopyContextMenu: ContextMenuComponent<any>;

  @ViewChild('pasteSelectContextMenu', { static: true })
  public pasteSelectContextMenu: ContextMenuComponent<any>;

  constructor(
    public variablesService: VariablesService,
    private backendService: BackendService
  ) {}

  ngOnInit(): void {
    this.variablesService.allContextMenu = this.allContextMenu;
    this.variablesService.onlyCopyContextMenu = this.onlyCopyContextMenu;
    this.variablesService.pasteSelectContextMenu = this.pasteSelectContextMenu;
  }

  contextMenuCopy(target): void {
    if (
      target &&
      (target['nodeName'].toUpperCase() === 'TEXTAREA' ||
        target['nodeName'].toUpperCase() === 'INPUT')
    ) {
      const start = target['contextSelectionStart']
        ? 'contextSelectionStart'
        : 'selectionStart';
      const end = target['contextSelectionEnd']
        ? 'contextSelectionEnd'
        : 'selectionEnd';
      const canUseSelection = target[start] || target[start] === '0';
      const SelectedText = canUseSelection
        ? target['value'].substring(target[start], target[end])
        : target['value'];
      this.backendService.setClipboard(String(SelectedText));
    }
  }

  contextMenuOnlyCopy(text): void {
    if (text) {
      this.backendService.setClipboard(String(text));
    }
  }

  contextMenuPaste(target): void {
    if (
      target &&
      (target['nodeName'].toUpperCase() === 'TEXTAREA' ||
        target['nodeName'].toUpperCase() === 'INPUT')
    ) {
      this.backendService.getClipboard((status, clipboard) => {
        clipboard = String(clipboard);
        if (typeof clipboard !== 'string' || clipboard.length) {
          const start = target['contextSelectionStart']
            ? 'contextSelectionStart'
            : 'selectionStart';
          const end = target['contextSelectionEnd']
            ? 'contextSelectionEnd'
            : 'selectionEnd';
          const _pre = target['value'].substring(0, target[start]);
          const _aft = target['value'].substring(
            target[end],
            target['value'].length
          );
          let text = _pre + clipboard + _aft;
          const cursorPosition = (_pre + clipboard).length;
          if (target['maxLength'] && parseInt(target['maxLength'], 10) > 0) {
            text = text.substr(0, parseInt(target['maxLength'], 10));
          }
          target['value'] = text;
          target.setSelectionRange(cursorPosition, cursorPosition);
          target.dispatchEvent(new Event('input'));
          target['focus']();
        }
      });
    }
  }

  contextMenuSelect(target): void {
    if (
      target &&
      (target['nodeName'].toUpperCase() === 'TEXTAREA' ||
        target['nodeName'].toUpperCase() === 'INPUT')
    ) {
      target['focus']();
      setTimeout(() => {
        target['select']();
      });
    }
  }
}
