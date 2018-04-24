import { element } from 'protractor';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';

import { SearchDataService } from './../../services/search-data.service';
import { SearchService } from './../../services/search.service';
import { ProductDataService } from './../../services/product-data.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  result: any;

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private search_service: SearchService,
    private search_data: SearchDataService,
    private product_data_service: ProductDataService) {
      let data_search: any;
      this.search_data.searchData.subscribe(value => (value == null || value == undefined) ? data_search = [] : data_search = value);
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

      this.search_service.search(data_search)
      .then((response)=> {
        let status = response.json().status;
        if(status == "ok"){
          this.result = response.json().data.data;
        }
        if(status == "error"){
          alert("Error");
        }
      })
      .catch((error) => {
        console.log(error);
        alert("Error");
      });
  }

  product_detail(product:any){
    this.product_data_service.setData(product);
    this.router.navigate(['/producto', product.slug]);
  }

  ngOnInit() {
  }

}
