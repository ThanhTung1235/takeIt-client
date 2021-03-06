import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { Routes, RouterModule } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { HomeModule } from '../home/home.module';
import {SharedModule} from '../../component/shared.module';
import { FileSelectDirective, FileUploader, FileUploadModule } from 'ng2-file-upload';
import { FormsModule } from '@angular/forms';
export const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      { path: '', redirectTo: '/home', pathMatch: 'full' },
      { path: 'home', loadChildren: () => import('../home/home.module').then(m => m.HomeModule) },
      { path: 'product-add', loadChildren: () => import('../product/product-create/product-create.module').then(m => m.ProductCreateModule) },
      { path: 'product/:id', loadChildren: () => import('../product/product-detail/product-detail.module').then(m => m.ProductDetailModule) },
      { path: 'products', loadChildren: () => import('../product/product-list/product-list.module').then(m => m.ProductListModule) },
      { path: 'account/profile', loadChildren: () => import('../account/profile/profile.module').then(m => m.ProfileModule) }
    ]
  }
];
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    FileUploadModule,
    FormsModule
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
  bootstrap: [LayoutComponent],
  providers: []
})
export class LayoutModule { }
