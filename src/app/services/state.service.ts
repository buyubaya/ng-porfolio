import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class StateService {
  private subject = new Subject<any>();
  state = {};
  constructor() { }

  setState(state={}){
    this.state = Object.assign(this.state,state);
    this.subject.next(this.state);
  }

  getState(){
    return this.subject.asObservable();
  }

}
