import { ElementRef, NgZone, OnInit, ViewChild, Component } from '@angular/core';
import { CheckoutService } from './../../services/checkout.service';
import { CheckoutDataService } from './../../services/checkout-data.service';
import { FormControl } from '@angular/forms';
import { } from 'googlemaps';
import { MapsAPILoader } from '@agm/core';

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
  latitude;
  longitude;
  searchControl: FormControl;

  @ViewChild("search")
  public searchElementRef: ElementRef;
  
  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    private check_out_service: CheckoutService,
    private checkout_data_service: CheckoutDataService) {

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

    this.searchControl = new FormControl();
    
    /*this.mapsAPILoader.load()
      .then(() => {
        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          types: ["address"]
        });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            if(place.geometry === undefined || place.geometry === null){
              return;
            }
            this.latitude = place.geometry.location.lat();
            this.longitude = place.geometry.location.lng();
          });
        });
      });*/
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
        alert("Ocurrió un error, inténtalo de nuevo.");
      });
    }else{
      this.price_delivery = 0;
    }
  }

}
