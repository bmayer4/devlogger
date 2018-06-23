import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject, of } from 'rxjs';

import { Log } from '../models/Log';

@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({ id: null, text: null, date: null});
  selectedLog =  this.logSource.asObservable();

  private stateSource = new BehaviorSubject<boolean>(true);
  stateClear =  this.stateSource.asObservable();

  constructor() {
    // this.logs = [
    //   {id: '1', text: 'Generated components', date: new Date('12/26/2017 12:54:23')},
    //   {id: '2', text: 'Added bootstrap', date: new Date('12/23/2017 9:33:20')},
    //   {id: '3', text: 'Added logs component', date: new Date('12/24/2017 8:05:44')}
    // ]
    this.logs = [];
   }

   getLogs(): Observable<Log[]> {
     if (localStorage.getItem('logs')) {
      this.logs = JSON.parse(localStorage.getItem('logs'));
     } 
     return of(this.logs.sort((a, b) => {
       return (a.date < b.date) ? 1 : -1;
     }));
     
   }

   setFormLog(log: Log) {
     this.logSource.next(log);
   }

   addLog(log: Log) {
    this.logs.unshift(log);
    //local storage only stores strings
    localStorage.setItem('logs', JSON.stringify(this.logs));
   }

   updateLog(log: Log) {
      this.logs.forEach((curr) => {
        if (log.id == curr.id) {
         curr.text = log.text;
         curr.date = log.date;
        }
      });

    localStorage.setItem('logs', JSON.stringify(this.logs));
   }

   deleteLog(log: Log) {
    this.logs.forEach((curr, index) => {
      if (log.id == curr.id) {
        this.logs.splice(index, 1);
      }
    });

    localStorage.setItem('logs', JSON.stringify(this.logs));
   }

   clearState() {
    this.stateSource.next(true);
   }
}
