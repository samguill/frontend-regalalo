import { Component, AfterViewInit, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';
import { LoaderService } from './services/loader.service';

import {
  transition,
  trigger,
  query,
  style,
  animate,
  group,
  animateChild
} from '@angular/animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  loading;
  title = 'app';
  location : any;

  constructor(private router: Router, private loaderService: LoaderService){
  }

  showLoader: boolean = false;

  ngAfterViewInit() {
    
  }

  ngOnInit() {
    this.load();
  }

  load(){
    this.loaderService.status.subscribe((val: boolean) => {
      this.showLoader = val;
    });
  }

  ngAfterViewChecked() {
    
  }
}
