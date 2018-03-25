import { Component, AfterViewInit } from '@angular/core';
import { Router, NavigationStart, NavigationCancel, NavigationEnd } from '@angular/router';

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
export class AppComponent implements AfterViewInit {
  loading;
  title = 'app';

  constructor(private router: Router){
    this.loading = true;
  }

  ngAfterViewInit(){
    this.router.events
      .subscribe((event) => {
        if(event instanceof NavigationStart){
          this.loading = true;
        }
        else if(event instanceof NavigationEnd || event instanceof NavigationCancel){
          this.loading = false;
        }
      });
  }

}
