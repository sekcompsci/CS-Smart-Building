import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthenComponent } from './authen/authen.component';
import { NetpieComponent } from './netpie/netpie.component';

const appRoutes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'authen', component: AuthenComponent },
    { path: 'netpie', component: NetpieComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);