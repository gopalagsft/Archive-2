// import { Injectable } from '@angular/core';
// import { HttpClient, HttpHeaders, HttpRequest, HttpErrorResponse } from '@angular/common/http';
// import { catchError } from 'rxjs/operators';
// import { Observable, of, throwError } from 'rxjs';
// import { environment } from '../../environments/environment';
// import * as serviceUrls from '../shared/globals/serviceUrls';
// import { SignIn } from '../shared/model/signIn';
// import { Router } from '@angular/router';
// import { NgxIndexedDBService } from 'ngx-indexed-db';

// @Injectable({
//   providedIn: 'root'
// })
// export class LoginService {

//   public httpOptions;
//   public token: any;
//   constructor(private http: HttpClient,private router: Router, private dbService: NgxIndexedDBService,) {
//     this.token = localStorage.getItem('token');
//     if (this.token) {
//       this.httpOptions = {
//         headers: new HttpHeaders({
//           'Content-Type': 'application/json',
//           'X-AuthToken': localStorage.getItem('token')
//         })
//       };
//     }
//   }

//   /**
// * Handle Http operation that failed.
// * Let the app continue.
// * @param operation - name of the operation that failed
// * @param result - optional value to return as the observable result
// */
//   private handleError<T>(operation = 'operation', result?: T) {
//     return (error: any): Observable<T> => {

//       // TODO: send the error to remote logging infrastructure
//       console.error('Service error: ', error); // log to console instead

//       // TODO: better job of transforming error for user consumption
//       console.log(`${operation} failed: ${error.message}`);

//      if(error.error.message == "otp_failed"){
//         localStorage.setItem('otp_failed', JSON.stringify(true));
//      }
//      if(error.error.message == "otp_expired"){
//       localStorage.setItem('otp_expired', JSON.stringify(true));
//     }
//       if(error.error.message == "otp_invalid"){
//         localStorage.setItem('otp_invalid', JSON.stringify(true));
//      }

//      if(error.status === 401){
//        localStorage.clear();
//        this.dbService.clear('loggedInUser').then(
//         () => {
//           this.router.navigate(['/splashPage']);
//         },
//         error => {
//           console.log(error);
//         }
//       );
//        this.router.navigate(['/home'])

//      }

//       // Let the app keep running by returning an empty result.
//       return of(result as T);
//     };
//   }

//   /** POST: login data to the server */

//   login(signIn: SignIn): Observable<any> {
//     return this.http.post('https://cwa.deh.host/v1/auth/'+ serviceUrls.loginUrl, signIn, {}).pipe(
//       catchError(this.handleError<any>('login'))
//     );
//   }

//   logout(): Observable<any> {
//       let httpOptions1 = {
//         headers: new HttpHeaders({
//           'Content-Type': 'application/json',
//           'Authorization': 'Bearer ' + localStorage.getItem('token')
//         })
//       };

//     return this.http.post('https://cwa.deh.host/v1/auth/' + serviceUrls.logoutUrl, {}, httpOptions1).pipe(
//       catchError(this.handleError<any>('logout'))
//     );
//   }

//   twoFa(_2faCode): Observable<any>{
//     let httpOptions1 = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + localStorage.getItem('token')
//       })
//     };
//     return this.http.post('https://cwa.deh.host/v1/auth/'+ serviceUrls.twoFaUrl, _2faCode, httpOptions1).pipe(
//       catchError(this.handleError<any>('twoFA'))
//     );
//   }

//   getIdentities(){
//     let httpOptions1 = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + localStorage.getItem('token')
//       })
//     };
//     return this.http.get('https://cwa.deh.host/v1/user/'+ serviceUrls.identitiesUrl, httpOptions1).pipe(
//       catchError(this.handleError<any>('identities'))
//     );
//   }

//   getPersonalizesParameterSetup(){
//     let httpOptions1 = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + localStorage.getItem('token')
//       })
//     };
//     return this.http.get('https://cwa.deh.host/v1/user/'+ serviceUrls.personalizedParameterSetupUrl, httpOptions1).pipe(
//       catchError(this.handleError<any>('setup'))
//     );
//   }

//   // getData(): Observable<any> {
//   //   return this.http.get(`assets/response-data/custom.json`, this.httpOptions).pipe(catchError(this.handleError));
//   // }

//   forgotPassword(username:any): Observable<any> {
//     let httpOptions1 = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + localStorage.getItem('token')
//       })
//     };
//   return this.http.post('https://cwa.deh.host/v1/auth/' + serviceUrls.forgotPasswordUrl, username,httpOptions1).pipe(
//     catchError(this.handleError<any>('forgotPassword'))
//   );
// }

//   // mountIdentities(data): Observable<any> {
//   //   let body = data;
//   //   let httpOptions1 = {
//   //     headers: new HttpHeaders({
//   //       'Content-Type': 'application/json',
//   //       'Authorization': 'Bearer ' + localStorage.getItem('token')
//   //     })
//   //   };
//   //   return this.http.post('api/deh/' + serviceUrls.mountIdentitesdUrl, body,httpOptions1).pipe(
//   //     catchError(this.handleError<any>('mountIdentities'))
//   //   );
//   // }

//   mountIdentities(): Observable<any> {
//     let body = {
//       "key":"outpurtprivate.key",
//       "cert":"out.cer",
//       "passphrase":"12345678",
//       "out":"angularpass.p12"
//     }
//     let httpOptions1 = {
//       headers: new HttpHeaders({
//         'Content-Type': 'application/json',
//         'Authorization': 'Bearer ' + localStorage.getItem('token')
//       })
//     };

//     return this.http.post('http://localhost:3000/' + serviceUrls.mountIdentitesdUrl, body, httpOptions1).pipe(
//       catchError(this.handleError<any>('mountIdentities'))
//     );
//   }

// }

import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpHeaders,
  HttpRequest,
  HttpErrorResponse,
} from "@angular/common/http";
import { catchError } from "rxjs/operators";
import { Observable, of, throwError } from "rxjs";
import { environment } from "../../environments/environment";
import * as serviceUrls from "../shared/globals/serviceUrls";
import { SignIn } from "../shared/model/signIn";
import { Router } from "@angular/router";
import { NgxIndexedDBService } from "ngx-indexed-db";

@Injectable({
  providedIn: "root",
})
export class LoginService {
  public httpOptions;
  public token: any;
  constructor(
    private http: HttpClient,
    private router: Router,
    private dbService: NgxIndexedDBService
  ) {
    this.token = localStorage.getItem("token");
    if (this.token) {
      this.httpOptions = {
        headers: new HttpHeaders({
          "Content-Type": "application/json",
          "X-AuthToken": localStorage.getItem("token"),
        }),
      };
    }
  }

  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T>(operation = "operation", result?: T) {
    return (error: any): Observable<T> => {
      // TODO: send the error to remote logging infrastructure
      console.error("Service error: ", error); // log to console instead

      // TODO: better job of transforming error for user consumption
      console.log(`${operation} failed: ${error.message}`);

      if (error.error.message == "otp_failed") {
        localStorage.setItem("otp_failed", JSON.stringify(true));
      }
      if (error.error.message == "otp_expired") {
        localStorage.setItem("otp_expired", JSON.stringify(true));
      }
      if (error.error.message == "otp_invalid") {
        localStorage.setItem("otp_invalid", JSON.stringify(true));
      }

      if (error.status === 401) {
        localStorage.clear();
        this.dbService.clear("loggedInUser").then(
          () => {
            this.router.navigate(["/splashPage"]);
          },
          (error) => {
            console.log(error);
          }
        );
        this.router.navigate(["/home"]);
      }

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  /* POST: login data to the server */

  login(signIn: SignIn): Observable<any> {
    return this.http
      .post("https://cwa.deh.host/v1/auth/" + serviceUrls.loginUrl, signIn, {})
      .pipe(catchError(this.handleError<any>("login")));
  }

  logout(): Observable<any> {
    let httpOptions1 = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      }),
    };

    return this.http
      .post(
        "https://cwa.deh.host/v1/auth/" + serviceUrls.logoutUrl,
        {},
        httpOptions1
      )
      .pipe(catchError(this.handleError<any>("logout")));
  }

  twoFa(_2faCode): Observable<any> {
    let httpOptions1 = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      }),
    };
    return this.http
      .post(
        "https://cwa.deh.host/v1/auth/" + serviceUrls.twoFaUrl,
        _2faCode,
        httpOptions1
      )
      .pipe(catchError(this.handleError<any>("twoFA")));
  }

  getIdentities() {
    let httpOptions1 = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      }),
    };
    return this.http
      .get(
        "https://cwa.deh.host/v1/user/" + serviceUrls.identitiesUrl,
        httpOptions1
      )
      .pipe(catchError(this.handleError<any>("identities")));
  }

  getPersonalizesParameterSetup() {
    let httpOptions1 = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      }),
    };
    return this.http
      .get(
        "https://cwa.deh.host/v1/user/" +
          serviceUrls.personalizedParameterSetupUrl,
        httpOptions1
      )
      .pipe(catchError(this.handleError<any>("setup")));
  }

  // getData(): Observable<any> {
  //   return this.http.get(`assets/response-data/custom.json`, this.httpOptions).pipe(catchError(this.handleError));
  // }

  forgotPassword(username: any): Observable<any> {
    let httpOptions1 = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("token"),
      }),
    };
    return this.http
      .post(
        "https://cwa.deh.host/v1/auth/" + serviceUrls.forgotPasswordUrl,
        username,
        httpOptions1
      )
      .pipe(catchError(this.handleError<any>("forgotPassword")));
  }

  // mountIdentities(data): Observable<any> {
  //   let body = data;
  //   let httpOptions1 = {
  //     headers: new HttpHeaders({
  //       'Content-Type': 'application/json',
  //       'Authorization': 'Bearer ' + localStorage.getItem('token')
  //     })
  //   };
  //   return this.http.post('api/deh/' + serviceUrls.mountIdentitesdUrl, body,httpOptions1).pipe(
  //     catchError(this.handleError<any>('mountIdentities'))
  //   );
  // }

  mountIdentities(body): Observable<any> {
    return this.http.get(
      serviceUrls.APIUrl +
        "api/mount/generatecertificate?CertficateName=" +
        body.CertficateName +
        "&UserName=" +
        body.UserName +
        "&Password=" +
        body.passphrase +
        "&Type=4"
    );
  }

  InstallCertificate(body): Observable<any> {
    let httpOptions1 = {
      headers: new HttpHeaders({
        "Content-Type": "application/json",
      }),
    };

    return this.http
      .post(
        serviceUrls.APIUrl +
          "api/mount/installcertficateinstore?CertificatePath=" +
          body.cert,
        null,
        httpOptions1
      )
      .pipe();
  }

  UnInstallCertificate(body): Observable<any> {
    return this.http.get(
      serviceUrls.APIUrl +
        "api/mount/removecertificate?CertficateName=" +
        body.CertficateName +
        "&UserName=" +
        body.UserName +
        "&Password=" +
        body.passphrase +
        "&Type=4"
    );
  }
}
