import { Component, OnInit } from '@angular/core';
import {Meta} from '@angular/platform-browser';

import { StoreService } from './../../services/store.service';

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
          alert("Ocurrió un error, inténtalo de nuevo.");
        }
      })
      .catch((error) => {
        alert("Ocurrió un error, inténtalo de nuevo.");
    })
  }

}
