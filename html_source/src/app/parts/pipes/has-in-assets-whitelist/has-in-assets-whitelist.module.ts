import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HasInAssetsWhitelistPipe } from './has-in-assets-whitelist.pipe';

@NgModule({
  declarations: [HasInAssetsWhitelistPipe],
  exports: [HasInAssetsWhitelistPipe],
  providers: [HasInAssetsWhitelistPipe],
  imports: [CommonModule],
})
export class HasInAssetsWhitelistModule {}
