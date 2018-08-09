import { Component, OnInit } from '@angular/core';
import { LugaresService } from '../services/lugares.services';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css']
})
export class LugaresComponent implements OnInit {
  title = 'Negocios';
  listo: boolean = false;
  nombre: string = '';
  lat: number = 39.045041;
  lng: number = 1.482308;
  negocios = null;
  
  constructor(private lugaresService: LugaresService) {
    lugaresService.getNegocios()
      .valueChanges().subscribe((negocios) => {
        this.negocios = negocios;
      });
    // console.dir('LugaresComponent');
    // setTimeout(() => {
    //   this.listo = true;
    // }, 3000);
  }
  
  ngOnInit() {
  }

  // hacerAlgo(){
  //   alert('Haciendo algo');
  // }

}
