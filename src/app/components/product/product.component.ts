import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';

import { ProductDataService } from './../../services/product-data.service';
import { ProductService } from './../../services/product.service';
import { CheckoutDataService } from './../../services/checkout-data.service';
import swal from 'sweetalert2';
import { AgmCoreModule, AgmMarker } from '@agm/core'; 

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
  styles: [`agm-map {
    height: 300px;
    width: 100%;
  }`]
})
export class ProductComponent implements OnInit {
  data_product: any;
  data_branche: any;
  isloggedIn: boolean = false;
  multiple_directions: boolean = false;
  client_marker: string = "assets/img/client-marker.png";
  store_marker: string = "assets/img/store-marker.png";

  single_latitude: number = parseFloat(localStorage.getItem('latitude'));
  single_longitude: number = parseFloat(localStorage.getItem('longitude'));
  directions = undefined;
  direction_options = {
    suppressMarkers: true,
    draggable: true
  }

  marker_options = {
    origin : {
      icon: 'assets/img/client-marker.png'
    },
    destination : {
      icon: 'assets/img/store-marker.png'
    }
  }

  constructor(
    private router: Router,
    private product_data_service: ProductDataService,
    private activated_route: ActivatedRoute,
    private product_service: ProductService,
    private checkout_data_service: CheckoutDataService) {
      let access_token = sessionStorage.getItem("access_token");
      if(access_token != null){
        this.isloggedIn = true;
      }
    }

  ngOnInit() {
    this.product_data_service.productData.subscribe(
      value => (value == null || value == undefined) ? this.data_product = "" : this.data_product = value
    );

    if(this.data_product == ""){
      let data:any = [];
      let slug:string = "";
      this.activated_route.params.subscribe(params => {
        slug = params["id"];
        let latitude = localStorage.getItem('latitude');
        let longitude = localStorage.getItem('longitude');
        if(latitude && longitude){
          data = {
            slug:slug,
            latitude:latitude,
            longitude:longitude
          }
        }else{
          data = {
            slug:slug
          }
        }
        this.getDataBySlug(data);
      });
    }else{
      this.data_product["featured_image"] = "https://admin.regalalo.pe/" + this.data_product.featured_image;
      this.data_branche = this.getStoreBrancheData(this.data_product.store_branche_id);
    }
  }

  getDataBySlug(slug:string){
    this.product_service.detail(slug)
    .then((response)=> {
      this.data_product = response.json().data;
      this.data_branche = this.data_product.store.branches;
      this.multiple_directions = true;
    })
    .catch((error)=>{
      swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
    });
  }

  getStoreBrancheData(store_branche_id){
    this.product_service.branche(store_branche_id)
    .then((response) => {
      this.data_branche = response.json().data;
      this.multiple_directions = false;
      this.directions = {
        origin: { lat: this.single_latitude, lng: this.single_longitude },
        destination: { lat: this.data_branche.latitude, lng: this.data_branche.longitude }
      }
    })
    .catch((error)=>{
      swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
    });
  }

  checkout(){
    let data = {
      product: this.data_product,
      branche: this.data_branche
    }
    this.checkout_data_service.setData(data);
    this.router.navigate(['/checkout']);
  }

}
