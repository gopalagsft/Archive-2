import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SplashPageRoutingModule } from './splash-page-routing.module';
import { SplashPageComponent } from './splash-page.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient,  './assets/i18n/', '.json');
}
@NgModule({
  declarations: [SplashPageComponent],
  imports: [
    CommonModule,
    SplashPageRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class SplashPageModule { }
