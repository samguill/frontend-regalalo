import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CheckoutService {

  private BASE_URL : string = 'http://adminv2.regalaloprueba.com/api/';
  private headers : Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http) { }

  delivery_calculate (data:any) : Promise<any> {
    let url : string = `${this.BASE_URL}orders/calculatedelivery`;
    return this.http.post(url, data, {headers : this.headers}).toPromise();
  }

  payment(data:any): Promise<any> {
    let url : string = `${this.BASE_URL}orders/store`;
    return this.http.post(url, data, {headers : this.headers}).toPromise();
  }

}
