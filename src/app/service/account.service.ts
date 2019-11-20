import {Injectable} from '@angular/core';
import {BaseService} from '../base.service';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {ApiResult} from '../model/api-results';
import {Account, Credential} from '../model/account';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AccountService extends BaseService {
  API_URL = environment.apiAuth + '/register';

  register(account: Account): Observable<ApiResult<Account>> {
    return this.httpClient.post(this.API_URL, account).pipe(
      map(x => {
        return x as ApiResult<Account>;
      })
    );
  }
  login(account: Account): Observable<ApiResult<Credential>> {
    return this.httpClient.post(this.API_URL, account).pipe(
      map(x => {
        return x as ApiResult<Credential>;
      })
    );
  }
}
