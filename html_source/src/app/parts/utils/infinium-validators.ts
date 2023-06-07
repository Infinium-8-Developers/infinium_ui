import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';
import { notFileInfiniumWallet, InfiniumValidationErrors } from '@parts/utils/infinium-errors';
import { MIMETypes } from '@parts/utils/MIME-types';

export const regExpHash = /^[a-f0-9]{64}$/i;
export const regExpAliasName = /^@?[a-z\d.-]{2,25}$/;
export const regExpPassword = /^[a-zA-Z0-9_.\]*|~!?@#$%^&+{}()<>:;"'-=,/[\\]*$/;

export class InfiniumValidators {
  static hash({ value }: AbstractControl): ValidationErrors | null {
    return regExpHash.test(value) ? null : { invalidHash: true };
  }

  static formMatch(firstControlName: string, secondControlName: string, nameErrorKey = 'mismatch'): ValidatorFn {
    return (abstractControl: AbstractControl): ValidationErrors | null =>
      abstractControl.get(firstControlName).value === abstractControl.get(secondControlName).value ? null : { [nameErrorKey]: true };
  }

  static duplicate(valuesForComparisons: string | string[]): ValidatorFn {
    return ({ value }: AbstractControl): ValidationErrors | null => {
      const errorObject = { duplicate: true };
      let error = null;

      if (typeof value === 'string' && value === valuesForComparisons) {
        error = errorObject;
      }

      if (Array.isArray(valuesForComparisons) && valuesForComparisons.includes(value)) {
        error = errorObject;
      }

      return error;
    };
  }
}

export const filePathWalletValidator = (path: string): InfiniumValidationErrors | null => {
  if (!(path && path.trim().length)) {
    return null;
  }

  const positionLastSlash = path.lastIndexOf('/');
  const fileName = path.slice(positionLastSlash + 1);

  if (!(fileName && fileName.trim().length)) {
    return null;
  }

  if (fileName) {
    let index = 0;
    while (index < MIMETypes.length) {
      if (fileName.includes(MIMETypes[index])) {
        return notFileInfiniumWallet;
      }
      index++;
    }
  }

  return null;
};
