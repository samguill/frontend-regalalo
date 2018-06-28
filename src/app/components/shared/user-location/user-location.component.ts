import { Component, OnInit } from '@angular/core';
import { UserLocationService } from './../../../services/user-location.service';

@Component({
  selector: 'app-user-location',
  templateUrl: './user-location.component.html',
  styleUrls: ['./user-location.component.scss']
})
export class UserLocationComponent implements OnInit {

  client_direction:string = "";

  constructor(private user_location_service:UserLocationService) { }

  ngOnInit() {
    let local_data = localStorage.getItem("address");
    if(local_data != ""){
      this.client_direction = local_data;
    }else{
      this.user_location_service.$getSubject.subscribe(value => {
        this.client_direction = value;
      });
    }
  }

}
