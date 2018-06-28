import { Injectable } from '@angular/core';
import { Observable, Subject, ReplaySubject } from 'rxjs';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class UserLocationService {

  private data:BehaviorSubject<string> = new BehaviorSubject<string>(null);
  private subject:Subject<string> = new ReplaySubject(1);

  constructor() { }

  get searchData(){
    return this.data.asObservable();
  }

  setData(data:string){
    this.data.next(data);
  }

  get $getSubject() : Observable<string> {
    return this.subject.asObservable();
  }

  resetObserver() : void {
    this.subject = new ReplaySubject(1);
  }

  sendData(data:string = '') : void {
    this.subject.next(data);
  }

}
