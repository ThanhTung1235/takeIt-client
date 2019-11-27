import { NgModule } from "@angular/core";
import { Routes, RouterModule } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/component/shared.module';

const route: Routes = [
    { path: '', component: ProfileComponent }
]
@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(route),
        SharedModule
    ],
    exports: [
        ProfileComponent
    ],
    declarations: [ProfileComponent]
})
export class ProfileModule { }