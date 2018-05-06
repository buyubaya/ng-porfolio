import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'SortComponent',
  templateUrl: './sort.component.html',
  styleUrls: ['./sort.component.css']
})
export class SortComponent implements OnInit {
  isFiltered: boolean = false;

  constructor(private BookService: BookService, private StateService: StateService) {
    this.StateService.getState().subscribe(data => {
      this.isFiltered = data.isFiltered;
    });
  }

  ngOnInit() {
  }

  sort(event){
    this.BookService.sendParams({sort: event.target.value, page: 1});
  }

}
