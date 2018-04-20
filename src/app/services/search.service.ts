import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class SearchService {

  private BASE_URL : string = 'http://regalalo.test/products/search';
  private headers : Headers = new Headers({'Content-Type': 'application/json'});

  constructor(private http:Http) { }

  search (data:any) : Promise<any> {
    let url : string = `${this.BASE_URL}`;
    return this.http.post(url, data, {headers : this.headers}).toPromise();
  }

}
