import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LugaresService } from '../services/lugares.services';

@Component({
  selector: 'app-detalle',
  templateUrl: './detalle.component.html',
  styleUrls: ['./detalle.component.css']
})
export class DetalleComponent implements OnInit {
  id: number = null;
  negocio: any = {};

  constructor(private route: ActivatedRoute, private lugaresService :LugaresService) {
    // console.log(this.route.snapshot.params['id']);
    // console.log(this.route.snapshot.queryParams['pato']);
    /*Esta parte con la funcion buscarLugar era para el array local de lugares*/
    // this.id = this.route.snapshot.params['id'];
    // console.log(this.lugaresService.buscarLugar(this.id));
    // this.negocio = this.lugaresService.buscarLugar(this.id);
  }

  ngOnInit() {
  }

}
