import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { StoresComponent } from './components/stores/stores.component';
import { RegisterComponent } from './components/register/register.component';
import { StoreComponent } from './components/store/store.component';
import { FaqComponent } from './components/faq/faq.component';
import { PageComponent } from './components/page/page.component';

import { ProfileComponent } from './components/profile/profile.component';
import { OrdersComponent } from './components/orders/orders.component';

import { SearchResultComponent } from './components/search-result/search-result.component';
import { ProductComponent } from './components/product/product.component';
import { ServiceComponent } from './components/service/service.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

import { BlogComponent } from './components/blog/blog.component';
import { PostComponent } from './components/post/post.component';
import { BrandComponent } from './components/brand/brand.component';
import { OfferComponent } from './components/offer/offer.component';
import { RegisterStoreComponent } from './components/register-store/register-store.component';

import { AuthGuard } from './services/auth.guard';

const APP_ROUTES: Routes = [
    { path : '', component : HomeComponent },
    { path : 'catalogo-tiendas', component : StoresComponent, data: { state: 'stores' } },
    { path : 'blog', component : BlogComponent},
    { path : 'post/:id', component : PostComponent},
    { path : 'marca/:id', component : BrandComponent},
    { path : 'oferta/:id', component : OfferComponent},
    { path : 'register', component : RegisterComponent, data: { state: 'register' } },
    { path : 'vende-con-nosotros', component : RegisterStoreComponent, data: { state: 'vende-con-nosotros' } },
    { path: 'busqueda', component: SearchResultComponent},
    { path: 'faq', component: FaqComponent},
    { path : 'mi-cuenta', component : ProfileComponent, canActivate : [AuthGuard] },
    { path : 'mis-pedidos', component : OrdersComponent, canActivate : [AuthGuard] },
    { path: 'tienda/:id', component: StoreComponent, data: {state: 'stores'} },
    { path: 'producto/:id', component: ProductComponent },
    { path: 'servicio/:id', component: ServiceComponent },
    { path: 'page/:id', component: PageComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' },
  ];
  
  export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: false});