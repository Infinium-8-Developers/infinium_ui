import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IsAvailableAliasNamePipe } from './is-available-alias-name.pipe';

@NgModule({
  declarations: [IsAvailableAliasNamePipe],
  exports: [IsAvailableAliasNamePipe],
  providers: [IsAvailableAliasNamePipe],
  imports: [CommonModule],
})
export class IsAvailableAliasNamePipeModule {}
