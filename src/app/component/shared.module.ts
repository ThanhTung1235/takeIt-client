import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GiftCardComponent} from './gift/gift-card/gift-card.component';
import {TopNavComponent} from './top-nav/top-nav.component';
import {RouterModule} from '@angular/router';
import {SlideComponent} from './slide/slide.component';



@NgModule({
  declarations: [
    GiftCardComponent,
    TopNavComponent,
    SlideComponent
  ],
  imports: [
    CommonModule,
    RouterModule
  ],
  exports: [
    GiftCardComponent,
    TopNavComponent,
    SlideComponent
  ]
})
export class SharedModule { }
