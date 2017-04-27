import { ModuleWithProviders }  from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component';
import { AuthenComponent } from './authen/authen.component';
import { DeviceComponent } from './device/device.component';
import { UserComponent } from './user/user.component';
import { SpeechComponent } from './speech/speech.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';

const appRoutes: Routes = [
    { path: '', component: AuthenComponent },
    { path: 'home', component: HomeComponent },
    { path: 'device', component: DeviceComponent },
    { path: 'device/:id', component: DeviceDetailComponent },
    { path: 'user', component: UserComponent },
    { path: 'speech', component: SpeechComponent }
];

export const routing: ModuleWithProviders = RouterModule.forRoot(appRoutes);