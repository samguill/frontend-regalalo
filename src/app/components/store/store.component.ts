import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';

import { StoreService } from './../../services/store.service';
import { ProfileService } from './../../services/profile.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  products: any;
  services: any;
  store: any;
  loading:boolean = false;

  constructor(
    private activatedRoute:ActivatedRoute,
    private meta:Meta,
    private title_service:Title,
    private profile_service: ProfileService,
    private store_service: StoreService) {
      this.title_service.setTitle("Regálalo | Tu regalo ideal");
      this.activatedRoute.params.subscribe(id => {
        this.store_service.store_products(id.id)
          .then((response)=> {
            this.products = response.products;
            this.services = response.services;
            this.store = response.store;
            if(this.store.analytics_id != null ){
              if(event instanceof NavigationEnd){
                (<any>window).ga('create', this.store.analytics_id, 'auto');
                (<any>window).ga('send', 'pageview');
              }
            }
            if(this.store.meta_title !== ""){
              this.meta.addTag({
                name: 'title', content: this.store.meta_title
              });
              this.title_service.setTitle(this.store.meta_title);
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

    add_to_wishlist(product:any){
      this.loading = true;
      this.profile_service.add_to_wishlist(product.id)
        .then((response) => {
          this.loading = false;
          response = response.json();
        })
        .catch((error) => {
          this.loading = false;
          swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
        });
    }

  ngOnInit() {
    
  }

}
