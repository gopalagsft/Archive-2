import { Component, OnInit } from '@angular/core';
// import data from '../../../assets/response-data/data';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import { forgotPassword } from '../../shared/model/signIn';
import { LoginService } from 'src/app/service/login.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css']
})
export class ForgotPasswordComponent implements OnInit {
  // public customData;
  public model: forgotPassword;
  msg: any;
  gotMsg:boolean = false;
  validMsg:boolean = false;
  otpSend:any;

  constructor(public translate: TranslateService,
    private router: Router,
    private spinner: NgxSpinnerService,
    private loginService: LoginService,
    private dbService: NgxIndexedDBService
  ) {
    this.model = new forgotPassword();


    // this.customData = data;
  }

  ngOnInit() {
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
  }

  sendOtp(form) {
    if (form.invalid) {
      return;
    }

    this.model = form.value;

    // this.dbService.getByKey('users', 1).then(
    //   user => {
    //     let fetchData = user;
    //     for (let singleUser of fetchData) {
    //       if (singleUser !== undefined && this.model.username == singleUser.username) {
    //         localStorage.setItem('username', this.model.username)
    //         this.router.navigate(['/forgotPasswordOtp']);
    //       }
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
    

    this.forgotPasswordData();

  }

  forgotPasswordData() {
    this.spinner.show();
    this.loginService.forgotPassword(this.model).subscribe(
      data => {
        this.spinner.hide();
        if (data && data.status_code == 200) {
        this.msg = data.data.message;
        this.gotMsg = true;
        this.validMsg = false;
        setTimeout(() => {
          this.router.navigate(['/home']);
          }, 5000);
     
        }else{
          this.validMsg = true;
        }
      },
      error => {
        console.log(error);
        // this.showError(error);
      },
      () => {

      })
  }

}
