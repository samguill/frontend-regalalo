import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class ProfileService {

  private BASE_URL : string = 'http://adminv2.regalaloprueba.com/api/client/';
  private headers : Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http) { }

  login (token:string) : Promise<any> {
    
    let url : string = `${this.BASE_URL}profile`;
    return this.http.post(url, {token:token}, {headers : this.headers}).toPromise();
  }

}
