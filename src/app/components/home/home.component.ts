import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit, AfterViewInit } from '@angular/core';
import {Meta} from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { PageService } from './../../services/page.service';
import swal from 'sweetalert2';
import * as $ from 'jquery';
import 'slick-carousel/slick/slick';
declare const App: any;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
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

  images: any;

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
  }
  
  ngAfterViewInit() {
    if (!!App && App.hasOwnProperty('HomeSlider')) {
      App.HomeSlider();
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
    
    this.images = [
        {image: "http://via.placeholder.com/200x250"},
        {image: "http://via.placeholder.com/200x250"},
        {image: "http://via.placeholder.com/200x250"},
        {image: "http://via.placeholder.com/200x250"},
        {image: "http://via.placeholder.com/200x250"},
        {image: "http://via.placeholder.com/200x250"},
        {image: "http://via.placeholder.com/200x250"},
        {image: "http://via.placeholder.com/200x250"}
    ];
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
        this.offers = response.offers;
        this.offer1 = response.offers[0];
        this.offer2 = response.offers[1];
        this.offer3 = response.offers[2];
        this.offer4 = response.offers[3];
      }else{
        swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
      }
    })
    .catch((error) => {
      swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
    });
  }
}
