
import { Injectable } from "@angular/core";
import {
  HttpInterceptor,
  HttpEvent,
  HttpHandler,
  HttpRequest,
  HttpResponse,
  HttpErrorResponse
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { Router } from "@angular/router";
import "rxjs/add/operator/map";
import "rxjs/add/operator/do";
import { finalize } from 'rxjs/operators';
import { catchError } from 'rxjs/operators';
// // import * as constants from './app.constants';

/**
 * Http Interceptor , keep track on each api execution
 * executed before api call
 * create injectable class , include it in app.module.ts in provider = "set
    provide: HTTP_INTERCEPTORS,
    useClass: AppHttpInterceptor,
    multi: true" attributes
 *
 */
@Injectable()
export class AppHttpInterceptor implements HttpInterceptor {

  // public openApis: any = constants.openApis;
  constructor(private router: Router) {

  }



//   /**
//    * intercept method will run before http call sent
//    * @param req Http Request
//    * @param next  HttpHandler , handles all the http requests
//    */
//   intercept(
//     req: HttpRequest<any>,
//     next: HttpHandler
//   ): Observable<HttpEvent<any>> {

//     /** Set auth token , common headers here */

//     /* let openApiFlag = false;
//      for(let api of this.openApis){
//        if(req.url.includes(api)){
//          openApiFlag = true;
//        }
//      }
 
//      //  Set auth token only if api is not open /
//      if(!openApiFlag){
//        const newRequest = req.clone({
//          // set auth token to api here
//          headers: req.headers.set("Authorization", "token YOUR-TOKEN-HERE")
//        });
//      }
//      */



//     /**
//      * you can show common loader here
//      */

//     // return next.handle(req).do(
//     //   (event: HttpEvent<any>) => {
//     //     if (event instanceof HttpResponse) {

//     //       // do stuff with response if you want
//     //       if (event.body.response_code == 201) {
           
//     //         localStorage.removeItem('token');
//     //         setTimeout(() => {
//     //           localStorage.clear();
//     //           this.router.navigate(["signin"]);
//     //         }, 100)
//     //       } 
//     //     }
//     //   },
//     //   (err: any) => {
       
//     //     if (err instanceof HttpErrorResponse) {
    
//     //       if (err.status === 201) {
//     //         // redirect to the login route
//     //         // 
//     //       }
//     //     }
//     //   }
//     // );
//   }

// }


intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(
        catchError(err => {
          if (err instanceof HttpErrorResponse) {
            if (err.statusText === "Unauthorized") {
                console.log("error");
                
                // Invalidate user session and redirect to login/home
            }
  
            // return the error back to the caller
            return throwError(err);
          }
        }),
        finalize(() => {
          // any cleanup or final activities
        })
      );
  }
}