import { Injectable } from '@angular/core';
import 'rxjs/add/operator/toPromise';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class PageService {

  private BASE_URL : string = 'https://admin.regalalo.pe/api/';
  //private BASE_URL : string = 'http://regalalo.test/api/';
  private headers = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private httpClient: HttpClient) { }

  parameters () : Promise<any> {
    let url : string = `${this.BASE_URL}search-parameters`;
    return this.httpClient.get(url, {headers : this.headers}).toPromise();
  }

  home () : Promise<any> {
    let url : string = `${this.BASE_URL}home`;
    return this.httpClient.get(url, {headers : this.headers}).toPromise();
  }

  location_api () : Promise<any> {
    let api : string = 'AIzaSyDRlAt4Fftas-0hDsaPdbFW11wnKX1zMW8';
    let url : string = 'https://www.googleapis.com/geolocation/v1/geolocate?key=' + api;
    return this.httpClient.post(url,{considerIp:true} ,{headers : this.headers}).toPromise();
  }

}
