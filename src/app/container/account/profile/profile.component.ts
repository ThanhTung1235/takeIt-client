import { Component, OnInit, OnDestroy } from '@angular/core';
import { AccountService } from 'src/app/service/account.service';
import { Subscription, Observable } from 'rxjs';
import { Account, AccountInfo } from 'src/app/model/account';
import { Transaction } from 'src/app/model/transaction';
import { TransactionService } from 'src/app/service/transaction.service';
import { map } from 'rxjs/operators';
import { Pagination } from 'src/app/model/api-results';
import { GiftService } from 'src/app/service/gift.service';
import { ExchangeRequestResp } from 'src/app/model/exchange-request';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit, OnDestroy {
  transactionsOwner$: Observable<Transaction[]>;
  transactionsReceiver$: Observable<Transaction[]>;
  sub: Subscription;
  account: Account;
  accountInfo: AccountInfo;
  paginationOwner: Pagination;
  paginationReceiver: Pagination;
  exchangeResp: ExchangeRequestResp[];

  constructor(
    private accountSerivce: AccountService,
    private giftService: GiftService,
    private transactionService: TransactionService
  ) { }

  ngOnInit() {
    this.getAccount();
    this.getAccountInfo();
  }

  getRequestOfGift(giftId) {
    this.sub = this.giftService.getRequestOfGift(giftId).subscribe((x) => {
      this.exchangeResp = x.data;
    })
  }


  getTrasactionOwner() {
    this.transactionService.getTransactionOwner().pipe(
      map(x => {
        this.paginationOwner = x.pagination;
        return x.data;
      })
    )
  }

  getTrasactionReceiver() {
    this.transactionService.getTransactionReceiver().pipe(
      map(x => {
        this.paginationReceiver = x.pagination;
        return x.data;
      })
    )
  }

  getAccount() {
    this.sub = this.accountSerivce.getDetail().subscribe(x => this.account = x.data);
  }
  getAccountInfo() {
    this.sub = this.accountSerivce.getInfo().subscribe(x => this.accountInfo = x.data);
  }
  ngOnDestroy() {
    this.sub.unsubscribe();
  }
}
