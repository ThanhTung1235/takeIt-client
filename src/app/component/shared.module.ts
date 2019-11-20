import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {GiftCardComponent} from './gift/gift-card/gift-card.component';
import {TopNavComponent} from './top-nav/top-nav.component';
import {RouterModule} from '@angular/router';
import {SlideComponent} from './slide/slide.component';
import { ProfileComponent } from './profile/profile.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import {FormsModule} from '@angular/forms';



@NgModule({
  declarations: [
    GiftCardComponent,
    TopNavComponent,
    SlideComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule
  ],
  exports: [
    GiftCardComponent,
    TopNavComponent,
    SlideComponent,
    ProfileComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class SharedModule { }
