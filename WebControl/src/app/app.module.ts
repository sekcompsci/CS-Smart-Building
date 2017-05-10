// Libary
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule } from '@angular/http';

// Custom File
import { routing } from './app.routing';

// Component
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthenComponent } from './authen/authen.component';
import { AsideComponent } from './shared/aside/aside.component';
import { NavComponent } from './shared/nav/nav.component';
import { FooterComponent } from './shared/footer/footer.component';
import { DeviceComponent } from './device/device.component';
import { UserComponent } from './user/user.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';

// Service
import { SpeechService } from './shared/speech.service';
import { NetpieService } from './shared/netpie.service';
import { AuthenService } from './authen/authen.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AuthenComponent,
    AsideComponent,
    NavComponent,
    FooterComponent,
    DeviceComponent,
    UserComponent,
    DeviceDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule,
    routing
  ],
  providers: [
    SpeechService,
    NetpieService,
    AuthenService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
