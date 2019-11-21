import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable } from 'rxjs';
import { ApiResult } from '../model/api-results';
import { City, District } from '../model/address';
import { environment } from 'src/environments/environment';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AddressService extends BaseService {
  API_URL_PUBLISH = environment.apiPublish + '/address';
  getCities(): Observable<ApiResult<City[]>> {
    return this.httpClient.get(this.API_URL_PUBLISH + "/cities").pipe(
      map(x => {
        return x as ApiResult<City[]>
      })
    )
  }
  getDistricts(id: number): Observable<ApiResult<District[]>> {
    return this.httpClient.get(`${this.API_URL_PUBLISH}?ct-id=${id}`).pipe(
      map(x => {
        return x as ApiResult<District[]>
      })
    )
  }
}
