import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { CheckoutDataService } from './../../services/checkout-data.service';
import { ServiceService } from './../../services/service.service';
import swal from 'sweetalert2';
import { AgmCoreModule, AgmMarker } from '@agm/core'; 
import 'slick-carousel/slick/slick';
import { NguCarousel } from '@ngu/carousel';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-service',
  templateUrl: './service.component.html',
  styleUrls: ['./service.component.scss'],
  styles: [`agm-map {
    height: 300px;
    width: 100%;
  }`]
})
export class ServiceComponent implements OnInit {

  data_service: any;
  data_branche: any;
  data_slug: string;
  service_name: string;
  isloggedIn: boolean = false;
  multiple_directions: boolean = false;
  store_open: boolean;
  client_marker: string = "assets/img/client-marker.png";
  store_marker: string = "assets/img/store-marker.png";
  discount;
  price;
  discount_price;
  images: any;
  featured_image: string;
  sku_code;
  description;
  characteristics: any = [];
  order_characteristics: any = [];
  related_services: any = [];
  tags: any = [];
  public relatedCarousel: NguCarousel;

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
  public repoUrl:string;

  constructor(private router: Router,
    private meta:Meta,
    private title_service:Title,
    private service:ServiceService,
    private activated_route: ActivatedRoute,
    private checkout_data_service: CheckoutDataService) {
      let access_token = sessionStorage.getItem("access_token");
      if(access_token != null){
        this.isloggedIn = true;
      }
      this.repoUrl="https://regalalo.pe" + this.router.url;
    }

  ngOnInit() {
    this.activated_route.params.subscribe(params => {
      this.data_slug = params["id"];
      this.getDataBySlug(this.data_slug);
    });
    this.relatedCarousel = {
      grid: {xs: 1, sm: 1, md: 2, lg: 4, all: 0},
      slide: 1,
      speed: 400,
      interval: 4000,
      point: {
        visible: true
      },
      load: 2,
      touch: false,
      loop: true,
      custom: 'banner'
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
    this.service.detail(data)
    .then((response)=> {
      this.data_service = response.json().data;
      this.discount = this.data_service.discount;
      this.price = this.data_service.price.toFixed(2);
      this.images = this.data_service.serviceimages;
      this.featured_image = this.data_service.featured_image;
      this.sku_code = this.data_service.sku_code;
      this.description = this.data_service.description;
      if(this.discount != 0){
        this.discount_price = this.data_service.discount_price.toFixed(2);
      }
      this.service_name = this.data_service.name;
      this.data_branche = this.data_service.store.branches;
      //this.characteristics = this.data_service.productcharacteristicsdetail;
      if(this.data_service.tags != null){
        this.tags = this.data_service.tags.split(',');
      }
      if(this.data_branche.length > 0){
        this.store_open = this.data_branche[0].open;
      }
      if(latitude && longitude){
        if(this.data_branche.length > 0){
          this.directions = {
            origin: { lat: this.single_latitude, lng: this.single_longitude },
            destination: { lat: this.data_branche[0].latitude, lng: this.data_branche[0].longitude }
          }
        }
      }
      this.setMedaData();
    })
    .catch((error)=>{
      swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
    });
  }

  checkout(){
    let data = {
      item: this.data_service,
      branche: this.data_branche[0],
      item_type: "service"
      //order_characteristics: this.order_characteristics
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

  setMedaData(){
    this.title_service.setTitle("Regálalo | Tu regalo ideal");
    if(this.data_service.meta_title){
      this.meta.updateTag({
        name: 'title', content: this.data_service.meta_title
      });
      this.title_service.setTitle(this.data_service.meta_title);
      this.meta.updateTag({
        property: 'og:title', content: this.data_service.meta_title
      });
    }
    
    if(this.data_service.meta_description){
      this.meta.updateTag({
        name: 'description', content: this.data_service.meta_description
      });
      this.meta.updateTag({
        property: 'og:description', content: this.data_service.meta_description
      });
    }

    if(this.data_service.tags){
      this.meta.updateTag({
        name: 'keywords', content: this.data_service.tags
      });
    }
    
    this.meta.updateTag({
      property: 'og:image', content: this.featured_image
    });
    
  }

}
