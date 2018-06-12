import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route, NavigationEnd } from '@angular/router';

import { SearchDataService } from './../../services/search-data.service';
import { SearchService } from './../../services/search.service';
import { ProductDataService } from './../../services/product-data.service';
import { ProfileService } from './../../services/profile.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  result: any;
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
  }

  quickSearch(data:any){
    this.search_service.quicksearch(data)
      .then((response)=> {
        let status = response.status;
        if(status == "ok"){
          this.result = response.data.items.data;
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
          this.result = response.data.data;
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

}
