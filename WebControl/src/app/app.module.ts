import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { routing } from './app.routing';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AuthenComponent } from './authen/authen.component';
import { NetpieComponent } from './netpie/netpie.component';

@NgModule({
  declarations: [
    AppComponent,
    NetpieComponent,
    HomeComponent,
    AuthenComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    routing
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
