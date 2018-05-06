import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'SearchComponent',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  isFiltered: boolean = false;
  value;

  constructor(private BookService: BookService, private StateService: StateService) {
    this.StateService.getState().subscribe(data => {
      this.isFiltered = data.isFiltered;
    });
  }

  ngOnInit() {
  }

  search(event){
    this.BookService.sendParams({search: event.target.value, page: 1});
  }

}
