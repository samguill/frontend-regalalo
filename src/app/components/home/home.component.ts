import { SearchDataService } from './../../services/search-data.service';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import {Meta} from '@angular/platform-browser';
import { Router } from '@angular/router';

import { PageService } from './../../services/page.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  interests:any;
  events: any;
  experiences: any;
  location : any;

  events_selected: FormGroup;
  interests_selected: FormGroup;

  eventsArray: any = [];
  interestsArray: any = [];

  age: string;
  budget_from: string;
  budget_to: string;
  sex: string = "G";
  availability: string = "A";

  constructor(
    private router: Router,
    private meta:Meta,
    private page: PageService,
    private fb: FormBuilder,
    private search_data: SearchDataService) {
    this.meta.addTag({
      name: 'author', content: 'Regalalo'
    });
    this.meta.addTag({
      name: 'description', content: 'Tu regalo ideal'
    });

    this.getParameters();

    this.events_selected = this.fb.group({
      events: this.fb.array([])
    });

    this.interests_selected = this.fb.group({
      interests: this.fb.array([])
    });
  }

  ngOnInit() {
    if(navigator.geolocation){
      navigator.geolocation.getCurrentPosition(position => {
        let latitude = position.coords.latitude.toFixed(5);
        let longitude = position.coords.longitude.toFixed(5);
        localStorage.setItem('latitude', latitude.toString());
        localStorage.setItem('longitude', longitude.toString());
      });
    }
  }

  getParameters(){
    this.page.parameters()
      .then((response) => {
        if(response.json().status === "ok"){
          this.interests = response.json().interests;
          this.events = response.json().events;
          this.experiences = response.json().experiences;
        }else{
          alert("Ocurrió un error, inténtalo de nuevo.");
        }
      })
      .catch((error) => {
        alert("Ocurrió un error, inténtalo de nuevo.");
    })
  }

  onEventsChange(id:string, isChecked:boolean){
    this.eventsArray = <FormArray>this.events_selected.controls.events;
    if(isChecked) {
      this.eventsArray.push(new FormControl(id));
    }else{
      let index = this.eventsArray.controls.findIndex(x => x.value == id)
      this.eventsArray.removeAt(index);
    }
  }

  onInterestsChange(id:string, isChecked:boolean){
    this.interestsArray = <FormArray>this.interests_selected.controls.interests;
    if(isChecked) {
      this.interestsArray.push(new FormControl(id));
    }else{
      let index = this.interestsArray.controls.findIndex(x => x.value == id)
      this.interestsArray.removeAt(index);
    }
    
  }

  search(){
    let latitude = localStorage.getItem('latitude');
    let longitude = localStorage.getItem('longitude');

    let data : any = {};
    data["sex"] = this.sex;
    data["ages"] = [parseInt(this.age)];
    data["budget_from"] = this.budget_from;
    data["budget_to"] = this.budget_to;
    data["events"] = this.eventsArray.value;
    data["interests"] = this.interestsArray.value;
    data["availability"] = this.availability;
    
    if(latitude && longitude){
      data["latitude"] = latitude;
      data["longitude"] = longitude;
    }
    this.search_data.setData(data);
    this.router.navigate(['/busqueda']);
    //console.log(data);
  }

}
