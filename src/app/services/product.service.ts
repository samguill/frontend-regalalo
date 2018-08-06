import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ProductService {

  private BASE_URL : string = 'https://admin.regalalo.pe/api/';
  //private BASE_URL : string = 'http://regalalo.test/api/';
  private headers : Headers = new Headers({'Content-Type': 'application/json'});
  private client_headers = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private httpClient: HttpClient, private http:Http) { }

  detail (slug:string) : Promise<any> {
    let url : string = `${this.BASE_URL}product/detail`;
    return this.httpClient.post(url, {slug:slug}, {headers : this.client_headers}).toPromise();
    //return this.http.post(url, {slug:slug}, {headers : this.headers}).toPromise();
  }

  branche(store_branche_id) : Promise<any> {
    let url : string = `${this.BASE_URL}store/branche`;
    return this.http.post(url, {store_branche_id:store_branche_id}, {headers : this.headers}).toPromise();
  }

}
