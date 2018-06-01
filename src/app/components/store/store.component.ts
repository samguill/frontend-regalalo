import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {Meta} from '@angular/platform-browser';

import { StoreService } from './../../services/store.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  products: any;
  store: any;

  constructor(
    private activatedRoute:ActivatedRoute,
    private meta:Meta,
    private store_service: StoreService) {
      this.activatedRoute.params.subscribe(id => {
        this.store_service.store_products(id.id)
          .then((response)=> {
            this.products = response.products;
            this.store = response.store;

            if(this.store.meta_title !== ""){
              this.meta.addTag({
                name: 'title', content: this.store.meta_title
              });
            }
            if(this.store.meta_description !== ""){
              this.meta.addTag({
                name: 'description', content: this.store.meta_description
              });
            }
          })
          .catch((error)=>{
            swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
          })
      });
    }

  ngOnInit() {
    
  }

}
