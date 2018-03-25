import { AuthService } from './../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import * as jwtDecode from 'jwt-decode';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private auth: AuthService) {

  }

  ngOnInit() {
    let token = this.auth.getToken();
    let decode_token:string = jwtDecode(token);
    let client: any = decode_token["client"];
    console.log(client);
  }

}
