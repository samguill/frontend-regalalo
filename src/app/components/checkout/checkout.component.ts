import { ElementRef, NgZone, OnInit, ViewChild, Component } from '@angular/core';
import { CheckoutService } from './../../services/checkout.service';
import { CheckoutDataService } from './../../services/checkout-data.service';
import { Router, ActivatedRoute, Route } from '@angular/router';
import { Validators, FormGroup, FormControl } from '@angular/forms';
import { MapsAPILoader } from '@agm/core';
import swal from 'sweetalert2';

import { AuthService } from './../../services/auth.service';
import { ProfileService } from './../../services/profile.service';
import { NgbModal, ModalDismissReasons, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit {
  data_checkout: any;
  product: any;
  branche: any;
  characteristics: any = [];
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
  modalReference: NgbModalRef;

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

  directionForm: FormGroup;
  loading_direction_data:boolean = false;
  new_direction: any = {};

  payment_generated:boolean = false;

  @ViewChild("search")
  public searchElementRef: ElementRef;
  
  constructor(
    private modalService: NgbModal,
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
    this.characteristics = this.data_checkout.order_characteristics;
    this.address = localStorage.getItem('address');
    this.latitude = localStorage.getItem('latitude');
    this.longitude = localStorage.getItem('longitude');
    this.subtotal = (this.product.discount != 0 ? this.product.discount_price.toFixed(0) : this.product.price) * this.quantity;
    this.total = ((this.product.discount != 0 ? this.product.discount_price.toFixed(0) : this.product.price) * this.quantity) + this.price_delivery;

    this.searchControl = new FormControl();
    
    let client = JSON.parse(sessionStorage.getItem("client"));
    this.client_directions = client.directions;

    this.directionForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });
  }

  onDeliveryChange(value){
    this.delivery = value;
    if (this.delivery !== 'envio') {
      this.price_delivery = 0;
    }
  }

  calculate_delivery(direction_id){
    this.loading_payment = true;
    let data: any;
    if(this.branche.length > 0){
      data = {
        store_branche_id : this.branche.id,
        client_direction_id: direction_id
      };
    }else{
      data = {
        store_branche_id : this.branche.id,
        client_direction_id: direction_id
      };
    }
    
    this.check_out_service.delivery_calculate(data)
      .then((response) => {
        this.price_delivery = response.json().prices[0].price;
        this.loading_payment = false;
      })
      .catch((error) => {
        this.delivery === 'recoge';
        swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
        this.loading_payment = false;
      });
  }

  payment(){
    this.loading_payment = true;
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
        sub_total: this.subtotal,
        total: this.total,
        client_direction_id: this.client_direction_id
      },
      orderdetails: [{
        product_id: this.product.id,
        quantity: this.quantity,
        price: (this.product.discount != 0 ? this.product.discount_price.toFixed(0) : this.product.price),
        price_delivery: this.price_delivery,
        igv: parseFloat(this.total) * 0.18,
        order_detail_characteristics: this.characteristics
      }],
      store_branche_id: this.branche.id,
      delivery : delivery_post
    };
    this.check_out_service.generate_payment(data)
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

  openModal(content){
    this.modalService.open(content).result.then((result) => {
    });
  }

  autoCompleteCallback1(selectedData:any) {
    this.new_direction = {
      address: selectedData.data.description,
      latitude: selectedData.data.geometry.location.lat,
      longitude: selectedData.data.geometry.location.lng
    }
	}

  save_direction(){
    this.new_direction["name"] = this.directionForm.value.name;
    this.loading_direction_data = true;
    this.profile_service.add_direction(this.new_direction)
      .then((response) => {
        response = response.json();
        if(response.status == "ok"){
          this.loading_direction_data = false;
          swal("Éxito", "La dirección se ha guardado con éxito.", "success");
          sessionStorage.setItem('client', JSON.stringify(response.data));
          let client = response.data;
          let directions = client.directions;
          let last = directions[directions.length -1];
          this.client_directions.push({id:last.id, name:last.name});
          this.directionForm.reset();
        }
      })
      .catch((error) => {
        this.loading_direction_data = false;
        swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
      });
  }

}
