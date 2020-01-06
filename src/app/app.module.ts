import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { NgxAutocomPlaceModule } from 'NgxAutocomPlace';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    NgxAutocomPlaceModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
