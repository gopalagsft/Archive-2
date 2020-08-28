import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { DataService } from 'src/app/service/data.service';


@Component({
  selector: 'app-preference-page',
  templateUrl: './preference-page.component.html',
  styleUrls: ['./preference-page.component.css']
})
export class PreferencePageComponent implements OnInit {
  public dehendpoint = "https://cwa.deh.host/v1";
  public selectedLang = "es";
  public selectedLevel = "LOW";

  constructor(public translate: TranslateService, private router: Router, private routerService: DataService) {
  //   this.router.routeReuseStrategy.shouldReuseRoute = function () {
  //     return false;
  // }

  
  }

  ngOnInit() {
    let lang = localStorage.getItem('lang');
    if (lang) {
      this.translate.setDefaultLang(lang);
    } else {
      this.translate.setDefaultLang('es');
    }

    if(localStorage.getItem('preferenceScreen_obj')){
    let getIdiom = JSON.parse(localStorage.getItem('preferenceScreen_obj'));
    let preferenceLang = getIdiom[0].Idiom;
    if (preferenceLang) {
      this.translate.setDefaultLang(preferenceLang);
    } else {
      this.translate.setDefaultLang('en');
    }
  }
  }


  selectLanguage(event: any): void {
    this.selectedLang = event.target.value;
  }

  selectLevel(event: any): void {
    this.selectedLevel = event.target.value;
  }

  storeToLocal() {
    let saveAndExit = this.routerService.getPreviousUrl();
    this.router.navigate([saveAndExit]);

    if (saveAndExit == '/preference-page') {
      this.router.navigate(['saveAndExit']);
    }

    let preferenceObj = [
      {
        "Idiom": this.selectedLang,
        "DEH-Endpoint": this.dehendpoint,
        "DebugLevel": this.selectedLevel
      }
    ];
    localStorage.setItem('preferenceScreen_obj', JSON.stringify(preferenceObj));
  }


  useLanguage() {
    localStorage.removeItem('lang');
    let getIdiom = JSON.parse(localStorage.getItem('preferenceScreen_obj'));
    this.selectedLang = getIdiom[0].Idiom;
    if (this.selectedLang == 'es') {
      this.selectedLang = 'es'
    }
    else {
      this.selectedLang = 'en'
    }
    this.translate.use(this.selectedLang);
    let preferenceObj = [
      {
        "Idiom": this.selectedLang,
        "DEH-Endpoint": this.dehendpoint,
        "DebugLevel": this.selectedLevel
      }
    ];
    localStorage.setItem('preferenceScreen_obj', JSON.stringify(preferenceObj))
    this.getLang()
  }

  getLang() {
    let getIdiom = JSON.parse(localStorage.getItem('preferenceScreen_obj'));
    let lang = getIdiom[0].Idiom;;
    if (lang) {
      this.translate.setDefaultLang(lang);
    }
    //this.router.navigate([])
  }

  cancel() {
    let prevUrl = this.routerService.getPreviousUrl();
    this.router.navigate([prevUrl]);

    if (prevUrl == '/preference-page') {
      this.router.navigate(['prevUrl']);
    }
  }






}
