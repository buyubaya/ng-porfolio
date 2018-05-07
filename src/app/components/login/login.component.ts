import { Component, OnInit, AfterViewInit } from '@angular/core';
import { UserService } from '../../services/user.service';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
declare const gapi: any;

@Component({
  selector: 'LoginComponent',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user:any;
  form: any;

  constructor(private UserService: UserService, private FormBuilder: FormBuilder) { }

  ngOnInit() {
    this.form  = this.FormBuilder.group({
      name: ['', [Validators.required] ],
      password: ['', [Validators.required] ]
    });
  }

  public auth2: any;
  public googleInit() {
    gapi.load('auth2', () => {
      this.auth2 = gapi.auth2.init({
        client_id: '217542344558-junu6od12053eipcjqpharbergm7a87n.apps.googleusercontent.com',
        cookiepolicy: 'single_host_origin',
        scope: 'profile email'
      });
      this.attachSignin(document.getElementById('btnLoginGoogle'));
    });
  }
  public attachSignin(element) {
    this.auth2.attachClickHandler(element, {},
      (googleUser) => {

        let profile = googleUser.getBasicProfile();
        console.log('Token || ' + googleUser.getAuthResponse().id_token);
        console.log('ID: ' + profile.getId());
        console.log('Name: ' + profile.getName());
        console.log('Image URL: ' + profile.getImageUrl());
        console.log('Email: ' + profile.getEmail());
        //YOUR CODE HERE


      }, (error) => {
        alert(JSON.stringify(error, undefined, 2));
      });
  }

  ngAfterViewInit(){
    this.googleInit();
  }
  
}
