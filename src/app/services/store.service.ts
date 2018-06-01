import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StoreService {
  
  private BASE_URL : string = 'https://admin.regalalo.pe/api/';
  //private BASE_URL : string = 'http://regalalo.test/api/';
  private headers = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private httpClient: HttpClient) { }

  stores () : Promise<any> {
    let url : string = `${this.BASE_URL}stores`;
    return this.httpClient.get(url, {headers : this.headers}).toPromise();
  }

  store_products (slug:string) : Promise<any> {
    let url : string = `${this.BASE_URL}store/products`;
    return this.httpClient.post(url, {slug:slug}, {headers : this.headers}).toPromise();
  }
}
