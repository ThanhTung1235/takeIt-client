import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { Routes, RouterModule } from '@angular/router';
import { CardComponent } from 'src/app/component/product/card/card.component';
export const routes: Routes = [
  {
    path: '', component: HomeComponent,
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  declarations: [
    HomeComponent,
    CardComponent
  ]
})
export class HomeModule { }
