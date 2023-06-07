import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { paths, pathsChildrenAuth } from '../paths';
import { NoWalletComponent } from './no-wallet/no-wallet.component';
import { FullLayoutComponent } from '../../layouts/full-layout/full-layout.component';

const routes: Routes = [
  {
    path: paths.auth,
    component: FullLayoutComponent,
    children: [
      {
        path: pathsChildrenAuth.noWallet,
        component: NoWalletComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AuthRoutingModule {}
