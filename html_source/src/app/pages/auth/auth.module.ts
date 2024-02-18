import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NoWalletModule } from './no-wallet/no-wallet.module';
import { AuthRoutingModule } from './auth-routing.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    AuthRoutingModule,
    NoWalletModule
  ]
})
export class AuthModule { }
