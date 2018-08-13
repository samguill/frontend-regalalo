import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';

@Injectable()
export class ContactService {

  private BASE_URL : string = 'https://admin.regalalo.pe/api/client';
  //private BASE_URL : string = 'http://regalalo.test/api/client';
  private headers : Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http) { }

  send_message (data:any) : Promise<any> {
    let url : string = `${this.BASE_URL}/contact`;
    return this.http.post(url, data, {headers : this.headers}).toPromise();
  }

}
