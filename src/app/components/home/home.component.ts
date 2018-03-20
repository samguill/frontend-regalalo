import { Component, OnInit } from '@angular/core';
import {Meta} from '@angular/platform-browser';

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

  constructor(
    private meta:Meta,
    private page: PageService) {
    this.meta.addTag({
      name: 'author', content: 'Regalalo'
    });
    this.meta.addTag({
      name: 'description', content: 'Tu regalo ideal'
    });

    this.getParameters();
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

}
