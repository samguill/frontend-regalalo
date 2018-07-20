import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Http } from '@angular/http';

@Injectable()
export class SearchService {

  private BASE_URL : string = 'https://admin.regalalo.pe/api';
  //private BASE_URL : string = 'http://regalalo.test/api/';
  private headers = new HttpHeaders({'Content-Type':'application/json'});
  private http_headers = new Headers({'Content-Type':'application/json'});

  constructor(private httpClient: HttpClient, private http:Http) { }

  search (data:any) : Promise<any> {
    let url : string = `${this.BASE_URL}/products/search`;
    return this.httpClient.post(url, data, {headers : this.headers}).toPromise();
  }

  quicksearch(data:any) : Promise<any> {
    let url : string = `${this.BASE_URL}/quicksearch`;
    return this.httpClient.post(url, data, {headers : this.headers}).toPromise();
  }

  next_page(data:any): Promise<any> {
    let url : string = `${this.BASE_URL}/quicksearch`;
    return this.http.post(url, data, {headers : this.http_headers}).toPromise();
  }

}
