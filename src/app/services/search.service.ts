import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class SearchService {

  private BASE_URL : string = 'https://admin.regalalo.pe/api';
  //private BASE_URL : string = 'http://regalalo.test/api/';
  private headers = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private httpClient: HttpClient) { }

  search (data:any) : Promise<any> {
    let url : string = `${this.BASE_URL}/products/search`;
    return this.httpClient.post(url, data, {headers : this.headers}).toPromise();
  }

  quicksearch(data:any) : Promise<any> {
    let url : string = `${this.BASE_URL}/quicksearch`;
    return this.httpClient.post(url, data, {headers : this.headers}).toPromise();
  }

}
