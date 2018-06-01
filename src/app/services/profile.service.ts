import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class ProfileService {

  private BASE_URL : string = 'https://admin.regalalo.pe/api/client/';
  //private BASE_URL : string = 'http://regalalo.test/api/client/';
  private headers : Headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + localStorage.getItem('access_token')});

  constructor(private http:Http) { }

  profile () : Promise<any> {
    let url : string = `${this.BASE_URL}profile`;
    return this.http.get(url, {headers : this.headers}).toPromise();
  }

  directions () :Promise<any> {
    let url : string = `${this.BASE_URL}directions`;
    return this.http.get(url, {headers : this.headers}).toPromise();
  }

  wishlist () :Promise<any> {
    let url : string = `${this.BASE_URL}wishlist`;
    return this.http.get(url, {headers : this.headers}).toPromise();
  }

  add_to_wishlist (product_id) :Promise<any> {
    let url : string = `${this.BASE_URL}wishlist/create`;
    return this.http.post(url, {product_id:product_id},{headers : this.headers}).toPromise();
  }

  remove_to_wishlist (product_id) :Promise<any> {
    let url : string = `${this.BASE_URL}wishlist/delete`;
    return this.http.post(url, {id:product_id},{headers : this.headers}).toPromise();
  }

}
