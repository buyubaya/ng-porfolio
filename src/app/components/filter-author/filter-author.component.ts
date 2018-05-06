import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { BookService } from '../../services/book.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'FilterAuthorComponent',
  templateUrl: './filter-author.component.html',
  styleUrls: ['./filter-author.component.css']
})
export class FilterAuthorComponent implements OnInit {
  list = [];
  isFiltered: boolean = false;

  constructor(private BookService: BookService, private Http: Http, private StateService: StateService) {
    this.StateService.getState().subscribe(data => {
      this.isFiltered = data.isFiltered;
    });
  }

  ngOnInit() {
    this.Http.get('http://hieu1801.000webhostapp.com/api/author')
    .subscribe(data => {
      this.list = data.json();
    });
  }

  filter(event){
    this.BookService.sendParams({author: event.target.value, page: 1});
  }

}
