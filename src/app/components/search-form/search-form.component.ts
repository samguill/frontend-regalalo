import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormArray, FormControl, FormBuilder } from '@angular/forms';

import { PageService } from './../../services/page.service';
import { SearchDataService } from './../../services/search-data.service';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.css']
})
export class SearchFormComponent implements OnInit {

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
    private page: PageService,
    private fb: FormBuilder,
    private search_data: SearchDataService) {

    this.getParameters();

    this.events_selected = this.fb.group({
      events: this.fb.array([])
    });

    this.interests_selected = this.fb.group({
      interests: this.fb.array([])
    });

    let client_search = JSON.parse(localStorage.getItem('search'));
  }

  ngOnInit() {
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
    let data : any = {};
    data["sex"] = this.sex;
    data["ages"] = [parseInt(this.age)];
    data["budget_from"] = this.budget_from;
    data["budget_to"] = this.budget_to;
    data["events"] = this.eventsArray.value;
    data["interests"] = this.interestsArray.value;
    data["availability"] = this.availability;

    this.search_data.setData(data);
    this.router.navigate(['/busqueda']);
  }

}
