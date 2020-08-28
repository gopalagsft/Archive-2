import { Component, OnInit, ViewChild } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgForm } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '../../../../node_modules/@angular/router';
import { SignIn, setPassword } from 'src/app/shared/model/signIn';
import { NgxIndexedDBService } from 'ngx-indexed-db';


@Component({
  selector: 'app-set-password',
  templateUrl: './set-password.component.html',
  styleUrls: ['./set-password.component.css']
})
export class SetPasswordComponent implements OnInit {

  public newPassword: any;
  public confirmPassword: any;
  public isValidFormSubmitted: any;
  public passwordMatch = true;
  public token: any;
  public check: any;
  public message: any;
  @ViewChild('setPasswordForm', { static: false }) form: NgForm;
  public model: setPassword;

  constructor(private translate: TranslateService, private dbService: NgxIndexedDBService, private route: ActivatedRoute, private router: Router) {
    this.token = route.snapshot.params.id;
    this.model = new setPassword();
  }

  ngOnInit() {
    let lang = localStorage.getItem('lang');
    if (lang) {
      this.translate.setDefaultLang(lang);
    } else {
      this.translate.setDefaultLang('en');
    }
  }


  passwordCheck() {
    if (this.model.newPassword != '' && this.model.confirmPassword != '' && this.model.newPassword != undefined && this.model.confirmPassword != undefined && this.model.newPassword == this.model.confirmPassword) {
      this.passwordMatch = true;

    } else if (this.model.newPassword != '' && this.model.confirmPassword != '' && this.model.newPassword != undefined && this.model.confirmPassword != undefined) {
      this.passwordMatch = false;
    }
    else {
      this.passwordMatch = true;
    }
  }


  setPassword(form: NgForm) {

    this.model = form.value;

    this.isValidFormSubmitted = false;
    if (form.invalid) {
      return;
    }


    let stroredUsername = localStorage.getItem('username');


    this.dbService.getByKey('users', 1).then(
      user => {
        let fetchData = user;
        for (let singleUser of fetchData) {
          if (singleUser !== undefined &&  stroredUsername == singleUser.username) {
            singleUser.password = this.model.newPassword;
            this.dbService.delete('users', 1).then(
              () => {
                this.dbService.add('users', fetchData).then(
                  () => {
                    this.router.navigate(['/resetPassword']);
                      // Do something after the value was added
                  },
                  error => {
                      console.log(error);
                  }
              );
                  // Do something after delete
              },
              error => {
                  console.log(error);
              }
          );
           
          } else {
            this.router.navigate(['/home']);
          }
        }
      },
      error => {
        console.log(error);
      }
    );





  }



}
