import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ServiceService {

  private BASE_URL : string = 'https://admin.regalalo.pe/api/';
  //private BASE_URL : string = 'http://regalalo.test/api/';
  private headers : Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http) {

  }

  detail (slug:string) : Promise<any> {
    let url : string = `${this.BASE_URL}service/detail`;
    return this.http.post(url, {slug:slug}, {headers : this.headers}).toPromise();
  }

}
