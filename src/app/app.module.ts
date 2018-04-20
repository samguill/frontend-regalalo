import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {LoadingBarHttpModule} from '@ngx-loading-bar/http';
 
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Http, HttpModule } from '@angular/http';

import { APP_ROUTING } from './app.routes';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { StoresComponent } from './components/stores/stores.component';
import { RegisterComponent } from './components/register/register.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { ProfileComponent } from './components/profile/profile.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// Services
import { AuthService } from './services/auth.service';
import { PageService } from './services/page.service';
import { StoreService } from './services/store.service';
import { AuthGuard } from './services/auth.guard';
import { ProfileService } from './services/profile.service';
import {SearchDataService} from './services/search-data.service';
import { SearchService } from './services/search.service';

import { StoreComponent } from './components/store/store.component';
import { OnlyNumber } from './directives/only-number.directive';
import { SearchResultComponent } from './components/search-result/search-result.component';

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
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    FormsModule,
    HttpModule,
    APP_ROUTING,
    LoadingBarHttpModule,
    NgbModule.forRoot()
  ],
  providers: [
    AuthService,
    PageService,
    StoreService,
    AuthGuard,
    ProfileService,
    SearchDataService,
    SearchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
