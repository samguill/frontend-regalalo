import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class CheckoutService {

  private BASE_URL : string = 'https://admin.regalalo.pe/api/';
  //private BASE_URL : string = 'http://regalalo.test/api/';
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

  generate_payment(data:any): Promise<any> {
    let access_token = sessionStorage.getItem('access_token');
    this.headers.append('Authorization', 'Bearer ' + access_token);
    let url : string = `${this.BASE_URL}orders/generate`;
    return this.http.post(url, data, {headers : this.headers}).toPromise();
  }

  integracion_delivery_calculate (data:any) : Promise<any> {
    let url : string = `${this.BASE_URL}integration/orders/calculatedelivery`;
    return this.http.post(url, data, {headers : this.headers}).toPromise();
  }

  integracion_generate_payment(data:any): Promise<any> {
    let access_token = sessionStorage.getItem('access_token');
    this.headers.append('Authorization', 'Bearer ' + access_token);
    let url : string = `${this.BASE_URL}integration/orders/generate`;
    return this.http.post(url, data, {headers : this.headers}).toPromise();
  }

}
