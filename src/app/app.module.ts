import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { appRoutes } from './app.route';
import { LayoutModule } from './container/layout/layout.module';
import {HomeModule} from './container/home/home.module';
import {ProductListModule} from "./container/product-list/product-list.module";


@NgModule({
  declarations: [
    AppComponent
  ],
    imports: [
        BrowserModule,
        LayoutModule,
        RouterModule.forRoot(appRoutes),
        HomeModule,
        ProductListModule
    ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
