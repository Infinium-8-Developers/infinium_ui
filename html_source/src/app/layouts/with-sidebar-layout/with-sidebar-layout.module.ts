import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WithSidebarLayoutComponent } from './with-sidebar-layout.component';
import { SidebarModule } from '../sidebar/sidebar.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { RouterOutlet } from '@angular/router';

@NgModule({
  declarations: [WithSidebarLayoutComponent],
  imports: [CommonModule, RouterOutlet, FlexLayoutModule, SidebarModule],
  exports: [WithSidebarLayoutComponent],
})
export class WithSidebarLayoutModule {}
