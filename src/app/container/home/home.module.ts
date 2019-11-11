import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { GiftCardComponent } from 'src/app/component/gift/gift-card/gift-card.component';
export const routes: Routes = [
  {
    path: '', component: HomeComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    HomeComponent,
  ],
  declarations: [
    HomeComponent,
    GiftCardComponent
  ]
})
export class HomeModule { }
