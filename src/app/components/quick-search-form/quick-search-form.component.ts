import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { SearchDataService } from './../../services/search-data.service';
import { SearchService } from './../../services/search.service';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-quick-search-form',
  templateUrl: './quick-search-form.component.html',
  styleUrls: ['./quick-search-form.component.css']
})
export class QuickSearchFormComponent implements OnInit {

  searchForm: FormGroup;
  searchData: any;

  constructor(private router: Router,
    private title_service:Title,
    private search_service: SearchService,
    private search_data: SearchDataService) {
      this.title_service.setTitle("Regálalo | Tu regalo ideal");
    }

  ngOnInit() {
    this.searchForm = new FormGroup({
      phrase: new FormControl('', Validators.required)
    });
  }

  search(){
    this.searchData = {
      searchtext: this.searchForm.value.phrase,
      type: "quick"
    };
    this.search_data.sendData(this.searchData);
    this.router.navigate(['/busqueda']);
    /*if(this.router.url == "/busqueda"){
      
    }else{
      this.search_data.setData(this.searchData);
      this.router.navigate(['/busqueda']);
    }*/
  }

}
