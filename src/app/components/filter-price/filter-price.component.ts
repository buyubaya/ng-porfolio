import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'FilterPriceComponent',
  templateUrl: './filter-price.component.html',
  styleUrls: ['./filter-price.component.css']
})
export class FilterPriceComponent implements OnInit {
  price_min:number = 0;
  price_max:number = 2000000;
  price:number[] = [0,2000000];
  isFiltered: boolean = false;

  constructor(private BookService: BookService, private StateService: StateService) {
    this.StateService.getState().subscribe(data => {
      this.isFiltered = data.isFiltered;
      if(!this.isFiltered){
        this.price = [this.price_min,this.price_max]
      }
    });
  }

  ngOnInit() { }

  update(event){
    this.BookService.sendParams({price_min: event[0], price_max: event[1], page: 1});
  }

  updateRange(min,max){
    this.price = [min*1,max*1];
    this.BookService.sendParams({price_min: min, price_max: max, page: 1});
  }

}
