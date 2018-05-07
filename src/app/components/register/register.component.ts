import { Component, OnInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { AbstractControl, FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'RegisterComponent',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  form: any;

  constructor(private UserService: UserService, private FormBuilder: FormBuilder) { }

  ngOnInit() {
    this.form  = this.FormBuilder.group({
      name: ['', [Validators.required] ],
      passwordGroup: this.FormBuilder.group({
        password: ['', [Validators.required]],
        confirm_password: ['', [Validators.required]],
      }, {validator: this.confirmPassword}),
      email: ['', [Validators.required,
                  Validators.pattern('^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$')]],
      phone: ['', [Validators.required] ]
    })
  }

  confirmPassword(FC: FormControl){
    if ( FC.get('password').value !=='' && FC.get('confirm_password').value && FC.get('password').value !== FC.get('confirm_password').value) {
      return {match: true};
    }else {
      return null;
    }
  }

}
