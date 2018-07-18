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
  data_slug: string;
  product_name: string;
  isloggedIn: boolean = false;
  multiple_directions: boolean = false;
  store_open: boolean;
  client_marker: string = "assets/img/client-marker.png";
  store_marker: string = "assets/img/store-marker.png";
  discount;
  price;
  discount_price;
  featured_image: string;
  sku_code;
  description;
  characteristics: any = [];
  order_characteristics: any = [];

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
      value => (value == null || value == undefined) ? this.data_slug = "" : this.data_slug = value.slug
    );

    if(this.data_slug == ""){
      this.activated_route.params.subscribe(params => {
        this.data_slug = params["id"];
        this.getDataBySlug(this.data_slug);
      });
    }else{
      this.getDataBySlug(this.data_slug);
    }
  }

  getDataBySlug(slug:string){
    let latitude = localStorage.getItem('latitude');
    let longitude = localStorage.getItem('longitude');
    let data:any;
    if(latitude && longitude){
      this.multiple_directions = false;
      data = {
        slug:slug,
        latitude:latitude,
        longitude:longitude
      }
    }else{
      this.multiple_directions = true;
      data = {
        slug:slug
      }
    }
    this.product_service.detail(data)
    .then((response)=> {
      this.data_product = response.json().data;
      this.discount = this.data_product.discount;
      this.price = this.data_product.price.toFixed(2);
      this.featured_image = this.data_product.featured_image;
      this.sku_code = this.data_product.sku_code;
      this.description = this.data_product.description;
      if(this.discount != 0){
        this.discount_price = this.data_product.discount_price.toFixed(2);
      }
      this.product_name = this.data_product.name;
      this.data_branche = this.data_product.store.branches;
      this.characteristics = this.data_product.productcharacteristicsdetail;
      this.store_open = this.data_branche[0].open;
      console.log(this.store_open);
      if(latitude && longitude){
        this.directions = {
          origin: { lat: this.single_latitude, lng: this.single_longitude },
          destination: { lat: this.data_branche[0].latitude, lng: this.data_branche[0].longitude }
        }
      }
    })
    .catch((error)=>{
      swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
    });
  }

  checkout(){
    let data = {
      product: this.data_product,
      branche: this.data_branche[0],
      order_characteristics: this.order_characteristics
    }
    this.checkout_data_service.setData(data);
    this.router.navigate(['/checkout']);
  }

  getCharacteristic(index, e){
    let characteristic = this.characteristics[index].characteristic["name"];
    let value = e.target.value;
    let obj = {};
    obj["characteristic"] = characteristic;
    obj["value"] = value;
    this.order_characteristics.push(obj);
  }

}
