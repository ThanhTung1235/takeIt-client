import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCreateComponent } from './product-create.component';
import { Routes, RouterModule } from '@angular/router';
export const routes: Routes = [
  {
    path: '', component: ProductCreateComponent,
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [ProductCreateComponent]
})
export class ProductCreateModule { }
