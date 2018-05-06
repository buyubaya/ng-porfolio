import { Component, OnInit } from '@angular/core';
import { BookService } from '../../services/book.service';
import { StateService } from '../../services/state.service';
import { CartService } from '../../services/cart.service';
declare var $:any;

@Component({
  selector: 'BookComponent',
  templateUrl: './book.component.html',
  styleUrls: ['./book.component.css']
})
export class BookComponent implements OnInit {
  list = [];
  currentPage:number = 1;
  limit:number = 8;
  totalPage:number;
  maxPage:number = 5;
  pageArr = [];
  pageStart:number;
  pageEnd:number;
  count:number;
  isLoading:boolean = true;
  isFiltered:boolean = false;

  constructor(private BookService: BookService, private StateService: StateService, private CartService: CartService) { }

  ngOnInit() {
    this.BookService.sendParams();
    this.getList();
    this.StateService.getState().subscribe(data => {
      this.isLoading = data.isLoading;
      this.isFiltered = data.isFiltered;
    });
  }

  getList(){;
    this.BookService.getList().subscribe(data => {
      this.list = data.list;
      this.count = data.count;

      this.currentPage = this.BookService.getParams().page;
      this.totalPage = Math.ceil(data.count/this.limit);
      this.pageStart = this.currentPage - (Math.ceil(this.maxPage/2) - 1);
      this.pageEnd = this.currentPage + Math.floor(this.maxPage/2);

  		if(this.pageStart < 1){
  			this.pageStart = 1;
  			this.pageEnd = this.pageStart + (this.maxPage-1);
  		}
  		if(this.pageEnd > this.totalPage){
  			this.pageEnd = this.totalPage;
  			this.pageStart = this.pageEnd - (this.maxPage-1);
  		}
  		this.pageStart = (this.pageStart>1)?this.pageStart:1;
  		this.pageEnd = (this.pageEnd<this.totalPage)?this.pageEnd:this.totalPage;

      let pageArr = [];
      for(let i=this.pageStart; i<=this.pageEnd; i++){
        pageArr.push(i);
      }
      this.pageArr = pageArr;
    });
  }

  toPage(event,i){
    event.preventDefault();
    this.BookService.sendParams({page: i});
  }

  addToCart(id,event){
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

  clearFilter(){
    this.BookService.clearFilter();
  }

}
