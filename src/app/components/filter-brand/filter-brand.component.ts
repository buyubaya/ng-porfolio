import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { BookService } from '../../services/book.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'FilterBrandComponent',
  templateUrl: './filter-brand.component.html',
  styleUrls: ['./filter-brand.component.css']
})
export class FilterBrandComponent implements OnInit {
  list = [];
  isFiltered: boolean = false;

  constructor(private BookService: BookService, private Http: Http, private StateService: StateService) {
    this.StateService.getState().subscribe(data => {
      this.isFiltered = data.isFiltered;
    });
  }

  ngOnInit() {
    this.Http.get('http://hieu1801.000webhostapp.com/api/brand')
    .subscribe(data => {
      this.list = data.json();
    });
  }

  filter(event){
    this.BookService.sendParams({brand: event.target.value, page: 1});
  }

}
