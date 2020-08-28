import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ForgotPasswordOtpRoutingModule } from './forgot-password-otp-routing.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { ForgotPasswordOtpComponent } from './forgot-password-otp.component';
import { FormsModule } from '@angular/forms';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient,  './assets/i18n/', '.json');
}

@NgModule({
  declarations: [ForgotPasswordOtpComponent],
  imports: [
    CommonModule,
    FormsModule,
    ForgotPasswordOtpRoutingModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class ForgotPasswordOtpModule { }
