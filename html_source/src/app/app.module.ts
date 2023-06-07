import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PagesModule } from './pages/pages.module';
import { CommonModule } from '@angular/common';
import {
  TranslateLoader,
  TranslateModule,
  TranslateModuleConfig,
} from '@ngx-translate/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartModule, HIGHCHARTS_MODULES } from 'angular-highcharts';
import * as highcharts from 'highcharts';
import exporting from 'highcharts/modules/exporting.src';
import { MoneyToIntPipeModule } from '@parts/pipes';
import { OpenWalletModalComponent } from '@parts/modals/open-wallet-modal/open-wallet-modal.component';
import { FlexModule } from '@angular/flex-layout';
import { FormsModule } from '@angular/forms';
import { RegisterContextTemplatesComponent } from '@parts/components/register-context-templates.component';

export function highchartsFactory(): any[] {
  highcharts.setOptions({
    time: {
      useUTC: false,
    },
  });

  return [exporting];
}

export const provideHighchartsFactory = {
  provide: HIGHCHARTS_MODULES,
  useFactory: highchartsFactory,
};

export function HttpLoaderFactory(httpClient: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(httpClient, './assets/i18n/', '.json');
}

export const translateModuleConfig: TranslateModuleConfig = {
  loader: {
    provide: TranslateLoader,
    useFactory: HttpLoaderFactory,
    deps: [HttpClient],
  },
};

@NgModule({
  declarations: [AppComponent, OpenWalletModalComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot(translateModuleConfig),
    AppRoutingModule,
    PagesModule,
    ChartModule,
    MoneyToIntPipeModule,
    FlexModule,
    FormsModule,
    RegisterContextTemplatesComponent,
  ],
  providers: [provideHighchartsFactory],
  bootstrap: [AppComponent],
})
export class AppModule {}
