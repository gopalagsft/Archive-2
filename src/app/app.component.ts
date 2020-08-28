import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'deh-app';
  constructor(private dbService: NgxIndexedDBService,

    private router: Router
  ) {


  }

  storageChange = event => {

    if (event.storageArea.length === 0) {
      if (event.key === null || event.key == "token") {
        if (
          localStorage.getItem("token") !== undefined ||
          localStorage.getItem("token") !== null
        ) {
          // window.close();
          this.router.navigate(["/splashPage"]);
          this.dbService.clear('loggedInUser').then(
            () => {
              this.router.navigate(['/splashPage']);
            },
            error => {
              console.log(error);
            }
          );
          
        }
        
      }
    }

  };


  ngOnInit() {
    window.addEventListener("storage", this.storageChange, false);
  }

}
