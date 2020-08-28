import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { IdentitiesExplorerRoutingModule } from './identities-explorer-routing.module';
import { IdentitiesExplorerComponent } from './identities-explorer.component';
import { FormsModule } from '@angular/forms';
import { SearchFilterPipeModule } from '../../shared/pipes/searchFilter.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgxSpinnerModule } from 'ngx-spinner';

export function HttpLoaderFactory(httpClient: HttpClient) {
  return new TranslateHttpLoader(httpClient,  './assets/i18n/', '.json');
}

@NgModule({
  declarations: [IdentitiesExplorerComponent],
  imports: [
    CommonModule,
    IdentitiesExplorerRoutingModule,
    FormsModule,
    NgbModule,
    NgxSpinnerModule,
    SearchFilterPipeModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: HttpLoaderFactory,
        deps: [HttpClient]
      }
    })
  ]
})
export class IdentitiesExplorerModule { }
