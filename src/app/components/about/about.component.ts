import { Component, OnInit } from '@angular/core';
declare var $:any;

@Component({
  selector: 'AboutComponent',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    setTimeout(()=>{
      /********************************** SCORE **********************************/
      $("[progress]").each(function(){
        var $this = $(this);
        var percent = parseInt($this.attr("progress"));
        progress($this,percent);
        $(window).scroll(function(){
             progress($this,percent);    
        });
      });
      function progress(el,percent){
        var rect = el[0].getBoundingClientRect();
        if( rect.top < $(window).innerHeight() - 200 || rect.bottom < $(window).innerHeight() ){
             el.css("width",percent+"%");
        }
      }
        
      function parallaxScore(){	
       $("[data-parallax-score]").each(function(){
           var $this = $(this),
               scoreOptions = $(this).data("parallax-score").split(","),
               scoreParallax = parseInt(scoreOptions[0]),
               score = parseInt(scoreOptions[1]),
               scoreTime = parseInt(scoreOptions[2]);
           // INITIAL
           var scoreCheck = 1;
           var scoreRect = $this[0].getBoundingClientRect();
           if( (scoreRect.top < $(window).innerHeight() - scoreParallax || scoreRect.bottom < $(window).innerHeight()) && scoreCheck == 1 ){
               scoreCheck = 0;
               countUp($this,score,scoreTime);
           }
           // SCROLL
           $(window).scroll(function(){
               var scoreRect = $this[0].getBoundingClientRect();
               if( (scoreRect.top < $(window).innerHeight() - scoreParallax || scoreRect.bottom < $(window).innerHeight()) && scoreCheck == 1 ){
                 scoreCheck = 0;
                 countUp($this,score,scoreTime);
               }
           });
       });	
      }
      function countUp(el,score,time){
       var i = 0;
       var scoreFn = setInterval(function(){
           if(i < score){
               i++;
               el.html(i);
           }else {
               el.html(i);
               clearInterval(scoreFn);
           }								
       },time/score);
      }
      parallaxScore();
    },200);    
  
    $(".boxExp .titleInfo").click(function(){
      $(this).next().slideToggle(500,'swing');
    });

  }

}
