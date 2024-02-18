import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UiKitComponent } from './ui-kit.component';

const routes: Routes = [
  { path: '', component: UiKitComponent },
];

@NgModule({
            imports: [RouterModule.forChild(routes)],
            exports: [RouterModule]
          })
export class UiKitRoutingModule {
}
