import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { GiftCardComponent } from 'src/app/component/gift/gift-card/gift-card.component';
import {SharedModule} from '../../component/shared.module';
export const routes: Routes = [
  {
    path: '', component: HomeComponent
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [
    HomeComponent,
  ],
  declarations: [
    HomeComponent
  ]
})
export class HomeModule { }
