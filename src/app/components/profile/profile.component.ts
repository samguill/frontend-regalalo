import { Component, OnInit } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import swal from 'sweetalert2';

import { AuthService } from './../../services/auth.service';
import { ProfileService } from './../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(
    private auth: AuthService,
    private profile_service: ProfileService) {

  }

  ngOnInit() {
    let token = this.auth.getToken();
    let decode_token:string = jwtDecode(token);
    let client: any = decode_token["client"];

    this.profile_service.directions(token, client.id)
    .then((response) => {
      console.log(response.json());
    })
    .catch((error) => {
      swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
    });
    //console.log(token);
  }

}
