import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Subject, Observable } from 'rxjs';

@Injectable()
export class CartService {
  private subject = new Subject<any>(); 
  list:any = [];

  constructor(private Http: Http) { 
    this.list = (localStorage.cartList === undefined)?[]:JSON.parse(localStorage.cartList);
    this.subject.next(this.list);
  }

  getList(){
    return this.subject.asObservable();
  }

  addToCart(id){
    var check = this.list.find(item => {
      return item.id*1 === id*1;
    });
    if(typeof check === 'undefined'){
      this.Http.get('http://hieu1801.000webhostapp.com/api/product?id='+id)
      .subscribe(data => {
        var item = data.json();
        item.qty = 1;
        this.list.push(item);
        localStorage.setItem('cartList',JSON.stringify(this.list));
        this.subject.next(this.list);  
      }); 
    }
  }

  removeFromCart(id){
    this.list = this.list.filter(item => {
      return item.id*1 !== id*1;
    });  
    localStorage.setItem('cartList',JSON.stringify(this.list));  
    this.subject.next(this.list);  
  }

  updateQty(id,value){
    this.list.forEach(item => {
      if(item.id*1 === id*1){
        item.qty = value;
      }
    });
    localStorage.setItem('cartList',JSON.stringify(this.list));  
    this.subject.next(this.list);  
  }

}
