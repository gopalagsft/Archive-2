import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { DataService } from 'src/app/service/data.service';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import * as CryptoJS from 'crypto-js';
import { LoginService } from 'src/app/service/login.service';
import { twoFa } from '../../shared/model/signIn';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-two-fa-page',
  templateUrl: './two-fa-page.component.html',
  styleUrls: ['./two-fa-page.component.css']
})
export class TwoFAPageComponent implements OnInit {
  user: any;
  private _2faCode = "777777";
  private inputcode: any;
  public model : twoFa;
  public isinvalidCode = false;
  public isCodeExpired = false;
  public isCodeFailed = false;
  apiTrue:boolean = true;
  getEnglishLang: any = [];
  getSpanishLang: any = [];


  constructor(private dbService: NgxIndexedDBService,
    private spinner: NgxSpinnerService, private data: DataService, public translate: TranslateService, private router: Router,
    private route: ActivatedRoute,private loginService: LoginService,) { 
      this.model = new twoFa();
    }

  ngOnInit() {
    this.data.currentMessage.subscribe(user => this.user = user)
    let lang = localStorage.getItem('lang');
    if (lang) {
      this.translate.setDefaultLang(lang);
    } else {
      this.translate.setDefaultLang('en');
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

    //this.loadPersonalizedparameter();
  }

  verify2faCode(code) {
    this.model = code.value;
    this.spinner.show();
    // if (this.model.otp == this._2faCode) {
      this.loginService.twoFa(this.model).subscribe(
        data => {
          this.spinner.hide();
          if (data && data.status_code == 200) {
            // let usenameEncrypt = CryptoJS.AES.encrypt(this.user.username, 'secret key 123').toString();
            // let passwordEncrypt = CryptoJS.AES.encrypt(this.user.password, 'secret key 123').toString();
            // this.dbService.add('loggedInUser', { username: this.user.username, password: passwordEncrypt }).then(
            //   () => {
            //     console.log("success");
            //   },
            //   error => {
            //     console.log(error);
            //   }
            // );
            this.router.navigate(['/identities-explorer']);
          
          }else{
            let getFailedMsg = JSON.parse(localStorage.getItem('otp_failed'));
            let getExpiredMsg = JSON.parse(localStorage.getItem('otp_expired'));
            let getInvalidMsg = JSON.parse(localStorage.getItem('otp_invalid'));

            if(getFailedMsg == true){
              this.isCodeFailed = true;
              this.isinvalidCode = false;
              this.isCodeExpired = false;
            }

            if(getInvalidMsg == true){
              this.isinvalidCode = true;
              this.isCodeFailed = false;
              this.isCodeExpired = false;
                setTimeout(() => {
                    this.router.navigate(['/home']);
                    localStorage.removeItem("token");
                    localStorage.removeItem("username");
                  }, 5000);
            }

            if(getExpiredMsg == true){
              this.isCodeExpired = true;
              this.isCodeFailed = false;
              this.isinvalidCode = false;
              setTimeout(() => {
                this.router.navigate(['/home']);
                localStorage.removeItem("token");
                localStorage.removeItem("username");
              }, 5000);
            }
            
          
            //this.router.navigate(['/2fa-page']);
          }
        },
        error => {
          console.log(error);
        },
        () =>{
  
        }
      );

    
    // } else {
    //   this.isinvalidCode = true;
    //   setTimeout(() => {
    //     this.router.navigate(['/home']);
    //   }, 2000);

    // }

  }


  loadPersonalizedparameter() {

    this.loginService.getPersonalizesParameterSetup().subscribe(
      data => {
        if (data && data.status_code == 200) {
          this.apiTrue = true;
          this.getEnglishLang = data.data.lang.en;
          this.getSpanishLang = data.data.lang.es;
        }else{
          this.apiTrue = false;
        }
      },
      error => {
        console.log(error);
        // this.showError(error);
      },
      () => {

      })
  }

  backToLogin(){
    this.router.navigate(['/home']);
    localStorage.removeItem("token");
    localStorage.removeItem("username");
  }

  ngOnDestroy(){
    localStorage.removeItem("otp_failed");
    localStorage.removeItem("otp_expired");
    localStorage.removeItem("otp_invalid");
  }


}
