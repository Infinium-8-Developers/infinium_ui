export interface SendMoneyParams {
  wallet_id: number;
  address: string;
  amount: number;
  fee: string;
  mixin: number;
  comment: string;
  hide: boolean;
  asset_id: string | null;
}
