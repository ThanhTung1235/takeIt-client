import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeModule } from '../home/home.module';
export const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomeModule) },
      { path: 'product-add', loadChildren: () => import('../product/product-create/product-create.module').then(m => m.ProductCreateModule) },
      { path: 'product/:productId', loadChildren: () => import('../product/product-detail/product-detail.module').then(m => m.ProductDetailModule) },
      { path: 'products', loadChildren: () => import('../product/product-list/product-list.module').then(m => m.ProductListModule) }

    ]
  }
];
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
  exports: [
    LayoutComponent,
    HeaderComponent,
    FooterComponent
  ],
  bootstrap: [LayoutComponent]
})
export class LayoutModule { }
