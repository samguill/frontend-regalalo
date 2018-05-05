import { ElementRef, NgZone, OnInit, ViewChild, Component } from '@angular/core';
import { CheckoutService } from './../../services/checkout.service';
import { CheckoutDataService } from './../../services/checkout-data.service';
import { Router, ActivatedRoute, Route } from '@angular/router';

import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';
import * as jwtDecode from 'jwt-decode';
import swal from 'sweetalert2';

import { AuthService } from './../../services/auth.service';
import { ProfileService } from './../../services/profile.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  data_checkout: any;
  product: any;
  branche: any;
  is_delivery: boolean = false;
  total;
  subtotal;
  quantity: number = 1;
  delivery = "recoge";
  price_delivery = 0;
  address: string;
  client_directions:any;
  client_direction_id = "";
  latitude;
  longitude;
  searchControl: FormControl;
  loading_payment:boolean = false;

  purchaseVerification: string;
  acquirerId: string;
  idCommerce: string;
  purchaseOperationNumber: string;
  purchaseAmount: string;
  shippingFirstName:string;
  shippingLastName: string;
  shippingEmail:string;
  shippingAddress: string;
  userCommerce: string;
  userCodePayme: string;

  payment_generated:boolean = false;

  @ViewChild("search")
  public searchElementRef: ElementRef;
  
  constructor(
    private router: Router,
    private auth: AuthService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private check_out_service: CheckoutService,
    private checkout_data_service: CheckoutDataService,
    private profile_service: ProfileService) {

  }

  ngOnInit() {
    this.checkout_data_service.productData.subscribe(
      value => (value == null || value == undefined) ? this.data_checkout = "" : this.data_checkout = value
    );
    this.branche = this.data_checkout.branche;
    this.product = this.data_checkout.product;
    this.address = localStorage.getItem('address');
    this.latitude = localStorage.getItem('latitude');
    this.longitude = localStorage.getItem('longitude');
    this.subtotal = this.product.price * this.quantity;
    this.total = (this.product.price * this.quantity) + this.price_delivery;

    this.searchControl = new FormControl();
    this.getDirections();
  }

  getDirections(){
    let token = this.auth.getToken();
    let decode_token:string = jwtDecode(token);
    let client: any = decode_token["client"];
    this.profile_service.directions(token, client.id)
    .then((response) => {
      this.client_directions = response.json().order;
    })
    .catch((error) => {
      swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
    });
  }

  onDeliveryChange(value){
    this.delivery = value;
    if(this.delivery == "envio"){
      let data:any;
      data = {
        store_branche_id : this.branche.id,
        lat_origin: this.latitude,
        lon_origin: this.longitude
      }
      this.check_out_service.delivery_calculate(data)
      .then((response) => {
        this.price_delivery = response.json().prices[0].price;
      })
      .catch((error)=>{
        this.delivery == "recoge";
        swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
      });
    }else{
      this.price_delivery = 0;
    }
  }

  payment(){
    this.loading_payment = true;

    let token = this.auth.getToken();
    let decode_token:string = jwtDecode(token);
    let client = decode_token["client"];
    let delivery_post:boolean;

    if(this.delivery == "recoge"){
      delivery_post = false;
    }else{
      delivery_post = true;
    }

    let data;
    data = {
      order : {
        store_id: this.branche.store_id,
        client_id: client.id,
        sub_total: this.subtotal,
        total: this.total,
        client_direction_id: this.client_direction_id
      },
      orderdetails: [{
        product_id: this.product.id,
        quantity: this.quantity,
        price: this.product.price,
        price_delivery: this.price_delivery,
        igv: parseFloat(this.total) * 0.18
      }],
      store_branche_id: this.branche.id,
      destination_client: {
        contact_person: client.first_name + " " + client.last_name,
        phone: 98999989,
        address: this.address,
        latlon: this.latitude + "," + this.longitude,
        email: client.email
      },
      delivery : delivery_post
    };

    this.check_out_service.generate_payment(token, data)
    .then((response) => {
      this.loading_payment = false;
      this.purchaseVerification = response.json().purchaseVerification;
      this.acquirerId = response.json().acquirerId;
      this.idCommerce = response.json().idCommerce;
      this.purchaseOperationNumber = response.json().purchaseOperationNumber;
      this.purchaseAmount = response.json().purchaseAmount;
      this.shippingFirstName = response.json().shippingFirstName;
      this.shippingLastName = response.json().shippingLastName;
      this.shippingEmail = response.json().shippingLastName;
      this.shippingAddress = response.json().shippingAddress;
      this.userCommerce = response.json().userCommerce;
      this.userCodePayme = response.json().userCodePayme;
      this.payment_generated = true;
    })
    .catch((error) => {
      this.loading_payment = false;
      swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
    });
  }

}
