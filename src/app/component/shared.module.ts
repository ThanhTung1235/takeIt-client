import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GiftCardComponent} from './gift/gift-card/gift-card.component';
import {TopNavComponent} from './top-nav/top-nav.component';
import {RouterModule} from '@angular/router';



@NgModule({
  declarations: [
    GiftCardComponent,
    TopNavComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    GiftCardComponent,
    TopNavComponent
  ]
})
export class SharedModule { }
