import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductCreateComponent } from './product-create.component';
import { Routes, RouterModule } from '@angular/router';
import { FileUploadModule } from 'ng2-file-upload';
import { SharedModule } from 'src/app/component/shared.module';
import { FormsModule } from '@angular/forms';
import { ToastrModule } from 'ngx-toastr';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
export const routes: Routes = [
  {
    path: '', component: ProductCreateComponent,
  }
]
@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    FileUploadModule,
    SharedModule,
    FormsModule
  ],
  declarations: [ProductCreateComponent]
})
export class ProductCreateModule { }
