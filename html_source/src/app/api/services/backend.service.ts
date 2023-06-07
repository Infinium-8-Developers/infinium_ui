import { Injectable, NgZone } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { VariablesService } from '@parts/services/variables.service';
import { ModalService } from '@parts/services/modal.service';
import { MoneyToIntPipe } from '@parts/pipes/money-to-int-pipe/money-to-int.pipe';
import JSONBigNumber from 'json-bignumber';
import { BigNumber } from 'bignumber.js';
import { ResponseGetWalletInfo } from '../models/wallet.model';
import {
  AssetInfo,
  ParamsAddCustomAssetId,
  ParamsRemoveCustomAssetId,
  ResponseAddCustomAssetId,
  ResponseRemoveCustomAssetId,
} from '@api/models/assets.model';
import { Alias } from '@api/models/alias.model';
import { SendMoneyParams } from '@api/models/send-money.model';

export interface PramsObj {
  [key: string]: any;
}

export type PramsArray = (string | PramsObj)[];

export type Params = string | PramsObj | PramsArray;

export enum ParamsType {
  array = 'array',
  object = 'object',
  string = 'string',
}

export const getParamsType = (value: Params): ParamsType | null => {
  if (!value) {
    return null;
  }
  const array: false | ParamsType.array = Array.isArray(value) && ParamsType.array;
  const object: false | ParamsType = Object.keys(ParamsType).includes(typeof value) && ParamsType[typeof value];
  return array || object || null;
};

export type ConvertersObjectForTypes = {
  [key in ParamsType]: (value: Params) => string | string[];
};

export const convertersObjectForTypes: ConvertersObjectForTypes = {
  [ParamsType.string]: (value: string): string => value,
  [ParamsType.object]: (value: PramsObj): string => JSONBigNumber.stringify(value),
  [ParamsType.array]: (value: PramsArray): string[] =>
    value.map(v => {
      return typeof v === ParamsType.string ? (v as string) : JSONBigNumber.stringify(v);
    }),
};

export const convertorParams = (value: Params): string | string[] => {
  const type: ParamsType = getParamsType(value);
  return convertersObjectForTypes[type](value);
};

export interface ResponseAsyncTransfer {
  error_code: string | 'NOT_ENOUGH_MONEY' | 'OK';
  response_data: {
    success: boolean;
    tx_blob_size: number;
    tx_hash: string;
  };
}

export interface AsyncCommandResults {
  job_id: number;
  response: ResponseAsyncTransfer;
}

export enum StatusCurrentActionState {
  STATE_SENDING = 'STATE_SENDING',
  STATE_SENT_SUCCESS = 'STATE_SENT_SUCCESS',
  STATE_SEND_FAILED = 'STATE_SEND_FAILED',
  STATE_INITIALIZING = 'STATE_INITIALIZING',
  STATE_DOWNLOADING_CONSENSUS = 'STATE_DOWNLOADING_CONSENSUS',
  STATE_MAKING_TUNNEL_A = 'STATE_MAKING_TUNNEL_A',
  STATE_MAKING_TUNNEL_B = 'STATE_MAKING_TUNNEL_B',
  STATE_CREATING_STREAM = 'STATE_CREATING_STREAM',
  STATE_FAILED = 'STATE_FAILED',
  STATE_SUCCESS = 'STATE_SUCCESS',
}

export interface CurrentActionState {
  status: StatusCurrentActionState;
  wallet_id: number;
}

export enum Commands {
  money_transfer_cancel = 'money_transfer_cancel',
  handle_deeplink_click = 'handle_deeplink_click',
  money_transfer = 'money_transfer',
  update_daemon_state = 'update_daemon_state',
  wallet_sync_progress = 'wallet_sync_progress',
  update_wallet_status = 'update_wallet_status',
  quit_requested = 'quit_requested',
  on_core_event = 'on_core_event',
  get_wallet_info = 'get_wallet_info',
  remove_custom_asset_id = 'remove_custom_asset_id',
  add_custom_asset_id = 'add_custom_asset_id',
  get_options = 'get_options',
  handle_current_action_state = 'handle_current_action_state',
  set_enable_tor = 'set_enable_tor',
  dispatch_async_call_result = 'dispatch_async_call_result',
  async_call = 'async_call',
  set_log_level = 'set_log_level',
  get_network_type = 'get_network_type',
  get_version = 'get_version',
  get_tx_pool_info = 'get_tx_pool_info',
  get_recent_transfers = 'get_recent_transfers',
  resync_wallet = 'resync_wallet',
  get_alias_coast = 'get_alias_coast',
  get_alias_info_by_address = 'get_alias_info_by_address',
  get_alias_info_by_name = 'get_alias_info_by_name',
  get_all_aliases = 'get_all_aliases',
  request_alias_update = 'request_alias_update',
  webkit_launched_script = 'webkit_launched_script',
  on_request_quit = 'on_request_quit',
  get_app_data = 'get_app_data',
  store_app_data = 'store_app_data',
  get_secure_app_data = 'get_secure_app_data',
  set_master_password = 'set_master_password',
  check_master_password = 'check_master_password',
  get_is_disabled_notifications = 'get_is_disabled_notifications',
  set_is_disabled_notifications = 'set_is_disabled_notifications',
  store_secure_app_data = 'store_secure_app_data',
  drop_secure_app_data = 'drop_secure_app_data',
  have_secure_app_data = 'have_secure_app_data',
  show_savefile_dialog = 'show_savefile_dialog',
  show_openfile_dialog = 'show_openfile_dialog',
  store_to_file = 'store_to_file',
  load_from_file = 'load_from_file',
  push_offer = 'push_offer',
  generate_wallet = 'generate_wallet',
  export_wallet_history = 'export_wallet_history',
  open_wallet = 'open_wallet',
  close_wallet = 'close_wallet',
  get_smart_wallet_info = 'get_smart_wallet_info',
  get_seed_phrase_info = 'get_seed_phrase_info',
  run_wallet = 'run_wallet',
  is_valid_restore_wallet_text = 'is_valid_restore_wallet_text',
  restore_wallet = 'restore_wallet',
  transfer = 'transfer',
  validate_address = 'validate_address',
  set_clipboard = 'set_clipboard',
  get_clipboard = 'get_clipboard',
  create_proposal = 'create_proposal',
  get_contracts = 'get_contracts',
  accept_proposal = 'accept_proposal',
  release_contract = 'release_contract',
  request_cancel_contract = 'request_cancel_contract',
  accept_cancel_contract = 'accept_cancel_contract',
  get_mining_history = 'get_mining_history',
  start_pos_mining = 'start_pos_mining',
  stop_pos_mining = 'stop_pos_mining',
  open_url_in_browser = 'open_url_in_browser',
  start_backend = 'start_backend',
  get_default_fee = 'get_default_fee',
  set_localization_strings = 'set_localization_strings',
  request_alias_registration = 'request_alias_registration',
}

@Injectable({
  providedIn: 'root',
})
export class BackendService {
  dispatchAsyncCallResult$ = new Subject<AsyncCommandResults>();

  handleCurrentActionState$ = new Subject<CurrentActionState>();

  backendObject: any;

  backendLoaded = false;

  constructor(
    private translate: TranslateService,
    private variablesService: VariablesService,
    private modalService: ModalService,
    private moneyToIntPipe: MoneyToIntPipe,
    private ngZone: NgZone
  ) {}

  static bigNumberParser(key, val): any {
    if (
      val.constructor.name === 'BigNumber' &&
      ['balance', 'unlocked_balance', 'amount', 'fee', 'b_fee', 'to_pay', 'a_pledge', 'b_pledge', 'coast', 'a'].indexOf(key) === -1
    ) {
      return val.toNumber();
    }
    if (key === 'rcv' || key === 'spn') {
      for (let i = 0; i < val.length; i++) {
        val[i] = new BigNumber(val[i]);
      }
    }
    return val;
  }

  static Debug(type, message): void {
    switch (type) {
      case 0:
        console.error(message);
        break;
      case 1:
        console.warn(message);
        break;
      case 2:
        console.log(message);
        break;
      default:
        console.log(message);
        break;
    }
  }

  eventSubscribe(command: Commands, callback): void {
    if (command === Commands.on_core_event) {
      this.backendObject[command].connect(callback);
    } else {
      this.backendObject[command].connect(str => {
        callback(JSONBigNumber.parse(str, BackendService.bigNumberParser));
      });
    }
  }

  initService(): Observable<string> {
    return new Observable(observer => {
      if (!this.backendLoaded) {
        this.backendLoaded = true;
        (<any>window).QWebChannel((<any>window).qt.webChannelTransport, channel => {
          this.backendObject = channel.objects.mediator_object;
          observer.next('backendObject loaded');
        });
      } else {
        observer.error('backend not loaded');
        if (!this.backendObject) {
          observer.error('backendObject not loaded');
        }
      }
    });
  }

  webkitLaunchedScript(): void {
    this.runCommand(Commands.webkit_launched_script);
  }

  quitRequest(): void {
    this.runCommand(Commands.on_request_quit);
  }

  getAppData(callback): void {
    this.runCommand(Commands.get_app_data, {}, callback);
  }

  storeAppData(callback?): void {
    if (this.variablesService.wallets.length > 0) {
      this.variablesService.settings.wallets = [];
      this.variablesService.wallets.forEach(wallet => {
        this.variablesService.settings.wallets.push({
          name: wallet.name,
          path: wallet.path,
        });
      });
    }
    this.runCommand(Commands.store_app_data, this.variablesService.settings, callback);
  }

  getSecureAppData(pass, callback): void {
    this.runCommand(Commands.get_secure_app_data, pass, callback);
  }

  setMasterPassword(pass, callback): void {
    this.runCommand(Commands.set_master_password, pass, callback);
  }

  checkMasterPassword(pass, callback): void {
    this.runCommand(Commands.check_master_password, pass, callback);
  }

  getIsDisabledNotifications(callback): void {
    const params = {};
    this.runCommand(Commands.get_is_disabled_notifications, params, callback);
  }

  setIsDisabledNotifications(state): void {
    this.runCommand(Commands.set_is_disabled_notifications, state);
  }

  storeSecureAppData(callback?): void {
    const wallets = [];
    const contacts = [];
    this.variablesService.wallets.forEach(wallet => {
      wallets.push({
        name: wallet.name,
        pass: wallet.pass,
        path: wallet.path,
        staking: wallet.staking,
      });
    });
    this.variablesService.contacts.forEach(contact => {
      contacts.push({
        name: contact.name,
        address: contact.address,
        notes: contact.notes,
      });
    });
    const data = { wallets: wallets, contacts: contacts };
    this.backendObject[Commands.store_secure_app_data](JSON.stringify(data), this.variablesService.appPass, dataStore => {
      this.backendCallback(dataStore, {}, callback, Commands.store_secure_app_data);
    });
  }

  dropSecureAppData(callback?): void {
    this.backendObject[Commands.drop_secure_app_data](dataStore => {
      this.backendCallback(dataStore, {}, callback, Commands.drop_secure_app_data);
    });
  }

  haveSecureAppData(callback): void {
    this.runCommand(Commands.have_secure_app_data, {}, callback);
  }

  saveFileDialog(caption, fileMask, default_path, callback): void {
    const dir = default_path ? default_path : '/';
    const params = {
      caption: caption,
      filemask: fileMask,
      default_dir: dir,
    };
    this.runCommand(Commands.show_savefile_dialog, params, callback);
  }

  openFileDialog(caption, filemask, default_path, callback): void {
    const default_dir = default_path ? default_path : '/';
    const params = {
      caption,
      filemask,
      default_dir,
    };
    this.runCommand(Commands.show_openfile_dialog, params, callback);
  }

  storeFile(path, buff): void {
    this.backendObject[Commands.store_to_file](path, buff);
  }

  loadFile(path, callback): void {
    this.runCommand(Commands.load_from_file, path, callback);
  }

  push_offer(params, callback): void {
    this.runCommand(Commands.push_offer, params, callback);
  }

  generateWallet(path, pass, callback): void {
    const params = {
      path: path,
      pass: pass,
    };
    this.runCommand(Commands.generate_wallet, params, callback);
  }

  exportWalletHistory(json_string): void {
    this.runCommand(Commands.export_wallet_history, json_string);
  }

  openWallet(path, pass, txs_to_return, testEmpty, callback): void {
    const params = {
      path: path,
      pass: pass,
      txs_to_return: txs_to_return,
    };
    params['testEmpty'] = !!testEmpty;
    this.runCommand(Commands.open_wallet, params, callback);
  }

  closeWallet(wallet_id, callback?): void {
    this.runCommand(Commands.close_wallet, { wallet_id: +wallet_id }, callback);
  }

  getSmartWalletInfo({ wallet_id, seed_password }, callback): void {
    this.runCommand(Commands.get_smart_wallet_info, { wallet_id: +wallet_id, seed_password }, callback);
  }

  getSeedPhraseInfo(param, callback): void {
    this.runCommand(Commands.get_seed_phrase_info, param, callback);
  }

  runWallet(wallet_id, callback?): void {
    this.runCommand(Commands.run_wallet, { wallet_id: +wallet_id }, callback);
  }

  isValidRestoreWalletText(param, callback): void {
    this.runCommand(Commands.is_valid_restore_wallet_text, param, callback);
  }

  restoreWallet(path, pass, seed_phrase, seed_pass, callback): void {
    const params = {
      seed_phrase: seed_phrase,
      path: path,
      pass: pass,
      seed_pass,
    };
    this.runCommand(Commands.restore_wallet, params, callback);
  }

  sendMoney({ wallet_id, address, amount, fee, mixin, comment, hide, asset_id }: SendMoneyParams, callback): void {
    const params = {
      wallet_id,
      destinations: [
        {
          address,
          amount,
          ...(asset_id && { asset_id }),
        },
      ],
      mixin_count: mixin ?? 0,
      lock_time: 0,
      fee: this.moneyToIntPipe.transform(fee),
      comment: comment,
      push_payer: !hide,
    };

    this.asyncCall(Commands.transfer, params, callback);
  }

  validateAddress(address, callback): void {
    this.runCommand(Commands.validate_address, address, callback);
  }

  setClipboard(str, callback?): void {
    this.runCommand(Commands.set_clipboard, str, callback);
  }

  getClipboard(callback): void {
    this.runCommand(Commands.get_clipboard, {}, callback);
  }

  createProposal(wallet_id, title, comment, a_addr, b_addr, to_pay, a_pledge, b_pledge, time, payment_id, callback): void {
    const params = {
      wallet_id: parseInt(wallet_id, 10),
      details: {
        t: title,
        c: comment,
        a_addr: a_addr,
        b_addr: b_addr,
        to_pay: this.moneyToIntPipe.transform(to_pay),
        a_pledge: this.moneyToIntPipe.transform(a_pledge),
        b_pledge: this.moneyToIntPipe.transform(b_pledge),
      },
      payment_id: payment_id,
      expiration_period: parseInt(time, 10) * 60 * 60,
      fee: this.variablesService.default_fee_big,
      b_fee: this.variablesService.default_fee_big,
    };
    BackendService.Debug(1, params);
    this.runCommand(Commands.create_proposal, params, callback);
  }

  getContracts(wallet_id, callback): void {
    const params = {
      wallet_id: parseInt(wallet_id, 10),
    };
    BackendService.Debug(1, params);
    this.runCommand(Commands.get_contracts, params, callback);
  }

  acceptProposal(wallet_id, contract_id, callback): void {
    const params = {
      wallet_id: parseInt(wallet_id, 10),
      contract_id: contract_id,
    };
    BackendService.Debug(1, params);
    this.runCommand(Commands.accept_proposal, params, callback);
  }

  releaseProposal(wallet_id, contract_id, release_type, callback): void {
    const params = {
      wallet_id: parseInt(wallet_id, 10),
      contract_id: contract_id,
      release_type: release_type, // "normal" or "burn"
    };
    BackendService.Debug(1, params);
    this.runCommand(Commands.release_contract, params, callback);
  }

  requestCancelContract(wallet_id, contract_id, time, callback): void {
    const params = {
      wallet_id: parseInt(wallet_id, 10),
      contract_id: contract_id,
      fee: this.variablesService.default_fee_big,
      expiration_period: parseInt(time, 10) * 60 * 60,
    };
    BackendService.Debug(1, params);
    this.runCommand(Commands.request_cancel_contract, params, callback);
  }

  acceptCancelContract(wallet_id, contract_id, callback): void {
    const params = {
      wallet_id: parseInt(wallet_id, 10),
      contract_id: contract_id,
    };
    BackendService.Debug(1, params);
    this.runCommand(Commands.accept_cancel_contract, params, callback);
  }

  getMiningHistory(wallet_id, callback): void {
    this.runCommand(Commands.get_mining_history, { wallet_id: parseInt(wallet_id, 10) }, callback);
  }

  startPosMining(wallet_id, callback?): void {
    this.runCommand(Commands.start_pos_mining, { wallet_id: parseInt(wallet_id, 10) }, callback);
  }

  stopPosMining(wallet_id, callback?): void {
    this.runCommand(Commands.stop_pos_mining, { wallet_id: parseInt(wallet_id, 10) }, callback);
  }

  openUrlInBrowser(url, callback?): void {
    this.runCommand(Commands.open_url_in_browser, url, callback);
  }

  start_backend(node, host, port, callback): void {
    const params = {
      configure_for_remote_node: node,
      remote_node_host: host,
      remote_node_port: parseInt(port, 10),
    };
    this.runCommand(Commands.start_backend, params, callback);
  }

  getDefaultFee(callback): void {
    this.runCommand(Commands.get_default_fee, {}, callback);
  }

  setBackendLocalization(stringsArray, title, callback?): void {
    const params = {
      strings: stringsArray,
      language_title: title,
    };
    this.runCommand(Commands.set_localization_strings, params, callback);
  }

  registerAlias(wallet_id, alias, address, fee, comment, reward, callback): void {
    const params = {
      wallet_id: wallet_id,
      alias: {
        alias: alias,
        address: address,
        tracking_key: '',
        comment: comment,
      },
      fee: this.moneyToIntPipe.transform(fee),
      reward: this.moneyToIntPipe.transform(reward),
    };
    this.runCommand(Commands.request_alias_registration, params, callback);
  }

  updateAlias(wallet_id, alias, fee, callback): void {
    const params = {
      wallet_id: wallet_id,
      alias: {
        alias: alias.name.replace('@', ''),
        address: alias.address,
        tracking_key: '',
        comment: alias.comment,
      },
      fee: this.moneyToIntPipe.transform(fee),
    };
    this.runCommand(Commands.request_alias_update, params, callback);
  }

  getAllAliases(callback): void {
    this.runCommand(Commands.get_all_aliases, {}, callback);
  }

  getAliasInfoByName(value, callback): void {
    this.runCommand(Commands.get_alias_info_by_name, value, callback);
  }

  getAliasByAddress(value, callback): void {
    this.runCommand(Commands.get_alias_info_by_address, value, callback);
  }

  getAliasCoast(alias, callback): void {
    this.runCommand(Commands.get_alias_coast, { v: alias }, callback);
  }

  resyncWallet(id): void {
    this.runCommand(Commands.resync_wallet, { wallet_id: id });
  }

  getWalletAlias(address): Partial<Alias> {
    if (address !== null && this.variablesService.daemon_state === 2) {
      if (this.variablesService.aliasesChecked[address] == null) {
        this.variablesService.aliasesChecked[address] = {};
        if (this.variablesService.aliases.length) {
          for (let i = 0, length = this.variablesService.aliases.length; i < length; i++) {
            if (i in this.variablesService.aliases && this.variablesService.aliases[i]['address'] === address) {
              this.variablesService.aliasesChecked[address]['name'] = this.variablesService.aliases[i].name;
              this.variablesService.aliasesChecked[address]['address'] = this.variablesService.aliases[i].address;
              this.variablesService.aliasesChecked[address]['comment'] = this.variablesService.aliases[i].comment;
              return this.variablesService.aliasesChecked[address];
            }
          }
        }
        this.getAliasByAddress(address, (status, data) => {
          if (status) {
            this.variablesService.aliasesChecked[data.address]['name'] = '@' + data.alias;
            this.variablesService.aliasesChecked[data.address]['address'] = data.address;
            this.variablesService.aliasesChecked[data.address]['comment'] = data.comment;
          }
        });
      }
      return this.variablesService.aliasesChecked[address];
    }
    return {};
  }

  getContactAlias(): void {
    if (this.variablesService.contacts.length > 0 && this.variablesService.daemon_state === 2) {
      this.variablesService.contacts.map(contact => {
        this.getAliasByAddress(contact.address, (status, data) => {
          if (status) {
            if (data.alias) {
              contact.alias = '@' + data.alias;
            }
          } else {
            contact.alias = null;
          }
        });
      });
    }
  }

  getRecentTransfers(id, offset, count, exclude_mining_txs, callback): void {
    const params = {
      wallet_id: id,
      offset: offset,
      count: count,
      exclude_mining_txs: exclude_mining_txs,
    };
    this.runCommand(Commands.get_recent_transfers, params, callback);
  }

  getPoolInfo(callback): void {
    this.runCommand(Commands.get_tx_pool_info, {}, callback);
  }

  getVersion(callback): void {
    this.runCommand(Commands.get_version, {}, (status, version) => {
      this.runCommand(Commands.get_network_type, {}, (status_network, type) => {
        callback(version, type);
      });
    });
  }

  setLogLevel(level): void {
    this.runCommand(Commands.set_log_level, { v: level });
  }

  asyncCall(command: string, params: PramsObj, callback?: (job_id?: number) => void | any): void {
    this.runCommand(Commands.async_call, [command, params], (status, { job_id }: { job_id: number }) => {
      callback(job_id);
    });
  }

  dispatchAsyncCallResult(): void {
    this.backendObject[Commands.dispatch_async_call_result].connect((job_id: string, json_resp: string) => {
      const asyncCommandResults: AsyncCommandResults = {
        job_id: +job_id,
        response: JSON.parse(json_resp),
      };
      this.ngZone.run(() => this.dispatchAsyncCallResult$.next(asyncCommandResults));
    });
  }

  handleCurrentActionState(): void {
    this.backendObject[Commands.handle_current_action_state].connect((response: string) => {
      const currentActionState: CurrentActionState = JSON.parse(response);
      this.ngZone.run(() => this.handleCurrentActionState$.next(currentActionState));
    });
  }

  setEnableTor(value: boolean): void {
    this.runCommand(Commands.set_enable_tor, <{ v: boolean }>{
      v: value,
    });
  }

  getOptions(): any {
    this.runCommand(
      Commands.get_options,
      {},
      (status, { disable_price_fetch, use_debug_mode }: { disable_price_fetch: boolean; use_debug_mode: boolean }) => {
        this.variablesService.disable_price_fetch$.next(disable_price_fetch);
        this.variablesService.use_debug_mode$.next(use_debug_mode);
      }
    );
  }

  addCustomAssetId(
    params: ParamsAddCustomAssetId,
    callback: (
      status: boolean,
      response_data: ResponseAddCustomAssetId,
      res_error_code?: {
        error_code: 'FAILED' | string;
        response_data: {
          asset_descriptor: Partial<AssetInfo>;
          status: 'FAILED' | string;
        };
      }
    ) => void
  ): void {
    this.runCommand(Commands.add_custom_asset_id, params, callback);
  }

  removeCustomAssetId(
    params: ParamsRemoveCustomAssetId,
    callback?: (status: boolean, response_data: ResponseRemoveCustomAssetId) => void
  ): void {
    this.runCommand(Commands.remove_custom_asset_id, params, callback);
  }

  getWalletInfo(wallet_id, callback?: (status: boolean, response_data: ResponseGetWalletInfo) => void): void {
    this.runCommand(Commands.get_wallet_info, { wallet_id }, callback);
  }

  private informerRun(error: string, params, command: string): void {
    let error_translate = '';
    switch (error) {
      case 'NOT_ENOUGH_MONEY':
        error_translate = 'ERRORS.NOT_ENOUGH_MONEY';
        // error_translate = 'ERRORS.NO_MONEY'; maybe that one?
        if (command === 'cancel_offer') {
          error_translate = this.translate.instant('ERRORS.NO_MONEY_REMOVE_OFFER', {
            fee: this.variablesService.default_fee,
            currency: this.variablesService.defaultCurrency,
          });
        }
        break;
      case 'CORE_BUSY':
        error_translate = 'ERRORS.CORE_BUSY';
        break;
      case 'BUSY':
        error_translate = 'ERRORS.DAEMON_BUSY';
        break;
      case 'OVERFLOW':
        if (command !== 'get_all_aliases') {
          error_translate = '';
        }
        break;
      case 'NOT_ENOUGH_OUTPUTS_FOR_MIXING':
        error_translate = 'ERRORS.NOT_ENOUGH_OUTPUTS_TO_MIX';
        break;
      case 'TX_IS_TOO_BIG':
        error_translate = 'ERRORS.TRANSACTION_IS_TO_BIG';
        break;
      case 'DISCONNECTED':
        error_translate = 'ERRORS.TRANSFER_ATTEMPT';
        break;
      case 'ACCESS_DENIED':
        error_translate = 'ERRORS.ACCESS_DENIED';
        break;
      case 'TX_REJECTED':
        // if (command === 'request_alias_registration') {
        // error_translate = 'INFORMER.ALIAS_IN_REGISTER';
        // } else {
        error_translate = 'ERRORS.TRANSACTION_ERROR';
        // }
        break;
      case 'INTERNAL_ERROR':
        error_translate = 'ERRORS.TRANSACTION_ERROR';
        break;
      case 'BAD_ARG':
        error_translate = 'ERRORS.BAD_ARG';
        break;
      case 'WALLET_WRONG_ID':
        error_translate = 'ERRORS.WALLET_WRONG_ID';
        break;
      case 'WALLET_WATCH_ONLY_NOT_SUPPORTED':
        error_translate = 'ERRORS.WALLET_WATCH_ONLY_NOT_SUPPORTED';
        break;
      // case 'WRONG_PASSWORD':
      // params = JSON.parse(params);
      // if (!params.testEmpty) {
      //   error_translate = 'ERRORS.WRONG_PASSWORD';
      // }
      // break;
      case 'FILE_RESTORED':
        if (command === 'open_wallet') {
          error_translate = 'ERRORS.FILE_RESTORED';
        }
        break;
      case 'FILE_NOT_FOUND':
        if (command !== 'open_wallet' && command !== 'get_alias_info_by_name' && command !== 'get_alias_info_by_address') {
          error_translate = this.translate.instant('ERRORS.FILE_NOT_FOUND');
          params = JSON.parse(params);
          if (params.path) {
            error_translate += ': ' + params.path;
          }
        }
        break;
      case 'NOT_FOUND':
        if (command !== 'open_wallet' && command !== 'get_alias_info_by_name' && command !== 'get_alias_info_by_address') {
          error_translate = this.translate.instant('ERRORS.FILE_NOT_FOUND');
          params = JSON.parse(params);
          if (params.path) {
            error_translate += ': ' + params.path;
          }
        }
        break;
      case 'CANCELED':
      case '':
        break;
      case 'FAIL':
        if (
          command === 'create_proposal' ||
          command === 'accept_proposal' ||
          command === 'release_contract' ||
          command === 'request_cancel_contract' ||
          command === 'accept_cancel_contract'
        ) {
          error_translate = ' ';
        }
        break;
      case 'ALREADY_EXISTS':
        error_translate = 'ERRORS.FILE_EXIST';
        break;
      case 'FAILED':
        BackendService.Debug(0, `Error: (${error}) was triggered by command: ${command}`);
        break;
      default:
        error_translate = '';
    }
    if (error.indexOf('FAIL:failed to save file') > -1) {
      error_translate = 'ERRORS.FILE_NOT_SAVED';
    }
    if (error.indexOf('FAILED:failed to open binary wallet file for saving') > -1 && command === 'generate_wallet') {
      error_translate = '';
    }

    if (error_translate !== '') {
      this.modalService.prepareModal('error', error_translate);
    }
  }

  private commandDebug(command: Commands, params: Params, result: any): void {
    BackendService.Debug(2, '----------------- ' + command + ' -----------------');
    const debug = {
      _send_params: params,
      _result: result,
    };
    BackendService.Debug(2, debug);
    try {
      BackendService.Debug(2, JSONBigNumber.parse(result, BackendService.bigNumberParser));
    } catch (e) {
      BackendService.Debug(2, { response_data: result, error_code: 'OK' });
    }
  }

  private backendCallback(resultStr, params, callback, command: Commands): any {
    let Result = resultStr;
    if (command !== Commands.get_clipboard) {
      if (!resultStr || resultStr === '') {
        Result = {};
      } else {
        try {
          Result = JSONBigNumber.parse(resultStr, BackendService.bigNumberParser);
        } catch (e) {
          Result = { response_data: resultStr, error_code: 'OK' };
        }
      }
    } else {
      Result = {
        error_code: 'OK',
        response_data: Result,
      };
    }

    const core_busy = Result.error_code === 'CORE_BUSY';
    const Status = Result.error_code === 'OK' || Result.error_code === 'TRUE';

    if (!Status && Status !== undefined && Result.error_code !== undefined) {
      BackendService.Debug(1, 'API error for command: "' + command + '". Error code: ' + Result.error_code);
    }
    const data = typeof Result === 'object' && 'response_data' in Result ? Result.response_data : Result;

    let res_error_code = false;
    if (
      typeof Result === 'object' &&
      'error_code' in Result &&
      Result.error_code !== 'OK' &&
      Result.error_code !== 'TRUE' &&
      Result.error_code !== 'FALSE' &&
      Result.error_code !== 'WRAP'
    ) {
      if (core_busy) {
        setTimeout(() => {
          // this is will avoid update data when user
          // on other wallet after CORE_BUSY (blink of data)
          if (command !== Commands.get_recent_transfers) {
            this.runCommand(command, params, callback);
          } else {
            const current_wallet_id = this.variablesService.currentWallet.wallet_id;
            if (current_wallet_id === params.wallet_id) {
              this.runCommand(command, params, callback);
            }
          }
        }, 50);
      } else {
        this.informerRun(Result.error_code, params, command);
        res_error_code = Result.error_code;
      }
    }

    if (!core_busy) {
      if (typeof callback === 'function') {
        callback(Status, data, res_error_code);
      } else {
        return data;
      }
    }
  }

  private runCommand(command: Commands, params?: Params, callback?): any {
    if (!this.backendObject) {
      return;
    }

    if (command === Commands.get_recent_transfers) {
      this.variablesService.get_recent_transfers = true;
    }

    const Action = this.backendObject[command];

    if (!Action) {
      BackendService.Debug(0, 'Run Command Error! Command "' + command + '" don\'t found in backendObject');
      return;
    }

    const type: ParamsType = getParamsType(params);
    params = params && convertorParams(params);

    if (type === ParamsType.array) {
      Action(...(params as string[]), resultStr => {
        this.commandDebug(command, params, resultStr);
        return this.backendCallback(resultStr, params, callback, command);
      });
      return;
    }

    if (command === Commands.get_recent_transfers) {
      this.variablesService.get_recent_transfers = false;
    }
    Action(params, resultStr => {
      this.commandDebug(command, params, resultStr);
      return this.backendCallback(resultStr, params, callback, command);
    });
  }
}
