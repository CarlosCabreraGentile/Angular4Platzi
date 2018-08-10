import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Headers } from "@angular/http";
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

  public getBussiness() {
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

  /**
   * Create a new business
   * @param negocio 
   */
  public postNegocio(negocio) {
    const subject = new Subject<any>();
    this.apiService.httpPost('/negocios.json', negocio);

    // return subject.asObservable();
  }

  public guardarNegocioEditado(negocio) {
    this.angularFireBase.database.ref('negocios/' + negocio.id).set(negocio);
  }

  public obtenerGeoData(direccion) {
    direccion = direccion.replace(' ', '+');
  }

}
