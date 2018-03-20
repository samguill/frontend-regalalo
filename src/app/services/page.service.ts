import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class PageService {

  private BASE_URL : string = 'http://regalalo.test/api/';
  private headers : Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http) { }

  parameters () : Promise<any> {
    let url : string = `${this.BASE_URL}home`;
    return this.http.get(url, {headers : this.headers}).toPromise();
  }

}
