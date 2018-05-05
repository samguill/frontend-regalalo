import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class OrdersService {

  private BASE_URL : string = 'https://adminv2.regalaloprueba.com/api/';
  //private BASE_URL : string = 'http://regalalo.test/api/';
  private headers : Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http) { }

  list (client_id) : Promise<any> {
    let url : string = `${this.BASE_URL}orders/list`;
    return this.http.post(url, {client_id:client_id}, {headers : this.headers}).toPromise();
  }

}
