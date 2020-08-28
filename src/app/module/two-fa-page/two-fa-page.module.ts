import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TwoFaPageRoutingModule } from './two-fa-page-routing.module';
import { TwoFAPageComponent } from './two-fa-page.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient,  './assets/i18n/', '.json');
}


@NgModule({
  declarations: [TwoFAPageComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgxSpinnerModule,
    TwoFaPageRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class TwoFaPageModule { }
