import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

import { AuthService } from './../../services/auth.service';
import { ProfileService } from './../../services/profile.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  constructor(private profile_service: ProfileService) {

  }

  ngOnInit() {
    this.profile_service.directions()
    .then((response) => {
      console.log(response.json());
    })
    .catch((error) => {
      swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
    });
    
  }

}
