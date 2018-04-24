import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class CheckoutDataService {

  private data:BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor() { }

  get productData(){
    return this.data.asObservable();
  }

  setData(data:any){
    this.data.next(data);
  }

}
