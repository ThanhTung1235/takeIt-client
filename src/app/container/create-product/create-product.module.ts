import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateProductComponent } from './create-product.component';
import { Routes, RouterModule } from '@angular/router';
export const routes: Routes = [
  {
    path: '', component: CreateProductComponent,
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [CreateProductComponent]
})
export class CreateProductModule { }
