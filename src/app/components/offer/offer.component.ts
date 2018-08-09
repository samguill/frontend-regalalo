import { Component, OnInit } from '@angular/core';
import {Meta, Title} from '@angular/platform-browser';

@Component({
  selector: 'app-offer',
  templateUrl: './offer.component.html',
  styleUrls: ['./offer.component.scss']
})
export class OfferComponent implements OnInit {

  constructor(private title_service:Title) {
    this.title_service.setTitle("Regálalo | Tu regalo ideal");
  }

  ngOnInit() {
  }

}
