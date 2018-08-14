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
  }

  ngOnInit() {
  }

}
