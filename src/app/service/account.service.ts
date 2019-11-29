import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { ApiResult } from '../model/api-results';
import { Account, Credential, AccountInfo } from '../model/account';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService {
  API_URL_PUB = environment.apiAuth;
  API_URL = environment.apiHost;

  register(account: Account): Observable<ApiResult<Account>> {
    return this.httpClient.post(`${this.API_URL_PUB}/register`, account).pipe(
      map(x => {
        return x as ApiResult<Account>;
      })
    );
  }
  login(account: Account): Observable<ApiResult<Credential>> {
    return this.httpClient.post(`${this.API_URL_PUB}/login`, account).pipe(
      map(x => {
        return x as ApiResult<Credential>;
      })
    );
  }
  getDetail(): Observable<ApiResult<Account>> {
    return this.httpClient.get(`${this.API_URL}/account`, { headers: this.addRequestHeader }).pipe(
      map(x => {
        return x as ApiResult<Account>;
      })
    );
  }
  getInfo() : Observable<ApiResult<AccountInfo>>{
    return this.httpClient.get(`http://localhost:8080/_api/account-info/detail`, { headers: this.addRequestHeader }).pipe(
      map(x => {
        return x as ApiResult<AccountInfo>;
      })
    );

  }
}
