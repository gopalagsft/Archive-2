import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
// import data from '../../../assets/response-data/data'
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
@Component({
    selector: 'app-default-layout',
    templateUrl: './default-layout.component.html',
    styleUrls: ['./default-layout.component.css']
})
export class DefaultLayoutComponent implements OnInit {

    currentLanguage = 'es';
    public customData;
    public langLabel;
    redFlag: boolean = false;
    blackFlag: boolean = false;

    constructor(private router: Router,
        private route: ActivatedRoute,
        public translate: TranslateService,
        private changeDet: ChangeDetectorRef
    ) {
        // translate.setDefaultLang('en');
        // override the route reuse strategy
        this.router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        }

        this.router.events.subscribe((evt) => {
            if (evt instanceof NavigationEnd) {
                // trick the Router into believing it's last link wasn't previously loaded
                this.router.navigated = false;

            }
        });

        let lang = localStorage.getItem('lang')
        if (lang == '' || lang == undefined) {
            localStorage.setItem('lang', 'es')
            lang = 'es'
        }

        // if (lang == 'es') {
        //     this.langLabel = 'Español'
        // } else {
        //     this.langLabel = 'English'
        // }

        if (lang == 'en') {
            this.redFlag = true;
            this.blackFlag = false;
        }
        
        if(lang == 'es') {
            this.blackFlag = true;
            this.redFlag = false;
        }
    }

    ngOnInit() {
            
    }

    useLanguage(lang) {
        localStorage.removeItem('preferenceScreen_obj');

        this.currentLanguage = localStorage.getItem('lang')
        if (this.currentLanguage == 'es') {
            this.currentLanguage = 'en'
        }
        else {
            this.currentLanguage = 'es'
        }
        this.translate.use(this.currentLanguage);
        localStorage.setItem('lang', this.currentLanguage)
        this.getLang()
    }

    getLang() {
        let lang = localStorage.getItem('lang')
        if (lang) {
            this.translate.setDefaultLang(lang);
        }
        this.router.navigate([])
    }
}