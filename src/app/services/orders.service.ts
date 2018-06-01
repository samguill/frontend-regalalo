import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class OrdersService {

  private BASE_URL : string = 'https://admin.regalalo.pe/api/';
  //private BASE_URL : string = 'http://regalalo.test/api/';
  private headers : Headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});

  constructor(private http:Http) { }

  list () : Promise<any> {
    let url : string = `${this.BASE_URL}orders/list`;
    return this.http.get(url, {headers : this.headers}).toPromise();
  }

}
