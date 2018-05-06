import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { BookService } from '../../services/book.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'FilterCateComponent',
  templateUrl: './filter-cate.component.html',
  styleUrls: ['./filter-cate.component.css']
})
export class FilterCateComponent implements OnInit {
  list = [];
  isFiltered: boolean = false;
  value = '';

  constructor(private BookService: BookService, private Http: Http, private StateService: StateService) {
    this.StateService.getState().subscribe(data => {
      this.isFiltered = data.isFiltered;
    });
  }

  ngOnInit() {
    this.Http.get('http://hieu1801.000webhostapp.com/api/cate')
    .subscribe(data => {
      this.list = data.json();
    });

    this.BookService.receiveParams().subscribe(data => {
      this.value = data.cate || '';
    });
  }

  filter(event){
    this.BookService.sendParams({cate: event.target.value, page: 1});
  }

}
