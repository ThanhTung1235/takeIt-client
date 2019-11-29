import { Injectable } from '@angular/core';
import { BaseService } from '../base.service';
import { environment } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Transaction } from '../model/transaction';
import { map } from 'rxjs/operators';
import { ApiResult } from '../model/api-results';

@Injectable({
  providedIn: 'root'
})
export class TransactionService extends BaseService {
  API_URL = environment.apiHost + '/transactions';

  getTransactionReceiver(): Observable<ApiResult<Transaction[]>> {
    return this.httpClient.get(`${this.API_URL}/receiver`, { headers: this.addRequestHeader }).pipe(
      map(x => {
        return x as ApiResult<Transaction[]>
      })
    )
  }
  getTransactionOwner(): Observable<ApiResult<Transaction[]>> {
    return this.httpClient.get(`${this.API_URL}/owner`, { headers: this.addRequestHeader }).pipe(
      map(x => {
        return x as ApiResult<Transaction[]>
      })
    )
  }
  confirmTransaction(id, status): Observable<ApiResult<Transaction>> {
    return this.httpClient.get(`${this.API_URL}/exchangeConfirm/${id}?status=${status}` ,{headers: this.addRequestHeader}).pipe(
      map(x => {
        return x as ApiResult<Transaction>;
      })
    )

  }
}
