import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class FaqService {

  private BASE_URL : string = 'https://admin.regalalo.pe/api/';
  private headers = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private httpClient: HttpClient) { }

  get () : Promise<any> {
    let url : string = `${this.BASE_URL}faq`;
    return this.httpClient.get(url, {headers : this.headers}).toPromise();
  }

}
