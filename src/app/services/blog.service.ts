import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class BlogService {

  private BASE_URL : string = 'https://admin.regalalo.pe/api/';
  private headers = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private httpClient: HttpClient) { }

  posts () : Promise<any> {
    let url : string = `${this.BASE_URL}posts`;
    return this.httpClient.get(url, {headers : this.headers}).toPromise();
  }

  post (slug) : Promise<any> {
    let url : string = `${this.BASE_URL}post/` + slug;
    return this.httpClient.get(url, {headers : this.headers}).toPromise();
  }

}
