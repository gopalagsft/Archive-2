import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './module/home/home.component';

// Import containers
import { DefaultLayoutComponent } from './containers';
import { IdentitiesExplorerModule } from './module/identities-explorer/identities-explorer.module';
import { HomeModule } from './module/home/home.module';
import { PreferencePageComponent } from './module/preference-page/preference-page.component';
import { TwoFAPageComponent } from './module/two-fa-page/two-fa-page.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { NgxIndexedDBModule, DBConfig  } from 'ngx-indexed-db';
import { DataService } from 'src/app/service/data.service';
import { NgxSpinnerModule, NgxSpinnerService } from 'ngx-spinner';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


const dbConfig: DBConfig  = {
  name: 'DehDb',
  version: 2,
  objectStoresMeta: [{
    store: 'users',
    storeConfig: { keyPath: 'username', autoIncrement: true },
    storeSchema: [
      { name: 'username', keypath: 'username', options: { unique: false } },
      { name: 'password', keypath: 'password', options: { unique: false } }
    ]
  },
  {
    store: 'loggedInUser',
    storeConfig: { keyPath: 'username', autoIncrement: false },
    storeSchema: [
      { name: 'username', keypath: 'username', options: { unique: false } },
      { name: 'password', keypath: 'password', options: { unique: false } }
    ]
  },
 
  {
    store: 'parameters',
    storeConfig: { keyPath: 'signin', autoIncrement: true },
    storeSchema: [
      { name: 'signin', keypath: 'signin', options: { unique: false } },
      { name: 'verify', keypath: 'verify', options: { unique: false } }
    ]
  },
 
]
};

const APP_CONTAINERS = [
  DefaultLayoutComponent,
];

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    IdentitiesExplorerModule,
    HttpClientModule,
    NgxIndexedDBModule.forRoot(dbConfig),
     NgxSpinnerModule,
     BrowserAnimationsModule

  ],
  providers: [DataService, NgxSpinnerService],
  bootstrap: [AppComponent]
})
export class AppModule { }
