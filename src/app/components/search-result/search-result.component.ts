import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';

import { SearchDataService } from './../../services/search-data.service';
import { SearchService } from './../../services/search.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit {
  data: any;
  result: any;

  constructor(
    private router: Router,
    private route:ActivatedRoute,
    private search_service: SearchService,
    private search_data: SearchDataService) {
      this.search_data.searchData.subscribe(value => this.data = value);
      this.search_service.search(this.data)
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
      });
  }

  ngOnInit() {
  }

}
