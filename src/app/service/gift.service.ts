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
  API_URL = environment.apiHost + '/products';

  getGifts(): Observable<ApiResult<GiftResponse[]>> {
    return this.httpClient.get(this.API_URL).pipe(
      map(x => {
        return x as ApiResult<GiftResponse[]>;
      })
    );
  }

  saveGift(gift: Gift): Observable<ApiResult<Gift>> {
    return this.httpClient.post(this.API_URL + '/create', gift, {headers: this.addRequestHeader}).pipe(
      map(response => {
        return response as ApiResult<Gift>;
      })
    );
  }

  getGift(id: number): Observable<ApiResult<GiftResponse>> {
    return this.httpClient.get(`${this.API_URL}/${id}`, {headers: this.addRequestHeader}).pipe(
      map(response => {
        return response as ApiResult<GiftResponse>;
      })
    );
  }

  getGiftsByCateId(id: number): Observable<ApiResult<GiftResponse[]>> {
    return this.httpClient.get(`${this.API_URL}/cate/${id}`).pipe(
      map(x => {
        return x as ApiResult<GiftResponse[]>;
      })
    );
  }

}
