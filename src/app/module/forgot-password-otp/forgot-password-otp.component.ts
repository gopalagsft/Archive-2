import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { forgotPasswordOtp } from '../../shared/model/signIn';

@Component({
  selector: 'app-forgot-password-otp',
  templateUrl: './forgot-password-otp.component.html',
  styleUrls: ['./forgot-password-otp.component.css']
})
export class ForgotPasswordOtpComponent implements OnInit {

  public sentOtp: number = 5555;
  public model: forgotPasswordOtp;
  constructor(private translate: TranslateService,
     private router: Router,
     
     ) {
      this.model = new forgotPasswordOtp();
      }

  ngOnInit() {
  }

  verifiedOtp(form){

    if(form.invalid){
      return;
    }
    this.model = form.value;

    if(this.model.otp == this.sentOtp){
      this.router.navigate(['/setPassword']);
    }
    else{
      alert("Entered Password invalid, please resend OTP again")
      this.router.navigate(['/forgotPasswordOtp']);
    }

  }

}
