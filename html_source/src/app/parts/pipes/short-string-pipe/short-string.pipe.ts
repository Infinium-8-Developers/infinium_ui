import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'infiniumShortString',
})
export class ShortStringPipe implements PipeTransform {
  transform(
    value: string | null | undefined,
    left = 6,
    right = 6
  ): string | null | undefined {
    return value && `${value.slice(0, left)}...${value.slice(-right)}`;
  }
}
