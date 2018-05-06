import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject, Observable } from 'rxjs';
import { StateService } from './state.service';

@Injectable()
export class BookService {
  private subject = new Subject<any>();
  private subjectP = new Subject<any>();

  host = 'http://hieu1801.000webhostapp.com';

  defaultParams = {
    page: 1,
    limit: 8,
    price_min: 0,
    price_max: 2000000
  };

  params = {...this.defaultParams};
  
  constructor(private Http: Http, private StateService: StateService) { }

  getQuery(){
    let query:any = [];
  	for(let x in this.params){
  		let pair = x+'='+this.params[x];
  		query.push(pair);
  	}
    query = query.length>0?'?'+query.join('&'):'';
    return query;
  }

  checkFiltered(){
    var check = false;
    for(var x in this.params){
      if( x !== 'page' ){
        var dPv = (this.defaultParams[x] === undefined)?'':this.defaultParams[x];
        if(this.params[x] !== dPv){
          check = true;
        }
      }
    }
    return check;
  }

  sendParams(options={}){
    this.params = Object.assign(this.params,options);
    this.subjectP.next(this.params);
    this.StateService.setState({isFiltered: this.checkFiltered()});

    this.StateService.setState({isLoading: true});
    this.Http.get(this.host+'/api/product'+this.getQuery())
    .subscribe(data => { 
      this.subject.next(data.json());
      this.StateService.setState({isLoading: false});
    });
  }

  getParams(){
    return this.params;
  }

  receiveParams(){
    return this.subjectP.asObservable();
  }

  getList(){
    return this.subject.asObservable();
  }

  clearFilter(){
    this.params = {...this.defaultParams};
    this.sendParams();
  }

}
