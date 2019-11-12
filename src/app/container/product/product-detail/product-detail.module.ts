import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail.component';
import { Routes, RouterModule } from '@angular/router';
import {SharedModule} from '../../../component/shared.module';
export const routes: Routes = [
  {
    path: '', component: ProductDetailComponent,
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  declarations: [ProductDetailComponent]
})
export class ProductDetailModule { }
