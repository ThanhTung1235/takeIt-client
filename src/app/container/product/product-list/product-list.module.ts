import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { Routes, Router, RouterModule } from '@angular/router';
import { TopNavComponent } from '../../../component/top-nav/top-nav.component';
import { GiftService } from 'src/app/service/gift.service';
import { GiftCardComponent } from 'src/app/component/gift/gift-card/gift-card.component';
import {SharedModule} from '../../../component/shared.module';
import { FormsModule } from '@angular/forms';

export const routes: Routes = [
  {
    path: '', component: ProductListComponent,
  }
]
@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
    FormsModule
  ],
  declarations: [
    ProductListComponent
  ],
  bootstrap: [
    ProductListComponent
  ],
  providers: [
    GiftService
  ]
})

export class ProductListModule { }
