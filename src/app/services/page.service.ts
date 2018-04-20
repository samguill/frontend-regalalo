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

  location_api () : Promise<any> {
    let api : string = 'AIzaSyDRlAt4Fftas-0hDsaPdbFW11wnKX1zMW8';
    let url : string = 'https://www.googleapis.com/geolocation/v1/geolocate?key=' + api;
    return this.http.post(url,{considerIp:true} ,{headers : this.headers}).toPromise();
  }

}
