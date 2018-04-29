import { Component, OnInit } from '@angular/core';
import {Meta} from '@angular/platform-browser';

import { StoreService } from './../../services/store.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-stores',
  templateUrl: './stores.component.html',
  styleUrls: ['./stores.component.css']
})
export class StoresComponent implements OnInit {

  stores:any;

  constructor(
    private meta:Meta,
    private store_service: StoreService) {

      this.meta.addTag({
        name: 'author', content: 'Regalalo'
      });
      this.meta.addTag({
        name: 'description', content: 'Tu regalo ideal'
      });
      this.meta.addTag({
        name: 'description', content: 'Tiendas'
      });

      this.getStores();
    }

  ngOnInit() {
  }

  getStores(){
    this.store_service.stores()
      .then((response) => {
        if(response.json().status === "ok"){
          this.stores = response.json().stores;
        }else{
          swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
        }
      })
      .catch((error) => {
        swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
    })
  }

}
