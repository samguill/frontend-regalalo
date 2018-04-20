import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';

@Injectable()
export class SearchDataService {

  private data:BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }

  get searchData(){
    return this.data.asObservable();
  }

  setData(data:any){
    this.data.next(data);
  }

}
