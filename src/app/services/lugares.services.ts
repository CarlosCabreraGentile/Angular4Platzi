import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
import { Http, Headers } from "@angular/http";
import { environment } from "../../environments/environment";
import { ApiService } from "./api.service";
import { Subject } from "rxjs";
import { HelperService } from "./helper.service";
import Negocio from "../models/negocio.interface";

@Injectable()

export class LugaresService{


  /*Array Local*/
    // negocios: Array<any> = [
    //     {id: 1, plan: 'pagado', cercania: 1, distancia: 1, active: true, nombreEmpresa : 'Flor', description: 'Esto es una floreria'},
    //     {id: 2, plan: 'pagado', cercania: 3, distancia: 5, active: true, nombreEmpresa : 'Pan', description: 'Esto es una panaderia'},
    //     {id: 3, plan: 'pagado', cercania: 2, distancia: 6, active: true, nombreEmpresa : 'Perro', description: 'Esto es una veterinaria'},
    //     {id: 4, plan: 'gratuito', cercania: 3, distancia: 1.8, active: true, nombreEmpresa : 'Loncho', description: 'Esto es algo que no se sabe'},
    //     {id: 5, plan: 'gratuito', cercania: 3, distancia: 1.8, active: true, nombreEmpresa : 'Loncho2', description: 'Esto es algo que no se sabe'}
    //   ];

      constructor(private angularFireBase: AngularFireDatabase, private apiService: ApiService) {
        
      }

      public getNegocios() {
        const subject = new Subject<any>();
        this.apiService.httpGet('/negocios.json')
          .subscribe(
            (data: any) => {
              const negocios = HelperService.fromObjectToArray(data);
              // debugger
              // TODO Convert Object to array
              subject.next(negocios);
            },
            (err: any) => {
              subject.error(err);
            }
          )

          return subject.asObservable();


          // return this.negocios;
          // return this.angularFireBase.list('negocios/');
          //llamada a la API de fire base y pidiendo datos
      }

      /*Esta funcion sirve para el array local*/
      // public buscarLugar(id: number): Array<Object> {
      //   return this.negocios.filter((negocio) => {
      //     return negocio.id == id;
      //   })[0] || null;//filter siempre devuelve un arreglo,
      //   //por eso ahora se le pide la primera posicion
      //   //en ese arreglo tengo un objeto JSON de negocio
      // }

      public guardarNegocioNuevo(negocio){
        // console.log(negocio);
        this.angularFireBase.database.ref('negocios/' + negocio.id).set(negocio); //USANDO SOCKET
       /*Con la forma de abajo se usa mediante HTTP */
        const headers = new Headers({"Content-Type": "application/json"});
        // return this.http.post(this.API_ENDPOINT + '/negocios.json', negocio, {headers: headers});
      }

      public guardarNegocioEditado(negocio){
        // console.log(negocio);
        this.angularFireBase.database.ref('negocios/' + negocio.id).set(negocio);
      }

      public obtenerGeoData(direccion){
        direccion = direccion.replace(' ', '+');
        // return this.http.get(`https://maps.google.com/maps/api/geocode/json?address=${direccion}&key=${environment.GOOGLE_GEOCODE_API_KEY}`);
      }

      public getNegocio(id){
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

}
