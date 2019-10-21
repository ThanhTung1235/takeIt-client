import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { Routes, RouterModule } from "@angular/router"
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
export const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomeModule) },
      { path: 'create-product', loadChildren: () => import('../create-product/create-product.module').then(m => m.CreateProductModule) },
      { path: 'product-detail/:productId', loadChildren: () => import('../product-detail/product-detail.module').then(m => m.ProductDetailModule) },
      { path: 'product-list', loadChildren: () => import('../product-list/product-list.module').then(m => m.ProductListModule) },
    ]
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  bootstrap: [LayoutComponent]
})
export class LayoutModule { }
