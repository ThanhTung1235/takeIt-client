import {Injectable} from '@angular/core';
import {BaseService} from '../base.service';
import {Observable, from} from 'rxjs';
import {ApiResult} from '../model/api-results';
import {GiftResponse, Gift} from '../model/gift';
import {environment} from '../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class GiftService extends BaseService {
  API_URL_PUBLIC = environment.apiPublish + '/products';
  API_URL_STAF = environment.apiPublish + '/products';


  search(): Observable<ApiResult<GiftResponse[]>> {
    return this.httpClient.get(this.API_URL_PUBLIC).pipe(
      map(x => {
        return x as ApiResult<GiftResponse[]>;
      })
    );
  }

  saveGift(gift: Gift): Observable<ApiResult<Gift>> {
    return this.httpClient.post(this.API_URL_PUBLIC + '/create', gift, {headers: this.addRequestHeader}).pipe(
      map(response => {
        return response as ApiResult<Gift>;
      })
    );
  }

  getGift(id: number): Observable<ApiResult<GiftResponse>> {
    return this.httpClient.get(`${this.API_URL_PUBLIC}/${id}`, {headers: this.addRequestHeader}).pipe(
      map(response => {
        return response as ApiResult<GiftResponse>;
      })
    );
  }

}
