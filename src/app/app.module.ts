import { BrowserModule, Title } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgMasonryGridModule } from 'ng-masonry-grid';
import { AgmCoreModule } from '@agm/core';
import { ImageZoomModule } from 'angular2-image-zoom';
 
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
import { UserNameService } from './services/user-name.service';
import { UserLocationService } from './services/user-location.service';
import { SearchDataService } from './services/search-data.service';
import { SearchService } from './services/search.service';
import { ProductDataService } from './services/product-data.service';
import { CheckoutDataService } from './services/checkout-data.service';
import { CheckoutService } from './services/checkout.service';
import { OrdersService } from './services/orders.service';
import { WishlistService } from './services/wishlist.service';
import { LoaderService } from './services/loader.service';
import { FaqService } from './services/faq.service';
import { BlogService } from './services/blog.service';
import { BrandService } from './services/brand.service';
import { ServiceService } from './services/service.service';
import { loadingInterceptor } from './services/loadingInterceptor';
import { ContactService } from "./services/contact.service";

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
import { NguCarouselModule } from '@ngu/carousel';
import { CeiboShare } from 'ng2-social-share';
import 'hammerjs';
import { PageComponent } from './components/page/page.component';
import { SearchFilterPipe } from './pipes/search-filter.pipe';
import { BlogComponent } from './components/blog/blog.component';
import { PostComponent } from './components/post/post.component';
import { OfferComponent } from './components/offer/offer.component';
import { UserNameComponent } from './components/shared/user-name/user-name.component';
import { UserLocationComponent } from './components/shared/user-location/user-location.component';
import { RegisterStoreComponent } from './components/register-store/register-store.component';
import { InfiniteScrollModule } from 'angular2-infinite-scroll';
import { BrandComponent } from './components/brand/brand.component';
import { ServiceComponent } from './components/service/service.component';
import { ContactComponent } from './components/contact/contact.component';

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
    FaqComponent,
    PageComponent,
    SearchFilterPipe,
    BlogComponent,
    PostComponent,
    OfferComponent,
    UserNameComponent,
    UserLocationComponent,
    RegisterStoreComponent,
    BrandComponent,
    ServiceComponent,
    CeiboShare,
    ContactComponent
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
    Ng4GeoautocompleteModule.forRoot(),
    NguCarouselModule,
    InfiniteScrollModule,
    ImageZoomModule
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
    BlogService,
    BrandService,
    ServiceService,
    LoaderService,
    UserNameService,
    UserLocationService,
    ContactService,
    Title,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: loadingInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
