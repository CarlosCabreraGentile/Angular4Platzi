import { Component, OnInit } from '@angular/core';
import { LugaresService } from '../services/lugares.services';

@Component({
  selector: 'app-lugares',
  templateUrl: './lugares.component.html',
  styleUrls: ['./lugares.component.css']
})
export class LugaresComponent implements OnInit {
  title = 'Bussiness';
  bussiness = null;
  
  constructor(private lugaresService: LugaresService) { 
    lugaresService.getBussiness() 
      .subscribe(
        (data: any) => {
          this.bussiness = data;
        },
        (err: any) => {
          console.log(err);
        }
      )
  }

  ngOnInit() {
  }
}
