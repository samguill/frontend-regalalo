import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { StoresComponent } from './components/stores/stores.component';
import { RegisterComponent } from './components/register/register.component';
import { StoreComponent } from './components/store/store.component';
import { ProfileComponent } from './components/profile/profile.component';

import { AuthGuard } from './services/auth.guard';

const APP_ROUTES: Routes = [
    { path : '', component : HomeComponent },
    { path : 'catalogo-tiendas', component : StoresComponent, data: { state: 'stores' } },
    { path : 'register', component : RegisterComponent, data: { state: 'register' } },
    { path : 'profile', component : ProfileComponent, canActivate : [AuthGuard] },
    { path: 'tienda/:id', component: StoreComponent, data: {state: 'stores'} },
    { path: '**', pathMatch: 'full', redirectTo: '' },
  ];
  
  export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});