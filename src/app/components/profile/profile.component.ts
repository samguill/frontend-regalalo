import { Component, OnInit } from '@angular/core';
import { OrdersService } from './../../services/orders.service';
import swal from 'sweetalert2';
import {Meta, Title} from '@angular/platform-browser';
import { AuthService } from './../../services/auth.service';
import { ProfileService } from './../../services/profile.service';
import { WishlistService } from './../../services/wishlist.service';
import { Validators, FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  current_title: string = "Datos personales";
  current_option: string = "profile";

  show_loading: boolean = false;

  personalDataForm: FormGroup;
  loading_personal_data:boolean = false;

  directionForm: FormGroup;
  loading_direction_data:boolean = false;

  orders: any;

  client:any;

  wishlists: any;
  
  new_direction: any = {};
  directions: any;
  userSettings = {}

  constructor(private title_service:Title,
    private orders_service: OrdersService,
    private profile_service: ProfileService,
    private wishlist_service: WishlistService) {
      this.title_service.setTitle("Regálalo | Tu regalo ideal");
  }

  ngOnInit() {
    this.client = JSON.parse(sessionStorage.getItem("client"));
    this.directions = this.client.directions;
    
    this.personalDataForm = new FormGroup({
      first_name: new FormControl(this.client.first_name, Validators.required),
      last_name: new FormControl(this.client.last_name, Validators.required),
      email: new FormControl(this.client.email, Validators.required),
      password: new FormControl(''),
      phone: new FormControl(this.client.phone),
    });

    this.directionForm = new FormGroup({
      name: new FormControl('', Validators.required)
    });

    this.show_loading = true;
  }

  change_view(view){
    switch(view){
      case ("profile"):
        this.current_title = "Datos personales";
        this.current_option = "profile";
      break;
      case ("directions"):
        this.current_title = "Mis direcciones";
        this.current_option = "directions";
      break;
      case ("orders"):
        this.current_title = "Historial de compras";
        this.current_option = "orders";
        this.get_orders();
      break;
      case ("wishlists"):
        this.current_title = "Mi lista de deseos";
        this.current_option = "wishlists";
        this.get_wishlist();
      break;
    }
  }

  get_orders(){
    this.orders = [];
    this.show_loading = true;
    this.orders_service.list()
    .then((response)=> {
      this.orders = response.json().data;
      this.show_loading = false;
    })
    .catch((error)=>{
      swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
    });
  }

  update_personal_data(){
    this.loading_personal_data = true;
    this.profile_service.update_profile(this.personalDataForm.value)
      .then((response) => {
        this.loading_personal_data = false;
        response = response.json();
        if(response.status == "ok"){
          swal("Éxito", "Tus datos se han actualizado con éxito.", "success");
          sessionStorage.setItem('client', JSON.stringify(response.data));
        }
      })
      .catch((error) => {
        this.loading_personal_data = false;
        swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
      });
  }

  get_wishlist(){
    this.wishlists = [];
    this.show_loading = true;
    
    this.wishlist_service.lists().then((response)=> {
      this.wishlists = response.json();
      this.show_loading = false;
    })
    .catch((error)=>{
      this.show_loading = false;
      swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
    });
  }

  delete_item(id){
    this.show_loading = true;
    this.wishlist_service.delete_item({id:id})
      .then((response) => {
        response = response.json();
        if(response.status == "ok"){
          this.get_wishlist();
        }
      })
      .catch((error) => {
        this.show_loading = false;
        swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
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
          this.directions.push(this.new_direction);
        }
      })
      .catch((error) => {
        this.loading_direction_data = false;
        swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
      });
  }

}
