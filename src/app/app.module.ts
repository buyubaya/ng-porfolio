import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { NouisliderModule } from 'ng2-nouislider';
import { RouterModule, Routes } from '@angular/router';

// COMPONENTS
import { AppComponent } from './app.component';
import { BookComponent } from './components//book/book.component';
import { SortComponent } from './components/sort/sort.component';
import { SearchComponent } from './components/search/search.component';
import { FilterCateComponent } from './components/filter-cate/filter-cate.component';
import { FilterBrandComponent } from './components/filter-brand/filter-brand.component';
import { FilterAuthorComponent } from './components/filter-author/filter-author.component';
import { NavigationComponent } from './components/navigation/navigation.component';
import { FilterPriceComponent } from './components/filter-price/filter-price.component';
import { BookDetailComponent } from './components/book-detail/book-detail.component';

// SERVICES
import { BookService } from './services/book.service';
import { StateService } from './services/state.service';
import { CartService } from './services/cart.service';
import { CartComponent } from './components/cart/cart.component';
import { PageContactComponent } from './components/page-contact/page-contact.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';

// ROUTER
const appRoutes: Routes = [
  { path: '', component: BookComponent },
  { path: 'about', component: AboutComponent },
  { path: 'product/:id', component: BookDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'contact', component: PageContactComponent },
  { path: 'register', component: RegisterComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    BookComponent,
    SortComponent,
    SearchComponent,
    FilterCateComponent,
    FilterBrandComponent,
    FilterAuthorComponent,
    NavigationComponent,
    FilterPriceComponent,
    CartComponent,
    BookDetailComponent,
    PageContactComponent,
    RegisterComponent,
    LoginComponent,
    AboutComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpModule, NouisliderModule, RouterModule.forRoot(appRoutes)
  ],
  providers: [BookService,StateService,CartService],
  bootstrap: [AppComponent]
})
export class AppModule { }
