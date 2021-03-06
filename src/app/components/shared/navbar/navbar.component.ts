import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './../../../services/auth.service';
import { Router } from '@angular/router';
import { SearchDataService } from '../../../services/search-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isLoggedIn$: Observable<boolean>;
  client_name: string = "Visitante";
  direction: string = "";
  client: any;

  constructor(private search_data: SearchDataService,
    private router: Router,
    private authService: AuthService) { }

  ngOnInit() {
    this.isLoggedIn$ = this.authService.isLoggedIn();
    this.client = JSON.parse(sessionStorage.getItem("client"));
    if(this.client){
      this.client_name = this.client.first_name + " " + this.client.last_name;
    }
    this.direction = localStorage.getItem("address");
  }

  salir(){
    this.authService.logout();
    this.router.navigate(['/']);
  }

  location_search(){
    let searchData = {
      searchtext: "",
      type: "quick"
    };
    this.search_data.sendData(searchData);
    this.router.navigate(['/busqueda']);
  }

}
