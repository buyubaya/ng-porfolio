import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class UserService {
  private subject = new Subject<any>();

  host = 'http://hieu1801.000webhostapp.com';

  constructor(private Http: Http) { }

  login(){
    
  }

}
