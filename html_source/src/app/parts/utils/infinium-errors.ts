import { ValidationErrors } from '@angular/forms';

export interface InfiniumValidationErrors extends ValidationErrors {
  errorText: string;
}

export const wrongAssetId: InfiniumValidationErrors = {
  errorText: 'ASSETS.FORM.ERRORS.WRONG_ASSET_ID',
};

export const wrongPassword: InfiniumValidationErrors = {
  errorText: 'Wrong password',
};

export const insuficcientFunds: InfiniumValidationErrors = {
  errorText: 'ASSETS.FORM.ERRORS.INSUFICCIENT_FUNDS',
};

export const notFileInfiniumWallet: InfiniumValidationErrors = {
  errorText: 'ERRORS.NOT_FILE_INF_WALLET',
};
