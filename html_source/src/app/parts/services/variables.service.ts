import { Injectable, NgZone } from '@angular/core';
import { DeeplinkParams, Wallet } from '@api/models/wallet.model';
import { Contact } from '@api/models/contact.model';
import { BehaviorSubject } from 'rxjs';
import { Idle } from 'idlejs/dist';
import { Router } from '@angular/router';
import {
  ContextMenuComponent,
  ContextMenuService,
} from '@perfectmemory/ngx-contextmenu';
import { BigNumber } from 'bignumber.js';
import { Aliases } from '@api/models/alias.model';

@Injectable({
  providedIn: 'root',
})
export class VariablesService {
  disable_price_fetch$ = new BehaviorSubject<boolean>(false);

  use_debug_mode$ = new BehaviorSubject<boolean>(false);

  stop_paginate = {};

  sync_started = false;

  digits = 8;

  appPass = '';

  appLogin = false;

  moneyEquivalent = 0;

  moneyEquivalentPercent = 0;

  defaultCurrency = 'INF';

  opening_wallet: Wallet;

  exp_med_ts = 0;

  net_time_delta_median = 0;

  height_app = 0;

  height_max = 0;

  downloaded = 0;

  total = 0;

  last_build_available = '';

  last_build_displaymode = 0;

  daemon_state = 3;

  deeplink$ = new BehaviorSubject<string | null>(null);

  sendActionData$ = new BehaviorSubject<DeeplinkParams>({});

  sync = {
    progress_value: 0,
    progress_value_text: '0',
  };

  download = {
    progress_value: 0,
    progress_value_text: '0',
  };

  get_recent_transfers = false; // avoid of execute function before callback complete

  default_fee = '0.01000000';

  default_fee_big = new BigNumber('1000000');

  settings = {
    appLockTime: 15,
    appLog: 0,
    scale: '10px',
    appUseTor: true,
    language: 'en',
    default_path: '/',
    viewedContracts: [],
    notViewedContracts: [],
    wallets: [],
  };

  count = 40;

  maxPages = 5;

  testnet = false;

  networkType = ''; // testnet of mainnet

  wallets: Array<Wallet> = [];

  get walletNamesForComparisons(): string[] {
    return this.wallets.map(({ name }) => name) ?? [];
  }

  currentWallet: Wallet;

  aliases: Aliases = [];

  aliasesChecked: any = {};

  enableAliasSearch = false;

  maxWalletNameLength = 25;

  maxCommentLength = 255;

  dataIsLoaded = false;

  contacts: Array<Contact> = [];

  pattern = '^[a-zA-Z0-9_.\\]*|~!?@#$%^&+{}()<>:;"\'-=/,[\\\\]*$';

  after_sync_request: any = {};

  getExpMedTsEvent = new BehaviorSubject(null);

  getHeightAppEvent = new BehaviorSubject(null);

  getHeightMaxEvent = new BehaviorSubject(null);

  getDownloadedAppEvent = new BehaviorSubject(null);

  getTotalEvent = new BehaviorSubject(null);

  getRefreshStackingEvent = new BehaviorSubject(null);

  getAliasChangedEvent = new BehaviorSubject(null);

  getWalletChangedEvent = new BehaviorSubject<Wallet>(null);

  idle = new Idle().whenNotInteractive().do(async () => {
    if (this.appPass === '') {
      this.stopCountdown();
    } else {
      await this.ngZone.run(async () => {
        this.stopCountdown();
        this.appPass = '';
        this.appLogin = false;
        await this.router.navigate(['/login'], {
          queryParams: { type: 'auth' },
        });
      });
    }
  });

  allContextMenu: ContextMenuComponent<any>;

  onlyCopyContextMenu: ContextMenuComponent<any>;

  pasteSelectContextMenu: ContextMenuComponent<any>;

  constructor(
    private router: Router,
    private ngZone: NgZone,
    private contextMenuService: ContextMenuService<any>
  ) {}

  setExpMedTs(timestamp: number): void {
    if (timestamp !== this.exp_med_ts) {
      this.exp_med_ts = timestamp;
      this.getExpMedTsEvent.next(timestamp);
    }
  }

  setHeightApp(height: number): void {
    if (height !== this.height_app) {
      this.height_app = height;
      this.getHeightAppEvent.next(height);
    }
  }

  setHeightMax(height: number): void {
    if (height !== this.height_max) {
      this.height_max = height;
      this.getHeightMaxEvent.next(height);
    }
  }

  setDownloadedBytes(bytes: number): void {
    if (bytes !== this.downloaded) {
      this.downloaded = this.bytesToMb(bytes);
      this.getDownloadedAppEvent.next(bytes);
    }
  }

  setTotalBytes(bytes: number): void {
    if (bytes !== this.total) {
      this.total = this.bytesToMb(bytes);
      this.getTotalEvent.next(bytes);
    }
  }

  setRefreshStacking(wallet_id: number): void {
    this.getHeightAppEvent.next(wallet_id);
  }

  changeAliases(): void {
    this.getAliasChangedEvent.next(true);
  }

  setCurrentWallet(id): void {
    this.wallets.forEach(wallet => {
      if (wallet.wallet_id === id) {
        this.currentWallet = wallet;
        this.getWalletChangedEvent.next(wallet);
      }
    });
  }

  getWallet(id): Wallet | null {
    for (let i = 0; i < this.wallets.length; i++) {
      if (this.wallets[i].wallet_id === id) {
        return this.wallets[i];
      }
    }
    return null;
  }

  getNotLoadedWallet(): Wallet | null {
    for (let i = 0; i < this.wallets.length; i++) {
      if (!this.wallets[i].loaded) {
        return this.wallets[i];
      }
    }
    return null;
  }

  startCountdown(): void {
    this.idle.within(this.settings.appLockTime).start();
  }

  stopCountdown(): void {
    this.idle.stop();
  }

  restartCountdown(): void {
    if (Boolean(this.settings.appLockTime)) {
      this.idle.within(this.settings.appLockTime).restart();
    } else {
      this.stopCountdown();
    }
  }

  bytesToMb(bytes): number {
    return Number((bytes / Math.pow(1024, 2)).toFixed(1));
  }

  onContextMenu($event: MouseEvent): void {
    $event.target['contextSelectionStart'] = $event.target['selectionStart'];
    $event.target['contextSelectionEnd'] = $event.target['selectionEnd'];
    if (
      $event.target &&
      ($event.target['nodeName'].toUpperCase() === 'TEXTAREA' ||
        $event.target['nodeName'].toUpperCase() === 'INPUT') &&
      !$event.target['readOnly']
    ) {
      this.contextMenuService.show(this.allContextMenu, {
        x: $event.x,
        y: $event.y,
        value: $event.target,
      });
      $event.preventDefault();
      $event.stopPropagation();
    }
  }

  onContextMenuOnlyCopy($event: MouseEvent, copyText?: string): void {
    $event.preventDefault();
    $event.stopPropagation();
    this.contextMenuService.show(this.onlyCopyContextMenu, {
      value: copyText,
      x: $event.x,
      y: $event.y,
    });
  }

  onContextMenuPasteSelect($event: MouseEvent): void {
    $event.target['contextSelectionStart'] = $event.target['selectionStart'];
    $event.target['contextSelectionEnd'] = $event.target['selectionEnd'];

    console.warn($event.target);
    console.warn($event.target['disabled']);

    if (
      $event.target &&
      ($event.target['nodeName'].toUpperCase() === 'TEXTAREA' ||
        $event.target['nodeName'].toUpperCase() === 'INPUT') &&
      !$event.target['readOnly']
    ) {
      this.contextMenuService.show(this.pasteSelectContextMenu, {
        x: $event.x,
        y: $event.y,
        value: $event.target,
      });
      $event.preventDefault();
      $event.stopPropagation();
    }
  }
}
