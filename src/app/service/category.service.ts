import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable, from } from 'rxjs';
import { ApiResult } from '../model/api-results';
import { Category } from '../model/category';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService extends BaseService {
  API_URL = environment.apiPublish + '/products/categories';

  getAll(): Observable<ApiResult<Category[]>> {
    return this.httpClient.get(this.API_URL, { headers: this.addRequestHeader }).pipe(
      map(x => {
        console.log(x)
        return x as ApiResult<Category[]>;
      })
    );
  }
}
