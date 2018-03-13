import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { StoresComponent } from './components/stores/stores.component';
import { RegisterComponent } from './components/register/register.component';

const APP_ROUTES: Routes = [
    { path : '', component : HomeComponent },
    { path : 'stores', component : StoresComponent },
    { path : 'register', component : RegisterComponent },
    { path: '**', pathMatch: 'full', redirectTo: '' }
  ];
  
  export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash: true});