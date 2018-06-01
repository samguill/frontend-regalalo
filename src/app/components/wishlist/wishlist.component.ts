import { Component, OnInit } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import swal from 'sweetalert2';

import { WishlistService } from './../../services/wishlist.service';
import { AuthService } from './../../services/auth.service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {

  constructor(private wishlist_service: WishlistService,
    private auth: AuthService) { }

  ngOnInit() {
    let token = this.auth.getToken();
    let decode_token:string = jwtDecode(token);
    let client: any = decode_token["client"];
    console.log(client);
    this.wishlist_service.lists(client.id)
    .then((response) => {
      console.log(response.json());
    })
    .catch((error) => {
      swal("Error", "Ocurrió un error, inténtalo de nuevo.", "error");
    });
  }

}
