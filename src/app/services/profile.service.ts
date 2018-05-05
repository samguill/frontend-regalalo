import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class ProfileService {

  private BASE_URL : string = 'https://adminv2.regalaloprueba.com/api/client/';
  private headers : Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http) { }

  login (token:string) : Promise<any> {
    let url : string = `${this.BASE_URL}profile`;
    return this.http.post(url, {token:token}, {headers : this.headers}).toPromise();
  }

  directions (token:string, client_id) :Promise<any> {
    this.headers.append('Authorization', 'Bearer ' + token);
    let url : string = `${this.BASE_URL}directions`;
    return this.http.post(url, {client_id:client_id}, {headers : this.headers}).toPromise();
  }

}
