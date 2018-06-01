import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class WishlistService {

  private BASE_URL : string = 'https://admin.regalalo.pe/api/client/wishlist';
  //private BASE_URL : string = 'http://regalalo.test/api/client/wishlist';
  private headers : Headers = new Headers({'Content-Type': 'application/json'});
  private access_token = localStorage.getItem('token');

  constructor(private http:Http) {

  }

  lists (client_id:string) : Promise<any> {
    this.headers.append('Authorization', 'Bearer ' + this.access_token);
    let url : string = `${this.BASE_URL}`;
    return this.http.post(url, {client_id:client_id}, {headers : this.headers}).toPromise();
  }
  
  add_item (data:any) : Promise<any> {
    this.headers.append('Authorization', 'Bearer ' + this.access_token);
    let url : string = `${this.BASE_URL}/create`;
    return this.http.post(url, data, {headers : this.headers}).toPromise();
  }

  delete_item (data:any): Promise<any> {
    this.headers.append('Authorization', 'Bearer ' + this.access_token);
    let url : string = `${this.BASE_URL}/delete`;
    return this.http.post(url, data, {headers : this.headers}).toPromise();
  }
}
