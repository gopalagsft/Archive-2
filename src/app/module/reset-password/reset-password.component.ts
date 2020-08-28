import { Component, OnInit } from '@angular/core';
// import data from '../../../assets/response-data/data';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  // public customData;
  
  constructor( public translate: TranslateService) {
    // this.customData = data;
   }


  ngOnInit() {
    let lang = localStorage.getItem('lang');
    if (lang) {
      this.translate.setDefaultLang(lang);
    } else {
      this.translate.setDefaultLang('en');
    }
  }

}
