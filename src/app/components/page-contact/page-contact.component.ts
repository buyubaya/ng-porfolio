import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'PageContactComponent',
  templateUrl: './page-contact.component.html',
  styleUrls: ['./page-contact.component.css']
})
export class PageContactComponent implements OnInit {
  form:any;

  constructor(private FormBuilder: FormBuilder) { }

  ngOnInit() {
    this.form  = this.FormBuilder.group({
        email: ['', [Validators.required,
                    Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
        phone: ['', [Validators.required] ],
        message: ['']
    })
  }

}
