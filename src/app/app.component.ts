import { Component } from '@angular/core';
import { AutorizacionService } from './services/autorizacion.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  loggedIn:boolean = false;
  email = null;

  constructor(private autorizacionService: AutorizacionService) {
    this.autorizacionService.isLogged()
    .subscribe((result) => {
      if(result && result.uid){
        this.loggedIn = true;
        this.email = autorizacionService.getEmail();
      }
      else {
        this.loggedIn = false;
      }
    }),
    (error) => {
      this.loggedIn = false;
    }
  }

  logoutButton(){
    this.autorizacionService.logout();
  }
}

