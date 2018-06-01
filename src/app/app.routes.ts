import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { StoresComponent } from './components/stores/stores.component';
import { RegisterComponent } from './components/register/register.component';
import { StoreComponent } from './components/store/store.component';

import { ProfileComponent } from './components/profile/profile.component';
import { OrdersComponent } from './components/orders/orders.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';

import { SearchResultComponent } from './components/search-result/search-result.component';
import { ProductComponent } from './components/product/product.component';
import { CheckoutComponent } from './components/checkout/checkout.component';

import { AuthGuard } from './services/auth.guard';

const APP_ROUTES: Routes = [
    { path : '', component : HomeComponent },
    { path : 'catalogo-tiendas', component : StoresComponent, data: { state: 'stores' } },
    { path : 'register', component : RegisterComponent, data: { state: 'register' } },
    { path: 'busqueda', component: SearchResultComponent},
    { path : 'mi-cuenta', component : ProfileComponent, canActivate : [AuthGuard] },
    { path : 'mis-pedidos', component : OrdersComponent, canActivate : [AuthGuard] },
    { path : 'mi-lista-de-deseos', component : WishlistComponent, canActivate : [AuthGuard] },
    { path: 'tienda/:id', component: StoreComponent, data: {state: 'stores'} },
    { path: 'producto/:id', component: ProductComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' },
  ];
  
  export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});