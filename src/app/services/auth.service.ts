import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from './../models/user';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class AuthService {

  private BASE_URL : string = 'http://regalalo.test/api/client/';
  private headers : Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http) { }

  login (user:any) : Promise<any> {
    let url : string = `${this.BASE_URL}login`;
    return this.http.post(url, user, {headers : this.headers}).toPromise();
  }

  register(user: any) : Promise<any> {
    let url : string = `${this.BASE_URL}register`;
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }

}
