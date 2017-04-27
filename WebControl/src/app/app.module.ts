// Libary
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

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
import { SpeechComponent } from './speech/speech.component';
import { DeviceDetailComponent } from './device-detail/device-detail.component';

// Service
import { SpeechService } from './shared/speech.service';
import { NetpieService } from './shared/netpie.service';

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
    SpeechComponent,
    DeviceDetailComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [
    SpeechService,
    NetpieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
