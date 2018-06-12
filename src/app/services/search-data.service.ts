import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs';

@Injectable()
export class SearchDataService {

  private data:BehaviorSubject<any> = new BehaviorSubject<any>(null);

  private subject:Subject<any> = new ReplaySubject(1);

  constructor() { }

  get searchData(){
    return this.data.asObservable();
  }

  setData(data:any = [], reload:boolean = false){
    this.data.next([data, reload]);
  }

  get $getSubject() : Observable<any> {
    return this.subject.asObservable();
  }

  resetObserver() : void {
    this.subject = new ReplaySubject(1);
  }

  sendData(data:any = []) : void {
    this.subject.next(data);
  }

}
