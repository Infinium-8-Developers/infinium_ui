import { Contract, Contracts } from './contract.model';
import { Transaction, Transactions } from './transaction.model';
import { BigNumber } from 'bignumber.js';
import { Asset, Assets } from './assets.model';
import { hasOwnProperty } from '@parts/functions/hasOwnProperty';
import { BehaviorSubject, Observable } from 'rxjs';
import { Alias } from '@api/models/alias.model';
import { SendMoneyParams } from '@api/models/send-money.model';
import { MIXIN } from '@parts/data/constants';
import { infiniumAssetInfo } from '@parts/data/assets';

export const defaultSendMoneyParams: SendMoneyParams = {
  asset_id: infiniumAssetInfo.asset_id,
  wallet_id: undefined,
  address: '',
  amount: undefined,
  comment: '',
  mixin: MIXIN,
  fee: '0.01',
  hide: false,
};

export class Wallet {
  open_from_exist: boolean;
  updated = false;
  wallet_id: number;
  name: string;
  pass: string;
  path: string;
  address: string;

  private _balances$ = new BehaviorSubject<Assets | null | undefined>(undefined);

  get balances$(): Observable<Assets | null | undefined> {
    return this._balances$.asObservable();
  }

  get balances(): Assets | null | undefined {
    return this._balances$.value;
  }

  set balances(value: Assets | null | undefined) {
    const sortedAssets = [];
    if (value) {
      const indexInfinium = value.findIndex(({ asset_info: { ticker } }) => ticker === 'INF');
      if (indexInfinium >= 0) {
        const assetInfinium = value.splice(indexInfinium, 1).shift();
        sortedAssets.push(assetInfinium);
      }
      const sortedAssetsByBalance = value.sort((a, b) => new BigNumber(b.total).minus(new BigNumber(a.total)).toNumber());
      sortedAssets.push(...sortedAssetsByBalance);
    }
    this._balances$.next(sortedAssets);
  }

  mined_total: number;
  tracking_hey: string;
  is_auditable: boolean;
  is_watch_only: boolean;
  exclude_mining_txs: boolean;
  alias_available: boolean;

  alias?: Partial<Alias>;
  wakeAlias?: boolean;
  staking?: boolean;
  new_messages?: number;
  new_contracts?: number;

  history: Transactions = [];
  total_history_item?: number;
  pages = [];
  totalPages: number;
  currentPage: number;
  excluded_history: Transactions = [];

  contracts: Contracts = [];

  progress?: number;
  loaded?: boolean;
  restore?: boolean;

  sendMoneyParams: SendMoneyParams | null = null;

  constructor(id, name, pass, path, address, balances, unlocked_balance, mined = 0, tracking = '') {
    this.wallet_id = id;
    this.name = name;
    this.pass = pass;
    this.path = path;
    this.address = address;
    this.balances = balances;
    this.mined_total = mined;
    this.tracking_hey = tracking;

    this.alias = {};
    this.staking = false;
    this.new_messages = 0;
    this.new_contracts = 0;

    this.history = [];
    this.excluded_history = [];

    this.progress = 0;
    this.loaded = false;
  }

  getBalanceByTicker(searchTicker: string): Asset | undefined {
    return this.balances?.find(({ asset_info: { ticker } }) => ticker === searchTicker);
  }

  getMoneyEquivalentForInfinium(equivalent): string {
    const balanceInfinium = this.getBalanceByTicker('INF')?.total || 0;
    return new BigNumber(balanceInfinium).multipliedBy(equivalent).toFixed(0);
  }

  prepareHistoryItem(item: Transaction): any {
    if (item.tx_type === 4) {
      item.sortFee = item.amount.plus(item.fee).negated();
      item.sortAmount = new BigNumber(0);
    } else if (item.tx_type === 3) {
      item.sortFee = new BigNumber(0);
    } else if (
      hasOwnProperty(item, 'contract') &&
      (item.contract[0].state === 3 || item.contract[0].state === 6 || item.contract[0].state === 601) &&
      !item.contract[0].is_a
    ) {
      item.sortFee = item.fee.negated();
      item.sortAmount = item.amount;
    } else {
      if (!item.is_income) {
        item.sortFee = item.fee.negated();
        item.sortAmount = item.amount.negated();
      } else {
        item.sortAmount = item.amount;
      }
    }
    return item;
  }

  prepareHistory(items: Transaction[]): void {
    for (let i = 0; i < items.length; i++) {
      if (
        (items[i].tx_type === 7 && items[i].is_income) ||
        (items[i].tx_type === 11 && items[i].is_income) ||
        (items[i].amount.eq(0) && items[i].fee.eq(0) && !items[i].is_mining)
      ) {
        let exists = false;
        for (let j = 0; j < this.excluded_history.length; j++) {
          if (this.excluded_history[j].tx_hash === items[i].tx_hash) {
            exists = true;
            if (this.excluded_history[j].height !== items[i].height) {
              this.excluded_history[j] = items[i];
            }
            break;
          }
        }
        if (!exists) {
          this.excluded_history.push(items[i]);
        }
      } else {
        let exists = false;
        for (let j = 0; j < this.history.length; j++) {
          if (this.history[j].tx_hash === items[i].tx_hash) {
            exists = true;
            if (this.history[j].height !== items[i].height) {
              this.history[j] = this.prepareHistoryItem(items[i]);
            }
            break;
          }
        }
        if (!exists) {
          if (this.history.length > 0 && items[i].timestamp >= this.history[0].timestamp) {
            this.history.unshift(this.prepareHistoryItem(items[i]));
          } else {
            this.history.push(this.prepareHistoryItem(items[i]));
          }
        }
      }
    }
  }

  removeFromHistory(hash: string): void {
    for (let i = 0; i < this.history.length; i++) {
      if (this.history[i].tx_hash === hash) {
        this.history.splice(i, 1);
        break;
      }
    }
  }

  prepareContractsAfterOpen(items: any[], exp_med_ts, height_app, viewedContracts, notViewedContracts): void {
    for (let i = 0; i < items.length; i++) {
      const contract = items[i];
      let contractTransactionExist = false;
      if (this.history) {
        contractTransactionExist = this.history.some(
          elem => elem.contract && elem.contract.length > 0 && elem.contract[0].contract_id === contract.contract_id
        );
      }
      if (!contractTransactionExist && this.excluded_history) {
        contractTransactionExist = this.excluded_history.some(
          elem => elem.contract && elem.contract.length > 0 && elem.contract[0].contract_id === contract.contract_id
        );
      }

      if (!contractTransactionExist) {
        contract.state = 140;
      } else if (contract.state === 1 && contract.expiration_time < exp_med_ts) {
        contract.state = 110;
      } else if (
        contract.state === 2 &&
        contract.cancel_expiration_time !== 0 &&
        contract.cancel_expiration_time < exp_med_ts &&
        contract.height === 0
      ) {
        const searchResult1 = viewedContracts.some(
          elem => elem.state === 2 && elem.is_a === contract.is_a && elem.contract_id === contract.contract_id
        );
        if (!searchResult1) {
          contract.state = 130;
          contract.is_new = true;
        }
      } else if (contract.state === 1) {
        const searchResult2 = notViewedContracts.find(
          elem => elem.state === 110 && elem.is_a === contract.is_a && elem.contract_id === contract.contract_id
        );
        if (searchResult2) {
          if (searchResult2.time === contract.expiration_time) {
            contract.state = 110;
          } else {
            for (let j = 0; j < notViewedContracts.length; j++) {
              if (notViewedContracts[j].contract_id === contract.contract_id && notViewedContracts[j].is_a === contract.is_a) {
                notViewedContracts.splice(j, 1);
                break;
              }
            }
            for (let j = 0; j < viewedContracts.length; j++) {
              if (viewedContracts[j].contract_id === contract.contract_id && viewedContracts[j].is_a === contract.is_a) {
                viewedContracts.splice(j, 1);
                break;
              }
            }
          }
        }
      } else if (contract.state === 2 && (contract.height === 0 || height_app - contract.height < 10)) {
        contract.state = 201;
      } else if (contract.state === 2) {
        const searchResult3 = viewedContracts.some(
          elem => elem.state === 120 && elem.is_a === contract.is_a && elem.contract_id === contract.contract_id
        );
        if (searchResult3) {
          contract.state = 120;
        }
      } else if (contract.state === 5) {
        const searchResult4 = notViewedContracts.find(
          elem => elem.state === 130 && elem.is_a === contract.is_a && elem.contract_id === contract.contract_id
        );
        if (searchResult4) {
          if (searchResult4.time === contract.cancel_expiration_time) {
            contract.state = 130;
          } else {
            for (let j = 0; j < notViewedContracts.length; j++) {
              if (notViewedContracts[j].contract_id === contract.contract_id && notViewedContracts[j].is_a === contract.is_a) {
                notViewedContracts.splice(j, 1);
                break;
              }
            }
            for (let j = 0; j < viewedContracts.length; j++) {
              if (viewedContracts[j].contract_id === contract.contract_id && viewedContracts[j].is_a === contract.is_a) {
                viewedContracts.splice(j, 1);
                break;
              }
            }
          }
        }
      } else if (contract.state === 6 && (contract.height === 0 || height_app - contract.height < 10)) {
        contract.state = 601;
      }
      const searchResult = viewedContracts.some(
        elem => elem.state === contract.state && elem.is_a === contract.is_a && elem.contract_id === contract.contract_id
      );
      contract.is_new = !searchResult;

      this.contracts.push(contract);
    }
    this.recountNewContracts();
  }

  recountNewContracts(): void {
    this.new_contracts = this.contracts.filter(item => item.is_new === true).length;
  }

  getContract(id): Contract {
    for (let i = 0; i < this.contracts.length; i++) {
      if (this.contracts[i].contract_id === id) {
        return this.contracts[i];
      }
    }
    return null;
  }
}

export interface DeeplinkParams {
  action?: 'send' | string;
  address?: string;
  amount?: string;
  my_deposit?: string;
  seller_deposit?: string;
  seller_address?: string;
  hide_sender?: string;
  hide_receiver?: string;
  title?: string;
  description?: string;
  category?: string;
  price?: string;
  img_url?: string;
  url?: string;
  contact?: string;
  comment?: string;
  comments?: string;
  mixins?: string;
  fee?: string;
}

export interface PushOffer {
  wallet_id: number;
  od: {
    ap: string;
    at: string;
    cat: string;
    cnt: string;
    com: string;
    do: string;
    et: number;
    fee: BigNumber;
    lci: string;
    lco: string;
    ot: number;
    pt: string;
    t: string;
    url: string;
  };
}

export interface ResponseGetWalletInfo {
  address: string;
  balances: Assets;
  is_auditable: boolean;
  is_watch_only: boolean;
  mined_total: number;
  path: string;
  view_sec_key: string;
}
