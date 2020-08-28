// import { Component, OnInit } from '@angular/core';
// // import data from '../../../assets/response-data/data'
// import { Router, ActivatedRoute } from '@angular/router';
// import { filter } from 'rxjs/operators';
// import { FormsModule } from '@angular/forms';
// import { TranslateService } from '@ngx-translate/core';
// import { NgxIndexedDBService } from 'ngx-indexed-db';
// import { LoginService } from 'src/app/service/login.service';

// @Component({
//   selector: 'app-identities-explorer',
//   templateUrl: './identities-explorer.component.html',
//   styleUrls: ['./identities-explorer.component.css']
// })
// export class IdentitiesExplorerComponent implements OnInit {
//   public customData;
//   public searchText = '';
//   page = 1;
//   pageSize = 10;
//   public userListData: any = [];
//   public isButtonDisabled = true;
//   identitiesData: any = [];
//   identitiesData2: any = [];
//   lang: any;
//   apiTrue: boolean = true;
//   getEnglishLang: any = [];
//   getSpanishLang: any = [];
//   maxsize: number;
//   isDesc: boolean = false;
//   public selectedId: any;
//   selectedIdentitiesUsername: any;
//   selectedIdentitiesPassword: any;
//   preferenceLang: any;
//   getId: any = [];
//   identities: any;

//   constructor(private router: Router,
//     private dbService: NgxIndexedDBService,
//     private route: ActivatedRoute,
//     private loginService: LoginService,
//     public translate: TranslateService) {

//   }

//   ngOnInit() {
//     this.lang = localStorage.getItem('lang');
//     if (this.lang) {
//       this.translate.setDefaultLang(this.lang);
//     } else {
//       this.translate.setDefaultLang('en');
//     }

//     if (localStorage.getItem('preferenceScreen_obj')) {
//       localStorage.removeItem('lang');
//       let getIdiom = JSON.parse(localStorage.getItem('preferenceScreen_obj'));
//       this.preferenceLang = getIdiom[0].Idiom;
//       if (this.preferenceLang) {
//         this.translate.setDefaultLang(this.preferenceLang);
//       } else {
//         this.translate.setDefaultLang('en');
//       }
//     }

//     this.loadPersonalizedparameter();
//     this.getIdentitiesList();
//   }

//   highlightRow(data) {
//     this.selectedId = data.id;

//   }

//   getDetails(val){

//  // this.selectedIdentitiesUsername = val.username;
//     // this.selectedIdentitiesPassword = val.password
//   }

//   pageChanged(event) {
//     this.page = event;
//     //this.selectedId = -1;
//   }

//   searchData(event) {
//     let items = Array.from(this.identitiesData2);

//     let formContainer = [];
//     if (this.searchText !== "") {
//       items.map((formItem) => {
//         if (formItem['nif'].toLowerCase().startsWith(this.searchText.toLowerCase())) {
//           return formContainer.push(formItem)
//         }
//         if (formItem['legalname'].toLowerCase().startsWith(this.searchText.toLowerCase())) {
//           return formContainer.push(formItem)
//         }
//         if (formItem['nifrepresentative'].toLowerCase().startsWith(this.searchText.toLowerCase())) {
//           return formContainer.push(formItem)
//         }
//         if (formItem['representative'].toLowerCase().startsWith(this.searchText.toLowerCase())) {
//           return formContainer.push(formItem)
//         }
//       })
//     }

//     if (this.searchText != '') {
//       this.identitiesData = formContainer;
//     } else {
//       this.identitiesData = this.identitiesData2;
//     }

//     if (event.key === "Enter" || event.type == "click") {
//       this.page = 1;
//     }
//     else {
//       this.page = 1;
//     }
//   }

//   // mountingIdentites() {
//   //   let data = {
//   //     "username": this.selectedIdentitiesUsername,
//   //     "password": this.selectedIdentitiesPassword
//   //   }
//   //   this.loginService.mountIdentities(data).subscribe(
//   //     data => {
//   //       if (data && data.status_code == 200) {
//   //         // console.log(data);

//   //       } else {

//   //       }
//   //     },
//   //     error => {
//   //       console.log(error);
//   //       // this.showError(error);
//   //     },
//   //     () => {

//   //     })
//   // }

//   mountingIdentites() {
//     this.loginService.mountIdentities().subscribe(
//       data => {
//         if (data && data.status_code == 200) {
//           // console.log(data);
//         } else {
//         }
//       },
//       error => {
//         console.log(error);
//         // this.showError(error);
//       },
//       () => {

//       })
//   }

//   changeButtonStatus() {
//     this.isButtonDisabled = false;
//   }

//   mount() {
//     //console.log( this.selectedIdentitiesUsername, this.selectedIdentitiesPassword);
//     this.mountingIdentites();
//   }

//   logoutFunc() {
//     this.loginService.logout().subscribe(
//       data => {
//         if (data && data.status_code == 200) {
//           localStorage.removeItem('spanish');
//           localStorage.removeItem('lang');
//           localStorage.removeItem('english');
//           localStorage.removeItem('token');
//           localStorage.removeItem('username');
//           localStorage.removeItem('preferenceScreen_obj');
//           this.dbService.clear('loggedInUser').then(
//             () => {
//               this.router.navigate(['/splashPage']);
//             },
//             error => {
//               console.log(error);
//             }
//           );
//         }
//       },
//       error => {
//         console.log(error);
//         // this.showError(error);
//       },
//       () => {

//       }
//     );
//   }

//   getIdentitiesList() {
//     this.loginService.getIdentities().subscribe(
//       data => {
//         //console.log(data,"identity");

//         if (data && data.status_code == 200) {
//           this.identities = data.data.identities;
//           for (let val of this.identities) {
//             this.getId.push(val.id);
//             this.identitiesData.push(val);
//             this.identitiesData2.push(val);
//             // this.identitiesData2.push(val.certificates[0]);
//           }

//         }
//       },
//       error => {
//         console.log(error);
//         // this.showError(error);
//       },
//       () => {

//       })
//   }

//   loadPersonalizedparameter() {
//     this.loginService.getPersonalizesParameterSetup().subscribe(
//       data => {
//         if (data && data.status_code == 200) {
//           this.apiTrue = true;
//           this.getEnglishLang = data.data.lang.en;
//           this.getSpanishLang = data.data.lang.es;
//           let parameterEn = data.data.lang.en;
//           let parameterEs = data.data.lang.es;
//           localStorage.setItem("english", JSON.stringify(parameterEn));
//           localStorage.setItem("spanish", JSON.stringify(parameterEs))
//         } else {
//           this.apiTrue = false;
//         }
//       },
//       error => {
//         console.log(error);
//         // this.showError(error);
//       },
//       () => {

//       })
//   }

//   sort(property) {
//     this.isDesc = !this.isDesc; //change the direction
//     //this.column = property;
//     let direction = this.isDesc ? 1 : -1;

//     this.identitiesData.sort(function (a, b) {
//       if (a[property] < b[property]) {
//         return -1 * direction;
//       }
//       else if (a[property] > b[property]) {
//         return 1 * direction;
//       }
//       else {
//         return 0;
//       }
//     });
//   };

// }

import { Component, OnInit } from "@angular/core";
// import data from '../../../assets/response-data/data'
import { Router, ActivatedRoute } from "@angular/router";
import { filter } from "rxjs/operators";
import { FormsModule } from "@angular/forms";
import { TranslateService } from "@ngx-translate/core";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { LoginService } from "src/app/service/login.service";
import { NgxSpinnerService } from "ngx-spinner";

@Component({
  selector: "app-identities-explorer",
  templateUrl: "./identities-explorer.component.html",
  styleUrls: ["./identities-explorer.component.css"],
})
export class IdentitiesExplorerComponent implements OnInit {
  public customData;
  public searchText = "";
  page = 1;
  pageSize = 10;
  public userListData: any = [];
  public isButtonDisabled = true;
  identitiesData: any = [];
  identitiesData2: any = [];
  lang: any;
  apiTrue: boolean = true;
  getEnglishLang: any = [];
  getSpanishLang: any = [];
  maxsize: number;
  isDesc: boolean = false;
  public selectedId: any;
  selectedIdentitiesUsername: any;
  selectedIdentitiesPassword: any;
  preferenceLang: any;
  getId: any = [];
  identities: any;
  unmountFlag: boolean = false;
  mountFlag: boolean = true;

  constructor(
    private router: Router,
    private dbService: NgxIndexedDBService,
    private route: ActivatedRoute,
    private spinner: NgxSpinnerService,
    private loginService: LoginService,
    public translate: TranslateService
  ) {}

  ngOnInit() {
    this.lang = localStorage.getItem("lang");
    if (this.lang) {
      this.translate.setDefaultLang(this.lang);
    } else {
      this.translate.setDefaultLang("en");
    }

    if (localStorage.getItem("preferenceScreen_obj")) {
      localStorage.removeItem("lang");
      let getIdiom = JSON.parse(localStorage.getItem("preferenceScreen_obj"));
      this.preferenceLang = getIdiom[0].Idiom;
      if (this.preferenceLang) {
        this.translate.setDefaultLang(this.preferenceLang);
      } else {
        this.translate.setDefaultLang("en");
      }
    }

    this.loadPersonalizedparameter();
    this.getIdentitiesList();
  }

  highlightRow(i) {
    this.selectedId = i;
    console.log(this.selectedId);
  }

  getDetails(val) {
    // this.selectedIdentitiesUsername = val.username;
    // this.selectedIdentitiesPassword = val.password
  }

  pageChanged(event) {
    this.page = event;
    this.selectedId = -1;
  }

  searchData(event) {
    let items = Array.from(this.identitiesData2);

    let formContainer = [];
    if (this.searchText !== "") {
      items.map((formItem) => {
        if (
          formItem["nif"]
            .toLowerCase()
            .startsWith(this.searchText.toLowerCase())
        ) {
          return formContainer.push(formItem);
        }
        if (
          formItem["legalname"]
            .toLowerCase()
            .startsWith(this.searchText.toLowerCase())
        ) {
          return formContainer.push(formItem);
        }
        if (
          formItem["nifrepresentative"]
            .toLowerCase()
            .startsWith(this.searchText.toLowerCase())
        ) {
          return formContainer.push(formItem);
        }
        if (
          formItem["representative"]
            .toLowerCase()
            .startsWith(this.searchText.toLowerCase())
        ) {
          return formContainer.push(formItem);
        }
      });
    }

    if (this.searchText != "") {
      this.identitiesData = formContainer;
    } else {
      this.identitiesData = this.identitiesData2;
    }

    if (event.key === "Enter" || event.type == "click") {
      this.page = 1;
    } else {
      this.page = 1;
    }
  }

  mountingIdentites() {
    this.spinner.show();
    this.loginService
      .mountIdentities({
        CertficateName: "/Users/agsuser/out.cer",
        UserName: "own-b01835461@dehonline",
        passphrase: "12345678",
      })
      .subscribe(
        (data) => {
          if (data && data.state == "Ok") {
            this.loginService
              .InstallCertificate({ cert: "/Users/agsuser/out.cer" })
              .subscribe(
                (data) => {
                  if (data && data.state == "Ok") {
                    this.spinner.hide();
                    this.unmountFlag = true;
                    this.mountFlag = false;
                    localStorage.setItem("unmount", JSON.stringify(true));
                    alert("Certificate Mounted..");
                  } else {
                  }
                },
                (error) => {
                  console.log(error);
                },
                () => {}
              );
          } else {
          }
        },
        (error) => {
          this.spinner.hide();
          console.log(error);
        },
        () => {}
      );
  }

  unmountingIdentites() {
    this.spinner.show();
    this.loginService
      .UnInstallCertificate({
        CertficateName: "D:\\DEH\\Upload\\out.cer",
        UserName: "own-b01835461@dehonline",
        passphrase: "12345678",
      })
      .subscribe(
        (data) => {
          if (data && data.state == "Ok") {
            this.spinner.hide();
            this.unmountFlag = false;
            this.mountFlag = true;
            localStorage.setItem("unmount", JSON.stringify(false));
            alert("Certificate Unmounted..");
          }
        },
        (error) => {
          this.spinner.hide();
          console.log(error);
        },
        () => {}
      );
  }

  changeButtonStatus() {
    this.isButtonDisabled = false;
  }

  mount() {
    this.mountingIdentites();

    //console.log( this.selectedIdentitiesUsername, this.selectedIdentitiesPassword);
  }

  unmount() {
    this.unmountingIdentites();
  }

  logoutFunc() {
    this.spinner.show();
    this.loginService.logout().subscribe(
      (data) => {
        this.spinner.hide();
        if (data && data.status_code == 200) {
          localStorage.removeItem("spanish");
          localStorage.removeItem("lang");
          localStorage.removeItem("english");
          localStorage.removeItem("token");
          localStorage.removeItem("username");
          localStorage.removeItem("preferenceScreen_obj");
          this.dbService.clear("loggedInUser").then(
            () => {
              this.router.navigate(["/splashPage"]);
            },
            (error) => {
              console.log(error);
            }
          );
        }
      },
      (error) => {
        console.log(error);
        // this.showError(error);
      },
      () => {}
    );
  }

  getIdentitiesList() {
    this.spinner.show();
    this.loginService.getIdentities().subscribe(
      (data) => {
        //console.log(data,"identity");
        this.spinner.hide();
        if (data && data.status_code == 200) {
          this.identities = data.data.identities[0].certificates;
          for (let val of this.identities) {
            this.getId.push(val.id);
            this.identitiesData.push(val);
            this.identitiesData2.push(val);
            // this.identitiesData2.push(val.certificates[0]);
          }

          if (localStorage.getItem("unmount") === JSON.stringify(true)) {
            this.mountFlag = false;
            this.unmountFlag = true;
          }
        }
      },
      (error) => {
        console.log(error);
        // this.showError(error);
      },
      () => {}
    );
  }

  loadPersonalizedparameter() {
    this.loginService.getPersonalizesParameterSetup().subscribe(
      (data) => {
        if (data && data.status_code == 200) {
          this.apiTrue = true;
          this.getEnglishLang = data.data.lang.en;
          this.getSpanishLang = data.data.lang.es;
          let parameterEn = data.data.lang.en;
          let parameterEs = data.data.lang.es;
          localStorage.setItem("english", JSON.stringify(parameterEn));
          localStorage.setItem("spanish", JSON.stringify(parameterEs));
        } else {
          this.apiTrue = false;
        }
      },
      (error) => {
        console.log(error);
        // this.showError(error);
      },
      () => {}
    );
  }

  sort(property) {
    this.isDesc = !this.isDesc; //change the direction
    //this.column = property;
    let direction = this.isDesc ? 1 : -1;

    this.identitiesData.sort(function (a, b) {
      if (a[property] < b[property]) {
        return -1 * direction;
      } else if (a[property] > b[property]) {
        return 1 * direction;
      } else {
        return 0;
      }
    });
  }
}
