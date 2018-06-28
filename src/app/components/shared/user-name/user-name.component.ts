import { Component, OnInit } from '@angular/core';
import { UserNameService } from './../../../services/user-name.service';

@Component({
  selector: 'app-user-name',
  templateUrl: './user-name.component.html',
  styleUrls: ['./user-name.component.scss']
})
export class UserNameComponent implements OnInit {

  client_name:string = "Visitante";

  constructor(private user_name_service:UserNameService) {}

  ngOnInit() {
    let local_data = sessionStorage.getItem("client");
    if(local_data !== ""){
      var dato = JSON.parse(local_data).first_name;
      this.client_name = dato;
    }else{
      this.user_name_service.$getSubject.subscribe(value => {
        this.client_name = value;
      });
    }
  }

}
