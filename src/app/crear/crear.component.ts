import { Component, OnInit } from '@angular/core';
import { LugaresService } from '../services/lugares.services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  negocio: any = {};
  id: any = null;

  constructor(private lugaresService: LugaresService, private route: ActivatedRoute) { 
    this.id = this.route.snapshot.params['id'];
    // debugger
   
  }

  ngOnInit() {
    if(this.id != 'new'){
      this.lugaresService.getNegocio(this.id)
        .subscribe((negocio) => { //con el get de http se le quita el valueChanges() al subscribe
          // debugger;
          this.negocio = negocio;
        });
    }
  }

  guardarNegocio() {
    let direccion = this.negocio.calle + ',' + this.negocio.ciudad + ',' + this.negocio.pais;

    /*
    this.lugaresService.obtenerGeoData(direccion)
      .subscribe((result) => {
        // debugger;
        this.negocio.lat = result.json().results[0].geometry.location.lat;
        this.negocio.lng = result.json().results[0].geometry.location.lng;
        
        if(this.id != 'new'){
          this.lugaresService.guardarNegocioEditado(this.negocio);
          alert('Negocio Editado');
        }
        else{
        this.negocio.id = Date.now();
        this.lugaresService.guardarNegocioNuevo(this.negocio);
        alert('Negocio Guardado');
        }
        this.negocio = {};
      });
      */
  }

}
