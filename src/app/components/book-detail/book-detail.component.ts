import { Component, OnInit, AfterViewChecked, AfterViewInit, OnDestroy } from '@angular/core';
import { Http } from '@angular/http';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { CartService } from '../../services/cart.service';
import { BookService } from '../../services/book.service';
declare var $:any;

@Component({
  selector: 'BookDetailComponent',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.css']
})
export class BookDetailComponent implements OnInit {
  item = null;
  relatedList = [];
  breadcrumb = [];

  constructor(private Http: Http, private router: Router, private route: ActivatedRoute, private CartService: CartService, private BookService: BookService) {}

  ngOnInit() {
    this.route.params.subscribe(data => {
      this.Http.get('http://hieu1801.000webhostapp.com/api/product?id='+data.id).subscribe(data => {
        this.item = data.json();
        this.Http.get('http://hieu1801.000webhostapp.com/api/cate').subscribe(data2 => {
          var cateList = data2.json();
          this.breadcrumb = this.getBreadcrumb(cateList,data.json().cate_id);
        });
      });
      this.Http.get('http://hieu1801.000webhostapp.com/api/product?related_id='+data.id).subscribe(data => {
        this.unslick();
        this.relatedList = data.json().list;
      });
    });
  }

  slick(){
    $('.slickSlider').not('.slick-initialized').slick({
      slidesToShow: 4,
      slidesToScroll: 4,
      prevArrow: '<span class="slick-prev fa fa-angle-left"></span>', 
      nextArrow: '<span class="slick-next fa fa-angle-right"></span>',
      infinite: false,
      responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
            }
          }
      ]
    });  
  }

  unslick(){
    $('.slickSlider').slick('unslick');
  }

  ngAfterViewChecked() {
    this.slick();
  }

  addToCart(id){
    var cartList = (localStorage.cartList !== undefined )?JSON.parse(localStorage.cartList):[];
    var check = cartList.find(item => {
      return item.id*1 === id*1;
    });
    if(typeof check === 'undefined'){
      this.imgFly($(event.target));
      this.CartService.addToCart(id);  
    }else {
      this.showAlert('Item is already in your cart !','error');
    }
  }

  imgFly(x){
    var card = x.closest("[data-fly-start]"),
    imgSrc = card.find("[data-fly-img]").attr("src");
    var img = $("<img>");
    img.attr("src",imgSrc);
    $("body").append(img);

    img.css({
      width:  card.width(),
      position: 'absolute',
    }).offset({
      top: card.offset().top,
      left: card.offset().left
    }).animate({
      top: $("[data-fly-end]").offset().top + $("[data-fly-end]").outerHeight()/2,
      left: $("[data-fly-end]").offset().left + $("[data-fly-end]").outerWidth()/2,
      opacity: 0,
      width: 0
    },1000,function(){
      img.remove();
    });
  }

  showAlert(msg,error=null){
    if( $("#alertWrap").length < 1 ){
      $("body").append('<div id="alertWrap"></div>');
    }
    var alertTag = '<div class="alert '+error+'">'+ msg +'</div>';
    $("#alertWrap").append(alertTag);
    $("#alertWrap>.alert").last().animate({
        top: "-50px",
        opacity: 0.7
    },5000,function(){
        $(this).remove();
    });
  }

  getBreadcrumb(data,id,result=[]){
    for(var i=0,len=data.length; i<len; i++){
      if(data[i].id == id){
        result.push(data[i]);
        if(data[i].parent_id != 0){
          return this.getBreadcrumb(data,data[i].parent_id,result);   
        }
      }
    }
    return result.reverse();
  }

  goToBC(id){
    this.BookService.sendParams({cate: id});
  }

}
