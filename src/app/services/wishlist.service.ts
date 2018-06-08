import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class WishlistService {

  private BASE_URL : string = 'https://admin.regalalo.pe/api/client/wishlist';
  //private BASE_URL : string = 'http://regalalo.test/api/client/wishlist';
  private headers : Headers = new Headers({'Content-Type': 'application/json', 'Authorization': 'Bearer ' + sessionStorage.getItem('access_token')});

  constructor(private http:Http) {

  }

  lists () : Promise<any> {
    let url : string = `${this.BASE_URL}`;
    return this.http.get(url, {headers : this.headers}).toPromise();
  }
  
  add_item (data:any) : Promise<any> {
    let url : string = `${this.BASE_URL}/create`;
    return this.http.post(url, data, {headers : this.headers}).toPromise();
  }

  delete_item (data:any): Promise<any> {
    let url : string = `${this.BASE_URL}/delete`;
    return this.http.post(url, data, {headers : this.headers}).toPromise();
  }
}
