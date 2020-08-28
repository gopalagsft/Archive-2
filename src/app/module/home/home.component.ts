import { Component, OnInit, ViewChild } from '@angular/core';
// import { LoginService } from '../service/login.service';
// import data from '../../../assets/response-data/data'
import { SignIn } from '../../shared/model/signIn';
import { NgForm } from '@angular/forms';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { ElementRef, HostListener } from '@angular/core';
import { NgbModal, NgbActiveModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { LoginService } from '../../service/login.service';
// import { ToastrService } from "ngx-toastr";
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateService } from '@ngx-translate/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';
import * as CryptoJS from 'crypto-js';
import { DataService } from "../../service/data.service";
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  returnUrl: any;
  public setLogCountIncreased = [];
  public counter: number;
  public loginCounter: number = 0;
  public customData;
  public model: SignIn;
  public logCountIncreased = 0;
  message: any;
  storeLangToDb: any;
  isEyeClick:any;

  @ViewChild('signInForm', { static: false }) signInForm: NgForm;
  @ViewChild('alertModal', { static: false }) alertModal: ElementRef;
  @ViewChild('blockUserModal', { static: false }) blockUserModal: ElementRef;
  disabled: boolean = false;

  constructor(
    private data: DataService,
    private modalService: NgbModal,
    private router: Router,
    private spinner: NgxSpinnerService,
    private route: ActivatedRoute,
    private loginService: LoginService,
    public translate: TranslateService,
    private dbService: NgxIndexedDBService

  ) {
    this.model = new SignIn();

    // If user already exist navigate to main screen

    this.dbService.getAll('loggedInUser').then(
      user => {
        if (user.length > 0) {
          if (user[0]["username"] !== '') {
            router.navigate(['/identities-explorer']);
          }
        }
      },
      error => {
        console.log(error);
      }
    );
  }
  ngOnInit() {

    this.data.currentMessage.subscribe(message => this.message = message)

    // Dummy data
    // let encryptionPassword = '12345';
    // let data = {
    //   title: "Login",
    //   username: "Username",
    //   password: "Password",
    //   forgotPassword: "Forgot Password",
    //   gotoPreference: "Goto Preferences"
    // }

    //Encryption/Decryption of dummy data
    // let encryptedData = CryptoJS.AES.encrypt(JSON.stringify(data), encryptionPassword.trim()).toString();
    // let decryptedData = CryptoJS.AES.decrypt(encryptedData, encryptionPassword.trim()).toString(CryptoJS.enc.Utf8);
    // decryptedData = JSON.parse(decryptedData);
  

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

    //Added users in IndexDB
    // let userData = [{ username: 'dehonlineUser', password: '1q2w3e4r' }, { username: 'mfloresruiz', password: '1q2w3e4r' }
    // ]

    // let encryptedArray = [];
    // for (let singleUser of userData) {
    //   let usenameEncrypt = CryptoJS.AES.encrypt(singleUser.username, 'secret key 123').toString();
    //   let passwordEncrypt = CryptoJS.AES.encrypt(singleUser.password, 'secret key 123').toString();
    //   encryptedArray.push({ username: usenameEncrypt, password: passwordEncrypt });
    // }
    // this.dbService.getByKey('users', 1).then(
    //   user => {
    //     if (user === undefined) {
    //       this.dbService.add('users', userData).then(
    //         () => {
    //         },
    //         error => {
    //           console.log(error);
    //         }
    //       );
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );
  }

  signIn(form, e) {
    this.disabled = true;
    if (form.invalid) {
      return;
    }
    this.model = form.value;

    // this.setLogCountIncreased = [];
    // this.setLogCountIncreased = JSON.parse(localStorage.getItem('logCount'));
    // this.dbService.getByKey('users', 1).then(
    //   user => {
    //     let fetchData = user;
    //     let countNotExist = false;
    //     this.logCountIncreased = 0;
    //     for (let singleUser of fetchData) {
    //       if (singleUser.username == this.model.user && singleUser.password !== this.model.password && this.model.password !== undefined && this.model.password !== "") {
    //         this.logCountIncreased += 1;
    //         if (this.setLogCountIncreased !== null && this.setLogCountIncreased.length !== 0) {
    //           for (let count of this.setLogCountIncreased) {
    //             if (count.username == this.model.user) {
    //               countNotExist = false;
    //               if (count.count < 3) {
    //                 count.count += this.logCountIncreased;
    //                 this.OpenErrorModal(e);
    //                 localStorage.setItem('logCount', JSON.stringify(this.setLogCountIncreased));
    //                 return;
    //               }
    //               else if (count.count >= 3) {
    //                 count.count += this.logCountIncreased;
    //                 this.OpenBlockModal(e);
    //                 localStorage.setItem('logCount', JSON.stringify(this.setLogCountIncreased));
    //                 return;
    //               }
    //               break;
    //             } else {
    //               countNotExist = true;
    //             }
    //           }
    //         } else {
    //           countNotExist = true;
    //           this.setLogCountIncreased = [];
    //         }
    //         if (countNotExist) {
    //           this.OpenErrorModal(e);
    //           this.setLogCountIncreased.push({ 'username': this.model.user, 'count': this.logCountIncreased });
    //         }
    //         localStorage.setItem('logCount', JSON.stringify(this.setLogCountIncreased));
    //       }
    //     }
    //     let userMatch = true;
    //     for (let singleUser of fetchData) {
    //       if (singleUser.username !== this.model.user && singleUser.password == this.model.password || singleUser.username !== this.model.user && singleUser.password !== this.model.password) {
    //         userMatch = false;
    //       } else {
    //         userMatch = true;
    //         break;
    //       }
    //     }
    //     if (userMatch == false) {
    //       this.OpenErrorModal(e);
    //       return;
    //     }
    //     if (this.model.password == undefined || this.model.user == undefined || this.model.user == "" || this.model.password == "") {
    //       this.OpenErrorModal(e);
    //     }
    //   },
    //   error => {
    //     console.log(error);
    //   }
    // );


    this.loginApi(e);

  }


  loginApi(e) {
    this.disabled = false;
    this.spinner.show();
    this.loginService.login(this.model).subscribe(
      data => {
        this.spinner.hide();
        if (data && data.status_code == 200) {
          this.disabled = false;
          localStorage.setItem('token', data.token);
          localStorage.setItem('username', this.model.user);
          // this.dbService.getByKey('users', 1).then(
          //   user => {
          //     let fetchData = user;
          //     for (let singleUser of fetchData) {
          //       if (singleUser.username == this.model.user && singleUser.password == this.model.password) {
          //         let usenameEncrypt = CryptoJS.AES.encrypt(this.model.user, 'secret key 123').toString();
          //         let passwordEncrypt = CryptoJS.AES.encrypt(this.model.password, 'secret key 123').toString();
                  this.dbService.add('loggedInUser', { username: this.model.user}).then(
                    () => {
                      console.log("success");
                    },
                    error => {
                      console.log(error);
                    }
                  );
          //       }
          //     }
          //   },
          //   error => {
          //     console.log(error);
          //   }
          // )

         
          if (data.data.challenge === "OTP Required") {
            this.router.navigate(['/2fa-page']);
            localStorage.removeItem("logCount");
          } else {
            this.router.navigate(['/identities-explorer']);
            localStorage.removeItem("logCount");
          }
        } 
        else {
          this.loginCounter += 1;
          localStorage.setItem('logCount', JSON.stringify(this.loginCounter));
          if (this.loginCounter % 3 !== 0) {
            this.OpenErrorModal(e);
            return;
          }
          if (this.loginCounter % 3 === 0) {
            this.OpenBlockModal(e);
            this.loginCounter = 0;
            return;
          }
        }

      },
      error => {
        console.log(error);
      },
      () => {
       
        
      }
    );

  }


  // loadPersonalizedparameter() {
  //   this.loginService.getPersonalizesParameterSetup().subscribe(
  //     data => {

  //       if (data && data.status_code == 200) {
  //         this.storeLangToDb = data.data.lang;
  //         this.dbService.add('parameters', this.storeLangToDb).then(
  //           () => {
  //             console.log("success");
  //           },
  //           error => {
  //             console.log(error);
  //           }
  //         );
  //       }
  //     },

  //     error => {
  //       console.log(error);
  //     },
  //     () => {

  //     })
  // }


  OpenErrorModal(e: KeyboardEvent) {
    setTimeout(() => {
      const input: HTMLInputElement = <HTMLInputElement>e.target;
      input.blur()
      this.modalService.open(this.alertModal, { backdrop: 'static' });
    }, 2);
  }

  OpenBlockModal(e: KeyboardEvent) {
    setTimeout(() => {
      const input: HTMLInputElement = <HTMLInputElement>e.target;
      input.blur()
      this.modalService.open(this.blockUserModal, { backdrop: 'static' });
    }, 2);
  }

  resetFields(form) {
    form.reset();
    localStorage.removeItem("logCount");
    this.disabled = false;
  }

  alert(form){
    this.disabled = false;
  }

}