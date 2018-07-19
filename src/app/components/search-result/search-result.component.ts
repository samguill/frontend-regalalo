import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route, NavigationEnd } from '@angular/router';

import { SearchDataService } from './../../services/search-data.service';
import { SearchService } from './../../services/search.service';
import { ProductDataService } from './../../services/product-data.service';
import { ProfileService } from './../../services/profile.service';
import swal from 'sweetalert2';
declare const App: any;

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  products: any;
  stores:any;
  loading:boolean = false;
  reload: boolean = false;

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private search_service: SearchService,
    private search_data: SearchDataService,
    private profile_service: ProfileService,
    private product_data_service: ProductDataService) {
      let data_search: any;
      this.search_data.$getSubject.subscribe(value => {
        data_search = value;
        let latitude = localStorage.getItem('latitude');
        let longitude = localStorage.getItem('longitude');
        if(data_search.length == 0){
          if(latitude != null && longitude != null){
            data_search = {"latitude": latitude, "longitude":longitude};
          }
        }else{
          if(latitude != null && longitude != null){
            data_search["latitude"] = latitude;
            data_search["longitude"] = longitude;
          }
        }
        if(data_search.type == "quick"){
          this.quickSearch(data_search);
        }else if(data_search.type == "advance"){
          this.advanceSearch(data_search);
        }else{
          this.advanceSearch(data_search);
        }

      });
      
      if(!data_search){
        data_search = "";
        let latitude = localStorage.getItem('latitude');
        let longitude = localStorage.getItem('longitude');
        if(latitude != null && longitude != null){
          data_search = {"latitude": latitude, "longitude":longitude};
        }
        this.quickSearch(data_search);
      }
  }

  quickSearch(data:any){
    this.search_service.quicksearch(data)
      .then((response)=> {
        let status = response.status;
        if(status == "ok"){
          this.products = response.data.items.data;
          this.stores = response.data.stores.data;
        }
        if(status == "error"){
          swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
        }
      })
      .catch((error) => {
        swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
      });
  }

  advanceSearch(data:any){
    this.search_service.search(data)
      .then((response)=> {
        let status = response.status;
        if(status == "ok"){
          this.products = response.data.data;
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
    this.products.sort(function(a,b){
      if(a.distance && b.distance){
        a = a.distance.toFixed(0);
        b = b.distance.toFixed(0);
        return a < b ? -1 : a > b ? 1 : 0;
      }
    });
  }

  alphabetical(){
    this.products.sort(function(a,b){
      a = a.name.toLowerCase();
      b = b.name.toLowerCase();
      return a < b ? -1 : a > b ? 1 : 0;
    });
  }

  onScroll () {
    console.log('scrolled!!')
  }

}
