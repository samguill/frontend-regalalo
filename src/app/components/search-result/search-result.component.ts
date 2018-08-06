import { element } from 'protractor';
import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { Router, ActivatedRoute, Route, NavigationEnd } from '@angular/router';

import { SearchDataService } from './../../services/search-data.service';
import { SearchService } from './../../services/search.service';
import { ProductDataService } from './../../services/product-data.service';
import { ProfileService } from './../../services/profile.service';
import swal from 'sweetalert2';
import 'slick-carousel/slick/slick';
import { NguCarousel } from '@ngu/carousel';
import { bind } from '../../../../node_modules/@angular/core/src/render3/instructions';
declare const App: any;

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  items: any;
  stores:any;
  loading:boolean = false;
  reload: boolean = false;
  public carouselTwo: NguCarousel;
  fetch_loading:boolean = false;
  data_search: any;
  
  last_page_url: string;
  next_page_url: string;
  last_page: number;

  ngOnChanges(changes: SimpleChanges){
  }

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private search_service: SearchService,
    private search_data: SearchDataService,
    private profile_service: ProfileService,
    private product_data_service: ProductDataService) {
      if (!!App && App.hasOwnProperty('FilterToggle')) {
        App.FilterToggle();
      }
      this.search_data.$getSubject.subscribe(value => {
        this.data_search = value;
        let latitude = localStorage.getItem('latitude');
        let longitude = localStorage.getItem('longitude');
        if(this.data_search.length == 0){
          if(latitude != null && longitude != null){
            this.data_search = {"latitude": latitude, "longitude":longitude};
          }
        }else{
          if(latitude != null && longitude != null){
            this.data_search["latitude"] = latitude;
            this.data_search["longitude"] = longitude;
          }
        }
        if(this.data_search.type == "quick"){
          this.quickSearch(this.data_search);
        }else if(this.data_search.type == "advance"){
          this.advanceSearch(this.data_search);
        }else{
          this.advanceSearch(this.data_search);
        }

      });
      
      if(!this.data_search){
        this.data_search = "";
        let latitude = localStorage.getItem('latitude');
        let longitude = localStorage.getItem('longitude');
        if(latitude != null && longitude != null){
          this.data_search = {"latitude": latitude, "longitude":longitude};
        }
        this.quickSearch(this.data_search);
      }
      this.fetchData = this.fetchData.bind(this);
  }

  quickSearch(data:any){
    this.search_service.quicksearch(data)
      .then((response)=> {
        let status = response.status;
        if(status == "ok"){
          this.items = response.data.items.data;
          this.stores = response.data.stores.data;
          this.last_page = response.data.items.last_page;
          this.last_page_url = response.data.items.last_page_url;
          this.next_page_url = response.data.items.next_page_url;
        }
        if(status == "error"){
          swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
        }
      })
      .catch((error) => {
        swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
      });
  }

  onScroll () {
    if(this.next_page_url){
      this.fetch_loading = true;
      this.data_search["page"] = this.next_page_url.replace("/?page=", "");
      this.fetchData();
    }
  }

  fetchData(){
    this.search_service.next_page(this.data_search)
      .then((response) => {
        response = response.json();
        let status = response.status;
        if(status == "ok"){
          let json_data = response.data.items.data;
          let json_arr = Object.keys(json_data).map(function(key){
            return json_data[key];
          });
          Array.prototype.push.apply(this.items, json_arr);
          this.next_page_url = response.data.items.next_page_url;
        }
        if(status == "error"){
          swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
        }
        this.fetch_loading = false;
      })
      .catch((error) => {
        swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
        this.fetch_loading = false;
      });
  }

  advanceSearch(data:any){
    this.search_service.search(data)
      .then((response)=> {
        let status = response.status;
        if(status == "ok"){
          this.items = response.data.data;
        }
        if(status == "error"){
          swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
        }
      })
      .catch((error) => {
        swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
      });
  }

  product_detail(product:any){
    this.product_data_service.setData(product);
    this.router.navigate(['/producto', product.slug]);
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
    this.carouselTwo = {
      grid: {xs: 1, sm: 1, md: 2, lg: 6, all: 0},
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
    this.search_data.resetObserver();
  }

  ngAfterViewInit(): void {
    if (!!App && App.hasOwnProperty('FilterToggle')) {
      App.FilterToggle();
    }
  }

  filter_data(filter_type:string){
    switch(filter_type){
      case 'min-max-price':
        this.filter_min_max_price();
      break;
      case 'max-min-price':
        this.filter_max_min_price();
      break;
      case 'closest':
        this.filter_closest();
      break;
      case 'alphabetical':
        this.alphabetical();
      break;
    }
  }

  filter_min_max_price(){
    console.log("Menor a mayor precio");
    
  }

  filter_max_min_price(){
    console.log("Mayor a menor precio");
  }

  filter_closest(){
    this.items.sort(function(a,b){
      if(a.distance && b.distance){
        a = a.distance.toFixed(0);
        b = b.distance.toFixed(0);
        return a < b ? -1 : a > b ? 1 : 0;
      }
    });
  }

  alphabetical(){
    this.items.sort(function(a,b){
      a = a.name.toLowerCase();
      b = b.name.toLowerCase();
      return a < b ? -1 : a > b ? 1 : 0;
    });
  }

}
