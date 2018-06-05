import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMasonryGridModule } from 'ng-masonry-grid';
import { AgmCoreModule } from '@agm/core';
 
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { APP_ROUTING } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { StoresComponent } from './components/stores/stores.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { ProductService } from './services/product.service';

// Services
import { AuthService } from './services/auth.service';
import { PageService } from './services/page.service';
import { StoreService } from './services/store.service';
import { AuthGuard } from './services/auth.guard';
import { ProfileService } from './services/profile.service';
import { SearchDataService } from './services/search-data.service';
import { SearchService } from './services/search.service';
import { ProductDataService } from './services/product-data.service';
import { CheckoutDataService } from './services/checkout-data.service';
import { CheckoutService } from './services/checkout.service';
import { OrdersService } from './services/orders.service';
import { WishlistService } from './services/wishlist.service';
import { LoaderService } from './services/loader.service';
import { FaqService } from './services/faq.service';
import { loadingInterceptor } from './services/loadingInterceptor';

import { StoreComponent } from './components/store/store.component';
import { OnlyNumber } from './directives/only-number.directive';
import { SearchResultComponent } from './components/search-result/search-result.component';
import { ProductComponent } from './components/product/product.component';
import { SearchFormComponent } from './components/search-form/search-form.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { OrdersComponent } from './components/orders/orders.component';
import { LoaderComponent } from './components/loader/loader.component';
import { QuickSearchFormComponent } from './components/quick-search-form/quick-search-form.component';

import { OwlModule } from 'ngx-owl-carousel';
import { FaqComponent } from './components/faq/faq.component';
import { Ng4GeoautocompleteModule } from 'ng4-geoautocomplete';
import { AgmDirectionModule } from 'agm-direction';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavbarComponent,
    StoresComponent,
    RegisterComponent,
    FooterComponent,
    ProfileComponent,
    StoreComponent,
    OnlyNumber,
    SearchResultComponent,
    ProductComponent,
    SearchFormComponent,
    CheckoutComponent,
    OrdersComponent,
    LoaderComponent,
    QuickSearchFormComponent,
    FaqComponent
  ],
  imports: [
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyBJ0XvtnWS6I60xHgZ7u_rRc8aGFzBYEXQ",
      libraries: ["places"]
    }),
    AgmDirectionModule,
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    HttpClientModule,
    NgMasonryGridModule,
    APP_ROUTING,
    NgbModule.forRoot(),
    OwlModule,
    Ng4GeoautocompleteModule.forRoot()
  ],
  providers: [
    AuthService,
    PageService,
    StoreService,
    AuthGuard,
    ProfileService,
    SearchDataService,
    SearchService,
    ProductDataService,
    ProductService,
    CheckoutDataService,
    CheckoutService,
    OrdersService,
    WishlistService,
    FaqService,
    LoaderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: loadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
