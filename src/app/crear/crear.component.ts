import { Component, OnInit } from '@angular/core';
import { LugaresService } from '../services/lugares.services';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {
  bussiness: any = {};
  id: any = null; 

  constructor(private lugaresService: LugaresService, private route: ActivatedRoute) {
    this.id = this.route.snapshot.params['id'];
  }

  ngOnInit() {
    if (this.id != 'new') {
      console.log(this.id);
      this.lugaresService.getNegocio(this.id)
        .subscribe((bussiness) => {
          this.bussiness = bussiness;  
          console.log(this.bussiness);
        });
    }
  }

  saveBussiness() {
  
    if (this.id != 'new') {
      this.lugaresService.editBussiness(this.id, this.bussiness);
      alert('Bussiness Edited');
    }
    else {
      this.lugaresService.postBussiness(this.bussiness);
      alert('Bussiness Saved');
    }
    this.bussiness = {};
  }

}
