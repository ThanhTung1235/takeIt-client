import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductDetailComponent } from './product-detail.component';
import { RouterModule, Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '', component: ProductDetailComponent,
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductDetailComponent]
})
export class ProductDetailModule { }
