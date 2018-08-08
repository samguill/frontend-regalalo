import { UserLocationService } from './../../services/user-location.service';
import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit, AfterViewInit, ViewEncapsulation } from '@angular/core';
import {Meta} from '@angular/platform-browser';
import { Router, NavigationEnd } from '@angular/router';
import { Http } from '@angular/http';
import { PageService } from './../../services/page.service';
import swal from 'sweetalert2';
import * as $ from 'jquery';
import 'slick-carousel/slick/slick';
import { NguCarousel } from '@ngu/carousel';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { ProfileService } from './../../services/profile.service';
declare const App: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit {
  slides: any;
  stores: any;
  top_gifts: any;
  products: any;
  featured_products: any;
  offers: any;
  offer1: any;
  offer2: any;
  offer3: any;
  offer4: any;
  brands: any;
  products_1:any;
  products_2:any;
  posts:any;
  loading:boolean = false;

  images: any;
  public carouselOne: NguCarousel;
  public carouselTwo: NguCarousel;
  public carouselTree: NguCarousel;
  public carouselFour: NguCarousel;

  constructor(
    private router: Router,
    private meta:Meta,
    private page: PageService,
    private profile_service: ProfileService,
    private user_location_service:UserLocationService,
    private http: Http) {
    this.meta.addTag({
      name: 'author', content: 'Regalalo'
    });
    this.meta.addTag({
      name: 'description', content: 'Tu regalo ideal'
    });
    this.getElements();
    if(event instanceof NavigationEnd){
      (<any>window).ga('set', 'page', event.urlAfterRedirects);
      (<any>window).ga('send', 'pageview');
    }
  }

  ngAfterViewInit(): void {
    if (!!App && App.hasOwnProperty('GetSliderItems')) {
      App.GetSliderItems();
    }

    if (!!App && App.hasOwnProperty('Carousel')) {
      App.Carousel();
    }
  }

  ngOnInit() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        let latitude = position.coords.latitude.toFixed(5);
        let longitude = position.coords.longitude.toFixed(5);
        console.log(position);
        let address = localStorage.getItem('address');
        if(address){ }else{
          this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + "," + longitude + "&sensor=false")
          .subscribe(data => {
            this.user_location_service.sendData(data.json().results[0]['formatted_address']);
            localStorage.setItem('address', data.json().results[0]['formatted_address']);
          });
        }
        localStorage.setItem('latitude', latitude.toString());
        localStorage.setItem('longitude', longitude.toString());
      });
    }
    this.carouselOne = {
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

    this.carouselTree = {
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

    this.carouselTwo = {
      grid: {xs: 3, sm: 3, md: 3, lg: 6, all: 0},
      slide: 1,
      speed: 400,
      interval: 5000,
      point: {
        visible: true
      },
      load: 2,
      touch: false,
      loop: true,
      custom: 'banner'
    }

    this.carouselFour = {
      grid: {xs: 1, sm: 1, md: 1, lg: 3, all: 0},
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
  

  ngOnDestroy(){
    
  }

  getElements(){
    this.page.home()
    .then((response) => {
      if(response.status === "ok"){
        this.stores = response.stores;
        this.slides = response.slides;
        this.top_gifts = response.products;
        this.products_1 = response.first_10_products;
        this.products_2 = response.before_10_products;
        this.brands = response.brands;
        this.posts = response.posts;
        this.featured_products = response.featured_products;
      }else{
        swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
      }
    })
    .catch((error) => {
      swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
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
}
