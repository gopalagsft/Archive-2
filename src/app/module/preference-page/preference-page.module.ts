import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PreferencePageRoutingModule } from './preference-page-routing.module';
import { PreferencePageComponent } from './preference-page.component';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { FormsModule } from '@angular/forms';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient,  './assets/i18n/', '.json');
}


@NgModule({
  declarations: [PreferencePageComponent],
  imports: [
    CommonModule,
    FormsModule,
    PreferencePageRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class PreferencePageModule { }
