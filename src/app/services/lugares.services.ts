import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Http, Headers } from "@angular/http";
import { environment } from "../../environments/environment";
import { ApiService } from "./api.service";
import { Subject } from "rxjs";
import { HelperService } from "./helper.service";
import Negocio from "../models/negocio.interface";

@Injectable()

export class LugaresService {

  constructor(private angularFireBase: AngularFireDatabase, private apiService: ApiService) {

  }

  public getNegocio(id) {
    const subject = new Subject<any>();
    debugger
    this.apiService.httpGet(`/negocios/${id}.json`)
      .subscribe(
        (data: Negocio) => {
          subject.next(data);
        },
        (err: any) => {
          subject.error(err);
        }
      )
    return subject.asObservable();
  }

  public getNegocios() {
    const subject = new Subject<any>();
    this.apiService.httpGet('/negocios.json')
      .subscribe(
        (data: any) => {
          const negocios = HelperService.fromObjectToArray(data);
          subject.next(negocios);
        },
        (err: any) => {
          subject.error(err);
        }
      )
    return subject.asObservable();
  }

  // if(this.id != 'new'){
  //   this.lugaresService.guardarNegocioEditado(this.negocio);
  //   alert('Negocio Editado');
  // }
  // else{
  // this.negocio.id = Date.now();
  // this.lugaresService.guardarNegocioNuevo(this.negocio);
  // alert('Negocio Guardado');
  // }
  // this.negocio = {};

  public postNegocio(negocio) {
    const subject = new Subject<any>();
    this.apiService.httpPost('/negocios.json', negocio);

    // return subject.asObservable();
  }

  public guardarNegocioNuevo(negocio) {
    // console.log(negocio);
    this.angularFireBase.database.ref('negocios/' + negocio.id).set(negocio); //USANDO SOCKET
    /*Con la forma de abajo se usa mediante HTTP */
    const headers = new Headers({ "Content-Type": "application/json" });
    // return this.http.post(this.API_ENDPOINT + '/negocios.json', negocio, {headers: headers});
  }

  public guardarNegocioEditado(negocio) {
    // console.log(negocio);
    this.angularFireBase.database.ref('negocios/' + negocio.id).set(negocio);
  }

  public obtenerGeoData(direccion) {
    direccion = direccion.replace(' ', '+');
    // return this.http.get(`https://maps.google.com/maps/api/geocode/json?address=${direccion}&key=${environment.GOOGLE_GEOCODE_API_KEY}`);
  }

}
