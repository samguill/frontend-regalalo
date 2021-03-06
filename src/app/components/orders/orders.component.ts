import { Component, OnInit } from '@angular/core';
import { OrdersService } from './../../services/orders.service';
import { AuthService } from './../../services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit {

  orders: any;
  loading:boolean = false;

  constructor(
    private orders_service: OrdersService,
    private auth: AuthService) {

  }

  ngOnInit() {
    this.loading = true;
    this.orders_service.list()
    .then((response)=> {
      this.orders = response.json().data;
      this.loading = false;
    })
    .catch((error)=>{
      swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
    });
  }

}
