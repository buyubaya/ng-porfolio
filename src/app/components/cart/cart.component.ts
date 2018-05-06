import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'CartComponent',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  list = [];

  constructor(private CartService: CartService) {
    this.list = (localStorage.cartList === undefined)?[]:JSON.parse(localStorage.cartList);
  }

  ngOnInit() {
    this.CartService.getList().subscribe(data => {
      this.list = data;
    });
  }

  removeFromCart(id){
    this.CartService.removeFromCart(id);
  }

  updateQty(id,event){
    var value = (event.target.value>0)?event.target.value:1;
    this.CartService.updateQty(id,value);
  }

}
