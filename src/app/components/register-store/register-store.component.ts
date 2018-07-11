import { Component, OnInit } from '@angular/core';
declare const App: any;

@Component({
  selector: 'app-register-store',
  templateUrl: './register-store.component.html',
  styleUrls: ['./register-store.component.scss']
})
export class RegisterStoreComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {
    if (!!App && App.hasOwnProperty('MultiStepForm')) {
      App.MultiStepForm();
    }
  }

}
