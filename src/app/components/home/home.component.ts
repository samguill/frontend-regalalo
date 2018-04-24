import { FormGroup, FormArray, FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {Meta} from '@angular/platform-browser';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { PageService } from './../../services/page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private router: Router,
    private meta:Meta,
    private http: Http) {
    this.meta.addTag({
      name: 'author', content: 'Regalalo'
    });
    this.meta.addTag({
      name: 'description', content: 'Tu regalo ideal'
    });
  }

  ngOnInit() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        let latitude = position.coords.latitude.toFixed(5);
        let longitude = position.coords.longitude.toFixed(5);
        let address = localStorage.getItem('address');
        if(address){ }else{
          this.http.get('http://maps.googleapis.com/maps/api/geocode/json?latlng=' + latitude + "," + longitude + "&sensor=false")
          .subscribe(data => {
            localStorage.setItem('address', data.json().results[0]['formatted_address']);
          });
        }

        localStorage.setItem('latitude', latitude.toString());
        localStorage.setItem('longitude', longitude.toString());
      });
    }
  }
}
