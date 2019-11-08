import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { Routes, Router, RouterModule } from '@angular/router';
import { TopNavComponent } from '../../layout/top-nav/top-nav.component';
import { GiftService } from 'src/app/service/gift.service';
import { GiftCardComponent } from 'src/app/component/gift/gift-card/gift-card.component';
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
export class ProductListModule { }
