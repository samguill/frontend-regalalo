import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Headers, Http } from '@angular/http';

@Injectable()
export class BrandService {

  private BASE_URL : string = 'https://admin.regalalo.pe/api';
  private headers_client_headers = new HttpHeaders({'Content-Type':'application/json'});
  private http_headers = new Headers({'Content-Type':'application/json'});

  constructor(private httpClient: HttpClient, private http:Http) { }

  get_products(data:any) : Promise<any> {
    let url : string = `${this.BASE_URL}/brand/products`;
    return this.httpClient.post(url, data, {headers : this.headers_client_headers}).toPromise();
  }

  next_page(data:any): Promise<any> {
    let url : string = `${this.BASE_URL}/brand/products`;
    return this.http.post(url, data, {headers : this.http_headers}).toPromise();
  }

}
