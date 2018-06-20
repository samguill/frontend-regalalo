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
  offers: any;
  offer1: any;
  offer2: any;
  offer3: any;
  offer4: any;
  brands: any;

  images: any;
  public carouselOne: NguCarousel;
  public carouselTwo: NguCarousel;

  constructor(
    private router: Router,
    private meta:Meta,
    private page: PageService,
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
    if (!!App && App.hasOwnProperty('HomeSlider')) {
      App.HomeSlider();
      App.Carousel();
    }
  }

  ngOnInit() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        let latitude = position.coords.latitude.toFixed(5);
        let longitude = position.coords.longitude.toFixed(5);
        let address = localStorage.getItem('address');
        if(address){ }else{
          this.http.get('https://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + "," + longitude + "&sensor=false")
          .subscribe(data => {
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

    this.carouselTwo = {
      grid: {xs: 3, sm: 3, md: 3, lg: 6, all: 0},
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
        this.products = response.products;
        this.brands = response.brands;
      }else{
        swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
      }
    })
    .catch((error) => {
      swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
    });
  }
}
