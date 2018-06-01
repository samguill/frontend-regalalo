import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { SearchDataService } from './../../services/search-data.service';
import { SearchService } from './../../services/search.service';

@Component({
  selector: 'app-quick-search-form',
  templateUrl: './quick-search-form.component.html',
  styleUrls: ['./quick-search-form.component.css']
})
export class QuickSearchFormComponent implements OnInit {

  searchForm: FormGroup;
  searchData: any;

  constructor(private router: Router,
    private search_service: SearchService,
    private search_data: SearchDataService) { }

  ngOnInit() {
    this.searchForm = new FormGroup({
      phrase: new FormControl('', Validators.required)
    });
  }

  search(){
    this.searchData = {
      description: this.searchForm.value.phrase,
      name: this.searchForm.value.phrase,
      type: "quick"
    };
    this.search_data.setData(this.searchData);
    this.router.navigate(['/busqueda']);
  }

}
