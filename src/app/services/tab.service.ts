import { Injectable } from '@angular/core';
import { Tab } from './../models/tab';

@Injectable()
export class TabService {

  private static _tabs: Tab[] = [new Tab(1, "Dog Dingo", "Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut."), 
  new Tab(2, "Horse Harry", "At vero eos et accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata sanctus est Lorem ipsum dolor sit amet.")];

  constructor() { }

  getTabs(): Promise<Array<Tab>> {
    return new Promise<Array<Tab>>((resolve, reject) => {
      resolve(TabService._tabs);
    });  
  }                                        
  
  getTab(id:number): Promise<Tab> {

    let tab: Tab;
    for (let i=0;i<TabService._tabs.length; i++) {
      if (TabService._tabs[i].id === id) {
        tab = TabService._tabs[i];
        break;
      }
    }
    return new Promise<Tab>((resolve, reject) => {
      resolve(tab);  
    });
    
  }

}