import { Component, OnInit, ViewChild, ElementRef } from "@angular/core";
// import data from '../../../assets/response-data/data'
import { Router, ActivatedRoute } from "@angular/router";
import { TranslateService } from "@ngx-translate/core";
import { NgxIndexedDBService } from "ngx-indexed-db";
import { LoginService } from "src/app/service/login.service";
import {
  NgbModal,
  NgbActiveModal,
  ModalDismissReasons,
} from "@ng-bootstrap/ng-bootstrap";
// import * from "electron";
// declare var require: any;

// import { ipcRenderer } from "electron";

@Component({
  selector: "app-splash-page",
  templateUrl: "./splash-page.component.html",
  styleUrls: ["./splash-page.component.css"],
})
export class SplashPageComponent implements OnInit {
  // ipcRenderer: any = require("electron");

  public langFlag = true;
  @ViewChild("autoUpdate", { static: false }) autoUpdate: ElementRef;
  updateAvailbale: boolean = false;
  downloadNow: boolean = false;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    public translate: TranslateService,
    private dbService: NgxIndexedDBService,
    private modalService: NgbModal,
    private loginService: LoginService
  ) {
    // translate.setDefaultLang('en');
  }

  ngOnInit() {
    // console.log(this.ipcRenderer);
    let lang = localStorage.getItem("lang");
    if (lang) {
      this.translate.setDefaultLang(lang);
    } else {
      this.translate.setDefaultLang("en");
    }

    if (localStorage.getItem("preferenceScreen_obj")) {
      let getIdiom = JSON.parse(localStorage.getItem("preferenceScreen_obj"));
      let preferenceLang = getIdiom[0].Idiom;
      if (preferenceLang) {
        this.translate.setDefaultLang(preferenceLang);
      } else {
        this.translate.setDefaultLang("en");
      }
    }

    // this.loadPersonalizedparameter();
    // this.getLang();
    this.updateCall();
  }

  updateCall() {
    // console.log(ipcRenderer);
    //   this._ipc.send("app_version");
    //   // ipcRenderer.on("app_version", (event, arg) => {
    //   //   ipcRenderer.removeAllListeners("app_version");
    //   // });
    //   // const notification = document.getElementById("notification");
    //   // const message = document.getElementById("message");
    //   // const restartButton = document.getElementById("restart-button");
    //   this._ipc.on("update_available", () => {
    //     this._ipc.removeAllListeners("update_available");
    //     this.updateAvailbale = true;
    //     this.downloadNow = false;
    //     // message.innerText = "A new update is available. Downloading now...";
    //     // notification.classList.remove("hidden");
    //   });
    //   this._ipc.on("update_downloaded", () => {
    //     this._ipc.removeAllListeners("update_downloaded");
    //     this.downloadNow = true;
    //     this.updateAvailbale = false;
    //     // message.innerText =
    //     //   "Update Downloaded. It will be installed on restart. Restart now?";
    //     // restartButton.classList.remove("hidden");
    //     // notification.classList.remove("hidden");
    //   });
  }

  closeNotification() {
    // notification.classList.add("hidden");
  }
  restartApp() {
    // ipcRenderer.send("restart_app");
  }

  // useLanguage(lang: string) {
  //   localStorage.setItem('lang', lang)
  //   this.translate.use(lang);
  //   if (lang == 'en') {
  //     this.langFlag = true;
  //   }
  //   else if (lang == 'es') {
  //     this.langFlag = false;
  //   }
  // }

  // getLang() {
  //   let lang = localStorage.getItem('lang')
  //   switch (lang) {
  //     case 'en':
  //       this.langFlag = true;
  //       break;
  //     case 'es':
  //       this.langFlag = false;
  //       break;
  //     default:
  //       break;
  //   }
  // }

  login() {
    // console.log("click");
    // this.router.navigate(['../home'], {relativeTo :this.route });
    this.router.navigate(["/home"]);
  }
}
