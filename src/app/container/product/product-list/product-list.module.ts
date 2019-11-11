<<<<<<< HEAD
import {NgModule, OnInit} from '@angular/core';
=======
import { NgModule } from '@angular/core';
>>>>>>> 9473f1566a4ea197c082421032b284aa5cd6790c
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { Routes, Router, RouterModule } from '@angular/router';
import { TopNavComponent } from '../../layout/top-nav/top-nav.component';
import { GiftService } from 'src/app/service/gift.service';
import { GiftCardComponent } from 'src/app/component/gift/gift-card/gift-card.component';
<<<<<<< HEAD
import {Gift, GiftResponse} from '../../../model/gift';
import {ApiResult} from '../../../model/api-results';
=======
>>>>>>> 9473f1566a4ea197c082421032b284aa5cd6790c
export const routes: Routes = [
  {
    path: '', component: ProductListComponent,
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    ProductListComponent,
    TopNavComponent,
    GiftCardComponent
  ],
  bootstrap: [
    ProductListComponent
  ],
  providers: [
    GiftService
  ]
})
<<<<<<< HEAD
export class ProductListModule {
  // tslint:disable-next-line:contextual-lifecycle
}
=======
export class ProductListModule { }
>>>>>>> 9473f1566a4ea197c082421032b284aa5cd6790c
