import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class StoreService {
  
  private BASE_URL : string = 'https://adminv2.regalaloprueba.com/api/';
  private headers : Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http) { }

  stores () : Promise<any> {
    let url : string = `${this.BASE_URL}stores`;
    return this.http.get(url, {headers : this.headers}).toPromise();
  }

  store_products (slug:string) : Promise<any> {
    let url : string = `${this.BASE_URL}store/products`;
    return this.http.post(url, {slug:slug}, {headers : this.headers}).toPromise();
  }
}
