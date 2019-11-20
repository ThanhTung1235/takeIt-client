import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.route';
import { HttpClientModule } from '@angular/common/http';
import {SharedModule} from './component/shared.module';

@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        RouterModule.forRoot(appRoutes),
        HttpClientModule,
        SharedModule,
    ],
  providers: [],
  exports: [
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
