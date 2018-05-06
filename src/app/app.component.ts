import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'MyBook';

  ngOnInit(){
    $('.loading01').remove();
    $(function(){
      $(".ttlPorfolio>span").typed({
        strings: ["Hello there, ^333I am Hieu.", "Welcome to ...", "... my PORFOLIO !"], // ^{number} denotes time in ms to wait
        typeSpeed: 120,
        startDelay: 0,
        backSpeed: 0,
        backDelay: 800,
        loop: true,
        loopCount: false, // false = infinite
        showCursor: true,
        cursorChar: "|",
        attr: null, // attribute to type (null == text)
        contentType: 'html', // either html or text
        
        // call when done callback function
        callback: function() {}, 
        // starting callback function before each string
        preStringTyped: function() {},
        //callback for every typed string
        onStringTyped: function() {},
        // callback for reset
        resetCallback: function() {}
      });
    });
  }
}
