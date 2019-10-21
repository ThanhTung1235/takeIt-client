import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from './product-list.component';
import { Routes, RouterModule } from '@angular/router';
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
  declarations: [ProductListComponent]
})
export class ProductListModule { }
