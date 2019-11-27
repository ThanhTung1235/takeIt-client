import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { Observable, from } from 'rxjs';
import { ApiResult } from '../model/api-results';
import { GiftResponse, Gift } from '../model/gift';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { ExchangeRequest } from '../model/exchange-request';

@Injectable({
  providedIn: 'root'
})
export class GiftService extends BaseService {
  API_URL_PUBLIC = environment.apiPublish + '/products';
  API_URL_STAF = environment.apiHost + '/products';


  search(city, district, gender, age, cate): Observable<ApiResult<GiftResponse[]>> {
    if (city === undefined) {
      city = "";
    }
    if (district === undefined) {
      district = "";
    }
    if (gender === undefined) {
      gender = 0;
    }
    if (age === undefined) {
      age = 0;
    }
    if (cate === undefined) {
      cate = "";
    }
    return this.httpClient.get(`${this.API_URL_PUBLIC}?city=${city}&district=${district}&gender=${gender}&age=${age}&cate=${cate}`).pipe(
      map(x => {
        return x as ApiResult<GiftResponse[]>;
      })
    )
  }

  saveGift(gift: Gift): Observable<ApiResult<Gift>> {
    return this.httpClient.post(this.API_URL_STAF + '/create', gift, { headers: this.addRequestHeader }).pipe(
      map(response => {
        return response as ApiResult<Gift>;
      })
    );
  }

  getGift(id: number): Observable<ApiResult<GiftResponse>> {
    return this.httpClient.get(`${this.API_URL_PUBLIC}/${id}`, { headers: this.addRequestHeader }).pipe(
      map(response => {
        return response as ApiResult<GiftResponse>;
      })
    );
  }
  sendExchageRequest(exchangeRequest: ExchangeRequest): Observable<ApiResult<ExchangeRequest>> {
    return this.httpClient.post(environment.apiHost + "/exchanges", exchangeRequest, { headers: this.addRequestHeader }).pipe(
      map(response => {
        return response as ApiResult<ExchangeRequest>;
      })
    )
  }

}
