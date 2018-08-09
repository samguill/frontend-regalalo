import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd } from '@angular/router';
import {Meta, Title} from '@angular/platform-browser';
import { BrandService } from './../../services/brand.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-brand',
  templateUrl: './brand.component.html',
  styleUrls: ['./brand.component.scss']
})
export class BrandComponent implements OnInit {

  products: any;
  last_page_url: string;
  next_page_url: string;
  last_page: number;
  fetch_loading:boolean = false;
  data_brand = {};

  constructor(private meta:Meta,
    private title_service:Title,
    private activatedRoute:ActivatedRoute,
    private brand_service: BrandService) {
      this.title_service.setTitle("Regálalo | Tu regalo ideal");
      this.activatedRoute.params.subscribe(id => {
        this.data_brand["slug"] = id.id;
        this.getProducts(this.data_brand);
      });
    }

  ngOnInit() {

  }

  onScroll () {
    if(this.next_page_url){
      this.fetch_loading = true;
      this.data_brand["page"] = this.next_page_url.replace("/?page=", "");
      this.fetchData(this.data_brand);
    }
  }

  getProducts(data){
    data["page"] = null;
    this.brand_service.get_products(data)
      .then((response)=> {
        let status = response.status;
        if(status == "ok"){
          this.products = response.data.data;
          this.last_page = response.data.last_page;
          this.last_page_url = response.data.last_page_url;
          this.next_page_url = response.data.next_page_url;
        }
        if(status == "error"){
          swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
        }
      })
      .catch((error) => {
        swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
      });
  }

  fetchData(data){
    this.brand_service.next_page(data)
      .then((response) => {
        response = response.json();
        let status = response.status;
        if(status == "ok"){
          let json_data = response.data.data;
          let json_arr = Object.keys(json_data).map(function(key){
            return json_data[key];
          });
          Array.prototype.push.apply(this.products, json_arr);
          this.next_page_url = response.data.next_page_url;
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

}
