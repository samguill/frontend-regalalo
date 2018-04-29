import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Route } from '@angular/router';

import { ProductDataService } from './../../services/product-data.service';
import { ProductService } from './../../services/product.service';
import { CheckoutDataService } from './../../services/checkout-data.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css']
})
export class ProductComponent implements OnInit {
  data_product: any;
  data_branche: any;

  constructor(
    private router: Router,
    private product_data_service: ProductDataService,
    private activated_route: ActivatedRoute,
    private product_service: ProductService,
    private checkout_data_service: CheckoutDataService) {
      
    }

  ngOnInit() {
    this.product_data_service.productData.subscribe(
      value => (value == null || value == undefined) ? this.data_product = "" : this.data_product = value
    );

    if(this.data_product == ""){
      let data:any = [];
      let slug:string = "";
      this.activated_route.params.subscribe(params => {
        slug = params["id"];
        let latitude = localStorage.getItem('latitude');
        let longitude = localStorage.getItem('longitude');
        if(latitude && longitude){
          data = {
            slug:slug,
            latitude:latitude,
            longitude:longitude
          }
        }else{
          data = {
            slug:slug
          }
        }
        this.getDataBySlug(data);
      });
    }else{
      this.data_branche = this.getStoreBrancheData(this.data_product.store_branche_id);
    }
  }

  getDataBySlug(slug:string){
    this.product_service.detail(slug)
    .then((response)=> {
      this.data_product = response.json().data;
      this.data_branche = this.data_product.store.branches[0]
    })
    .catch((error)=>{
      swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
    });
  }

  getStoreBrancheData(store_branche_id){
    this.product_service.branche(store_branche_id)
    .then((response) => {
      this.data_branche = response.json().data;
    })
    .catch((error)=>{
      swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
    });
  }

  checkout(product:any){
    let data = {
      product: product,
      branche: this.data_branche
    }
    this.checkout_data_service.setData(data);
    this.router.navigate(['/checkout']);
  }

}
