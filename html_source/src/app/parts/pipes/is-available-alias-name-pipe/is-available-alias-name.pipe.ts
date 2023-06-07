import { Pipe, PipeTransform } from '@angular/core';
import { Alias } from '@api/models/alias.model';

@Pipe({
  name: 'isAvailableAliasName',
})
export class IsAvailableAliasNamePipe implements PipeTransform {
  transform(alias: Partial<Alias> | null | undefined): boolean {
    return (Boolean(alias) && Boolean(alias.name) && alias.name.length >= 2 && alias.name.length <= 6) || false;
  }
}
