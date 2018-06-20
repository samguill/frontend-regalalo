import { Component, OnInit } from '@angular/core';
import {Meta} from '@angular/platform-browser';

import { StoreService } from './../../services/store.service';
import swal from 'sweetalert2';
import { NavigationEnd } from '@angular/router';

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
      if(event instanceof NavigationEnd){
        (<any>window).ga('set', 'page', event.urlAfterRedirects);
        (<any>window).ga('send', 'pageview');
      }

      this.getStores();
    }

  ngOnInit() {
  }

  getStores(){
    this.store_service.stores()
      .then((response) => {
        if(response.status === "ok"){
          this.stores = response.stores;
        }else{
          swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
        }
      })
      .catch((error) => {
        swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
    })
  }

}
