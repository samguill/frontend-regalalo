import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { StoreService } from './../../services/store.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-store',
  templateUrl: './store.component.html',
  styleUrls: ['./store.component.css']
})
export class StoreComponent implements OnInit {

  products: any;

  constructor(
    private activatedRoute:ActivatedRoute,
    private store_service: StoreService) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe(id => {
      this.store_service.store_products(id.id)
        .then((response)=> {
          this.products = response.json().products;
        })
        .catch((error)=>{
          swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
        })
    });
  }

}
