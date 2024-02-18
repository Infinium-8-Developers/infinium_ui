import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { pathsChildrenAuth } from '../../paths';

const routes: Routes = [
  {
    path: pathsChildrenAuth.noWallet,
    loadChildren: './no-wallet/no-wallet.module#NoWalletModule',
  }
];

@NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
          })
export class AuthRoutingModule {
}
