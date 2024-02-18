import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NoWalletComponent } from './no-wallet.component';

const routes: Routes = [
  { path: '', component: NoWalletComponent },
];

@NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
          })
export class NoWalletRoutingModule {
}
