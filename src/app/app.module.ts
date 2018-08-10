import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
import { ResaltarDirective } from './directives/resaltar.directive';
import { ContarClicksDirective } from './directives/contarClicks.directive';
import { Routes, RouterModule } from '@angular/router';
import { DetalleComponent } from './detalle/detalle.component';
import { LugaresComponent } from './lugares/lugares.component';
import { ContactoComponent } from './contacto/contacto.component';
import { LugaresService } from './services/lugares.services';

import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule, AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { CrearComponent } from './crear/crear.component';
import { HttpModule } from '@angular/http';
import { environment } from '../environments/environment';
import { ApiService } from './services/api.service';
import { LinkifystrPipe } from './pipes/linkifystr.pipe';
import { LoginComponent } from './login/login.component';
import { RegistroComponent } from './registro/registro.component';

export const firebaseConfig = {
  apiKey: "AIzaSyBmeDwdL7MWFLTc2p1-xYcVEzs3s__gwvA",
  authDomain: "angular4platziapp.firebaseapp.com",
  databaseURL: "https://angular4platziapp.firebaseio.com",
  storageBucket: "angular4platziapp.appspot.com",
  messagingSenderId: "641436142494"

  // apiKey: "AIzaSyBcQQBDOM6DJDLbExeV1NIkvOMqCDMRnRw",
  // authDomain: "angular4platziapp2.firebaseapp.com",
  // databaseURL: "https://angular4platziapp2.firebaseio.com",
  // storageBucket: "angular4platziapp2.appspot.com",
  // messagingSenderId: "1016831324985"

  // apiKey: "AIzaSyCwUkfLH1P-ra4K6QTPoKHkG6WNrEzx9xY",
  // authDomain: "angular4platziapp-212814.firebaseapp.com",
  // databaseURL: "https://angular4platziapp-212814.firebaseio.com",
  // storageBucket: "",
  // messagingSenderId: "519441962064"

}

const appRoutes: Routes = [
  { path: '', component: LugaresComponent },
  { path: 'lugares', component: LugaresComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'login', component: LoginComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'crear/:id', component: CrearComponent },
  { path: 'detalle/:id', component: DetalleComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ResaltarDirective,
    ContarClicksDirective,
    DetalleComponent,
    LugaresComponent,
    ContactoComponent,
    CrearComponent,
    LinkifystrPipe,
    LoginComponent,
    RegistroComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBmeDwdL7MWFLTc2p1-xYcVEzs3s__gwvA'
    }),
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    HttpModule
  ],
  providers: [LugaresService, ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
