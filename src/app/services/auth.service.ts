import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { User } from './../models/user';
import 'rxjs/add/operator/toPromise';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

export const TOKEN: string = 'access_token';

@Injectable()
export class AuthService {

  private BASE_URL : string = 'https://admin.regalalo.pe/api/client/';
  //private BASE_URL : string = 'http://regalalo.test/api/client/';
  private headers : Headers = new Headers({'Content-Type': 'application/json'});

  private loggedIn = new BehaviorSubject<boolean>(this.isTokenExist());

  constructor(private http:Http) { }

  login (user:any) : Promise<any> {
    let url : string = `${this.BASE_URL}login`;
    return this.http.post(url, user, {headers : this.headers}).toPromise();
  }

  register(user: any) : Promise<any> {
    let url : string = `${this.BASE_URL}register`;
    return this.http.post(url, user, {headers: this.headers}).toPromise();
  }

  getToken(): string {
    return sessionStorage.getItem(TOKEN);
  }

  isTokenExist(): boolean {
    let token = this.getToken();
    if(token){
      return true
    }else{
      return false
    };
  }

  isLoggedIn() :Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  setLogin(): void {
    this.loggedIn.next(true);
  }

  logout() : void {
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('refresh_token');
    sessionStorage.removeItem('client');
    this.loggedIn.next(false);
  }

  register_store(data:any){
    let URL = "https://admin.regalalo.pe/api/store/register";
    return this.http.post(URL, data, {headers: this.headers}).toPromise();
  }

}
